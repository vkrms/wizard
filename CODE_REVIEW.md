# Code Review: Multi-Step Wizard Application

## Overview

This is a Next.js 16 App Router application implementing a multi-step subscription wizard with form validation. The tech stack includes React 19, Zustand for state management, React Hook Form + Zod for form handling/validation, and Tailwind CSS v4.

---

## Strengths

### 1. Clean Component Architecture

- Good separation of concerns with reusable UI components (`Button`, `Input`, `PlanCard`, `AddOnCard`, etc.)
- Barrel exports in `components/ui/index.ts` for clean imports
- Components follow consistent patterns with proper `displayName` assignments for debugging

### 2. Type Safety

- Zod schemas export their inferred types (`step1SchemaType`, etc.) for reuse
- Well-typed constants in `lib/constants.ts` with helper functions
- Custom ESLint rule preventing hooks in server components shows attention to Next.js best practices
- Form component properly typed with `FormEvent<HTMLFormElement>`

### 3. State Management

- Zustand store is lean and focused
- Selector functions (`selectPlanMonthlyPrice`, `selectFormData`) for derived state
- `initialFormState` extracted for easy reset
- Step completion counter with proper increment/decrement on navigation

### 4. Styling

- Consistent use of the `cn` utility for conditional classes
- Design tokens defined in CSS variables via Tailwind's `@theme`
- Responsive design with mobile-first approach

### 5. Navigation Guards

- All steps properly protected with `useGuard` hook
- Guard redirects to correct step (`completedSteps + 1`) avoiding redirect cascades

---

## Remaining Issues

### Low Priority

#### 1. Console.log Statements in Production Code

```ts
// app/wizard/step3/page.tsx
console.log({addOnId, addOns: methods.getValues('addOns')})

// app/wizard/step5/page.tsx
console.log('Wizard form data:', formData)
console.log('...clearing form data...')
```

Remove or wrap in development-only checks.

#### 2. Unused Prop in WizardSidebar

The `currentStep` prop is defined but never actually passed — pathname detection handles everything. Consider removing it to avoid confusion.

#### 3. Step Navigation Coupling

Each step knows about the next/previous step URLs. Consider a centralized navigation config or hook:

```ts
const STEP_ORDER = ['/wizard/step1', '/wizard/step2', ...] as const
const useWizardNavigation = (currentStep: number) => ({
  next: () => router.push(STEP_ORDER[currentStep]),
  back: () => router.push(STEP_ORDER[currentStep - 2]),
})
```

#### 4. Magic Numbers

```ts
// components/ui/PlanCard.tsx
'flex flex-row md:flex-col gap-3 md:gap-11 p-4 rounded-lg border-2 cursor-pointer transition-all md:h-[184px]',
```

Per AGENTS.md rules, `h-[184px]` should ideally be a multiple of 4/8 (like `h-[180px]` or `h-[192px]`).

---

## Architecture Notes

### State Persistence

Current Zustand state is memory-only, so refreshing the page loses all progress. If persistence is needed, consider `zustand/persist` middleware.

### Store Selectors

Components use `useFormStore()` which selects the entire store. For this small wizard, readability was prioritized over granular selectors — a reasonable trade-off given the app's scope.

---

## Summary

The codebase is well-organized with good component reusability and type safety. Issues addressed:

- ~~Guard logic robustness~~ — Fixed: redirects to `completedSteps + 1`
- ~~Step 5 protection~~ — Fixed: now uses `useGuard(5)`
- ~~Commented-out code~~ — Fixed: cleaned up
- ~~Form type safety~~ — Fixed: uses `FormEvent<HTMLFormElement>`

Remaining items are minor cleanup (console.log removal, unused prop).

The project demonstrates solid understanding of React Hook Form, Zustand, and Zod integration. The custom ESLint rule for server components shows thoughtful architecture decisions.

---

*Review date: February 2026*
