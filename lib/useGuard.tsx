'use client'

// guard custom hook
import { useFormStore } from './formStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useGuard = (currentStep: number) => {
  const prevStep = currentStep - 1
  const completedSteps = useFormStore(s => s.completedSteps)
  const router = useRouter()

  const isAllowed = completedSteps >= prevStep

  // console.log({
  //   isAllowed,
  //   completedSteps,
  //   prevStep
  // })

  useEffect(() => {
    if (!isAllowed) {
      router.push(`/wizard/step${prevStep}`)
    }
  }, [isAllowed, router, prevStep])

  return isAllowed
}
