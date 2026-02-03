'use client'

import { useEffect } from 'react'
import { WizardContent } from '@/components/ui'
import ThankYouIcon from '@/public/icon-thank-you.svg'
import { useRouter } from 'next/navigation'
import { selectFormData, useFormStore } from '@/lib/formStore'
import { useShallow } from 'zustand/shallow'

export default function Step5() {
  const router = useRouter()
  // const isAllowed = hasRequiredDataForStep(5, data)


  const formData = useFormStore(useShallow(selectFormData))
  
  useEffect(() => {
    console.log('Wizard form data:', formData)
  }, [formData])

  const clearFormData = useFormStore(s => s.clearFormData)
  useEffect(() => {
    clearFormData()
    console.log('...clearing form data...')
  }, [clearFormData])

  // useEffect(() => {
  //   if (!isAllowed) {
  //     router.replace('/wizard/step1')
  //     return
  //   }

  //   clearStorage()
  // }, [isAllowed, router, clearStorage])

  // if (!isAllowed) {
  //   return null
  // }

  return (
    <>     
      <WizardContent>
        <div className="flex flex-col items-center justify-center text-center mt-14 sm:mt-18 mb-12 sm:py-16">
          {/* Thank You Icon */}
          <div className="mb-4 sm:mb-6 flex shrink-0 items-center justify-center">
            <ThankYouIcon className="w-14 h-auto sm:w-auto" role="img" aria-label="Thank you" />
          </div>

          {/* Heading */}
          <h1 className="text-[24px] sm:text-[32px] font-bold text-blue-950">
            Thank you!
          </h1>

          {/* Confirmation Message */}
          <p className="max-w-md text-base text-grey-500 mt-2 leading-[1.55]">
            Thanks for confirming your subscription! We hope you have fun using our platform. 
            If you ever need support, please feel free to email us at{' '}
            <a 
              href="mailto:support@loremgaming.com" 
              className="hover:text-purple-600 transition"
            >
              support@loremgaming.com
            </a>
            .
          </p>
        </div>
      </WizardContent>
    </>
  )
}
