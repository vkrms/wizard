'use client'

// guard custom hook
import { useFormStore } from './formStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useGuard = (currentStep: number) => {
  const prevStep = currentStep - 1
  const { completedSteps } = useFormStore()
  const router = useRouter()

  const isAllowed = completedSteps >= prevStep  

  useEffect(() => {
    if (!isAllowed) {
      router.push(`/wizard/step${completedSteps + 1}`)
    }
  }, [isAllowed, router, prevStep, completedSteps])

  return isAllowed
}
