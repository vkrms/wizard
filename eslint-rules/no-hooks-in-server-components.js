/**
 * Custom ESLint rule to detect React hooks usage in Server Components.
 * Reports an error if hooks are used in files without "use client" directive.
 */

/**
 * Check if a function name follows the React hooks naming convention.
 * Hooks must start with "use" followed by an uppercase letter.
 * @param {string} name - The function name to check
 * @returns {boolean} - True if the name follows the hooks convention
 */
const isHook = (name) => /^use[A-Z]/.test(name);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow React hooks in Server Components (files without 'use client' directive)",
      recommended: true,
    },
    messages: {
      noHooksInServerComponent:
        "'{{hook}}' cannot be used in a Server Component. Add 'use client' directive at the top of the file to make this a Client Component.",
    },
    schema: [],
  },
  create(context) {
    let hasUseClientDirective = false;
    const hookUsages = [];

    return {
      Program(node) {
        // Check for "use client" directive at the top of the file
        for (const statement of node.body) {
          if (statement.type === "ExpressionStatement") {
            if (
              statement.expression.type === "Literal" &&
              statement.expression.value === "use client"
            ) {
              hasUseClientDirective = true;
              break;
            }
          } else {
            // Stop checking after non-directive statements
            break;
          }
        }
      },
      CallExpression(node) {
        // Check for direct hook calls: useEffect(), useState(), useForm(), etc.
        if (
          node.callee.type === "Identifier" &&
          isHook(node.callee.name)
        ) {
          hookUsages.push({ node, hookName: node.callee.name });
        }
        // Check for React.useEffect(), React.useState(), etc.
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "React" &&
          node.callee.property.type === "Identifier" &&
          isHook(node.callee.property.name)
        ) {
          hookUsages.push({ node, hookName: node.callee.property.name });
        }
      },
      "Program:exit"() {
        // Report all hook usages if no "use client" directive was found
        if (!hasUseClientDirective) {
          for (const { node, hookName } of hookUsages) {
            context.report({
              node,
              messageId: "noHooksInServerComponent",
              data: { hook: hookName },
            });
          }
        }
      },
    };
  },
};


