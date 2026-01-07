import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noHooksInServerComponents from "./eslint-rules/no-hooks-in-server-components.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "custom-rules": {
        rules: {
          "no-hooks-in-server-components": noHooksInServerComponents,
        },
      },
    },
    rules: {
      "custom-rules/no-hooks-in-server-components": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
