# Code Review - Wizard Project

## 5. Step Requirement Logic Outside of Schema

`hasRequiredDataForStep` duplicates validation logic that already exists in Zod schemas:

```ts
const stepRequirements: Record<number, (data: WizardData) => boolean> = {
  1: (data) => {
    return isNonEmptyString(data.name) && isNonEmptyString(data.email) && isNonEmptyString(data.phone)
  },
  2: (data) => {
    return isValidPlan(data.plan) && typeof data.billingYearly === 'boolean'
  },
  3: (data) => Array.isArray(data.addOns),
}
```

This can drift out of sync with the actual form schemas. Consider reusing the Zod schemas for these checks.

---
