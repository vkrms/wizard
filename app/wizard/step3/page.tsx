'use client'

import { useState, useEffect } from 'react';
import { FormHeader, WizardNavigation, AddOnCard, WizardContent } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { hasRequiredDataForStep, useWizard } from '@/lib/WizardContext';
import { ADD_ONS, formatAddOnPrice } from '@/lib/constants';

export default function Step3() {
  const { data, updateData } = useWizard()
  const router = useRouter()
  const isYearly = data.billingYearly || false
  const isAllowed = hasRequiredDataForStep(3, data)

  const [addOns, setAddOns] = useState<string[]>(data.addOns || [])

  useEffect(() => {
    if (!isAllowed) {
      router.replace('/wizard/step1')
    }
  }, [isAllowed, router])

  if (!isAllowed) {
    return null
  }

  const toggleAddOn = (id: string) => {
    const updated = addOns.includes(id)
      ? addOns.filter(a => a !== id)
      : [...addOns, id]
    setAddOns(updated)
    updateData({ addOns: updated })
  }

  const handleGoBack = () => {
    router.push('/wizard/step2')
  }

  const handleNext = () => {
    router.push('/wizard/step4')
  }

  return (
    <>
      <WizardContent>
        <FormHeader
          title="Pick add-ons"
          description="Add-ons help enhance your gaming experience."
        />

        <div className="mt-5 sm:mt-9 flex flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:gap-4">
            {ADD_ONS.map((addOn) => (
              <AddOnCard
                key={addOn.id}
                addOn={addOn}
                price={formatAddOnPrice(addOn, isYearly)}
                isSelected={addOns.includes(addOn.id)}
                checked={addOns.includes(addOn.id)}
                onChange={() => toggleAddOn(addOn.id)}
              />
            ))}
          </div>
        </div>
      </WizardContent>

      <WizardNavigation
        showBack={true}
        onBack={handleGoBack}
        onNext={handleNext}
        className="mt-auto"
      />
    </>
  )
}

