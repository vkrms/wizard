import { create } from 'zustand'
import { getPlanById, type PlanId } from './constants'

import { step1SchemaType } from '@/app/wizard/step1/page'
import { step2SchemaType } from '@/app/wizard/step2/page'
import { step3SchemaType } from '@/app/wizard/step3/page'

type StepNumber = 0 | 1 | 2 | 3 | 4 | 5

interface FormStore {
  name: string
  email: string
  phone: string
  plan: string
  billingYearly: boolean
  addOns: string[]
  completedSteps: StepNumber
  setStep1: (data: step1SchemaType) => void
  setStep2: (data: step2SchemaType) => void
  setStep3: (data: step3SchemaType) => void
  report: () => void
  clearFormData: () => void
  markStepComplete: (step: StepNumber) => void
  markStepIncomplete: (step: StepNumber) => void
}

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  plan: '',
  billingYearly: false,
  addOns: [] as string[],
  completedSteps: 0 as StepNumber,
}

const useFormStore = create<FormStore>((set, get) => ({
  ...initialFormState,
  
  report: () => {
    const { email, name, phone, plan, billingYearly, addOns } = get()
    console.log('report', { email, name, phone, plan, billingYearly, addOns })
  },

  setStep1: (data: step1SchemaType) => set(data),

  setStep2: (data: step2SchemaType) => set(data),

  setStep3: (data: step3SchemaType) => set(data),

  clearFormData: () => set(initialFormState),

  markStepComplete: (step: StepNumber) => set(state => ({ 
    completedSteps: Math.max(state.completedSteps, step) as StepNumber
  })),

  markStepIncomplete: (step: StepNumber) => set(state => ({ 
    completedSteps: Math.min(state.completedSteps, step) as StepNumber
  })),
}))

export const selectPlanMonthlyPrice = (state: FormStore) => {
  if (!state.plan) return 0
  return getPlanById(state.plan as PlanId).monthlyPrice
}

export const selectFormData = (state: FormStore) => {
  const { name, email, phone, plan, billingYearly, addOns } = state
  return {
    name,
    email,
    phone,
    plan,
    billingYearly,
    addOns,  
  }
}

export { useFormStore, type StepNumber }
