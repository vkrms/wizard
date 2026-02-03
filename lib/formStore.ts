import { create } from 'zustand'
import { getPlanById, type PlanId } from './constants'

import { step1SchemaType } from '@/app/wizard/step1/page'
import { step2SchemaType } from '@/app/wizard/step2/page'
import { step3SchemaType } from '@/app/wizard/step3/page'


interface FormStore {
  name: string
  email: string
  phone: string
  plan: string
  billingYearly: boolean
  addOns: string[]
  completedSteps: number,
  setStep1: (data: step1SchemaType) => void
  setStep2: (data: step2SchemaType) => void
  setStep3: (data: step3SchemaType) => void
  report: () => void
  clearFormData: () => void
  markStepComplete: () => void
  markStepIncomplete: () => void
}

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  plan: '',
  billingYearly: false,
  addOns: [],
  completedSteps: 0,
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

  markStepComplete: () => set(state => ({ completedSteps: state.completedSteps + 1 })),

  markStepIncomplete: () => set(state => ({ completedSteps: state.completedSteps - 1 })),
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

export { useFormStore }
