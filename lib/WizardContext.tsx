'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type WizardData = {
  // Step 1
  name?: string
  email?: string
  phone?: string

  // Step 2
  plan?: 'arcade' | 'advanced' | 'pro'
  billingYearly?: boolean

  // Step 3
  addOns?: string[]
}

type WizardContextType = {
  data: WizardData
  updateData: (newData: Partial<WizardData>) => void
  resetData: () => void
  clearStorage: () => void
}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

const STORAGE_KEY = 'wizard-data'

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0
}

const isValidPlan = (plan: WizardData['plan']): plan is NonNullable<WizardData['plan']> => {
  return plan === 'arcade' || plan === 'advanced' || plan === 'pro'
}

const stepRequirements: Record<number, (data: WizardData) => boolean> = {
  1: (data) => {
    return isNonEmptyString(data.name) && isNonEmptyString(data.email) && isNonEmptyString(data.phone)
  },
  2: (data) => {
    return isValidPlan(data.plan) && typeof data.billingYearly === 'boolean'
  },
  3: (data) => Array.isArray(data.addOns),
}

export const hasRequiredDataForStep = (targetStep: number, data: WizardData) => {
  if (targetStep <= 1) {
    return true
  }

  for (let step = 1; step < targetStep; step += 1) {
    const requirement = stepRequirements[step]
    if (requirement && !requirement(data)) {
      return false
    }
  }

  return true
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>({})
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {        
        // eslint-disable-next-line
        setData(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse stored wizard data:', error)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data, isHydrated])

  const updateData = (newData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const resetData = () => {
    setData({})
    localStorage.removeItem(STORAGE_KEY)
  }

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY)
  }

  // Prevent flash of empty state during hydration
  if (!isHydrated) {
    return null
  }

  return (
    <WizardContext.Provider value={{ data, updateData, resetData, clearStorage }}>
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider')
  }
  return context
}
