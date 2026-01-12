'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type WizardData = {
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
}

const WizardContext = createContext<WizardContextType | undefined>(undefined)

const STORAGE_KEY = 'wizard-data'

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>({})
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
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

  // Prevent flash of empty state during hydration
  if (!isHydrated) {
    return null
  }

  return (
    <WizardContext.Provider value={{ data, updateData, resetData }}>
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
