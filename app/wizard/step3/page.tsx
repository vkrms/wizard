'use client'

import { FormHeader, WizardNavigation, AddOnCard, WizardContent } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { ADD_ONS, formatAddOnPrice } from '@/lib/constants';
import { z } from 'zod';
import { useFormStore } from '@/lib/formStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGuard } from '@/lib/useGuard';

const step3Schema = z.object({
  addOns: z.array(z.string()),
})

export type step3SchemaType = z.infer<typeof step3Schema>

export default function Step3() {
  const router = useRouter()

  const { addOns: storedAddOns } = useFormStore(s => s)
  
  const billingYearly = useFormStore(s => s.billingYearly)
  const setStep3 = useFormStore(s => s.setStep3)
  const { markStepComplete, markStepIncomplete } = useFormStore(s => s)

  const methods = useForm<step3SchemaType>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      addOns: storedAddOns || [],
    }
  })

  const addOns = methods.watch('addOns')


  const handleGoBack = () => {
    router.push('/wizard/step2')
    markStepIncomplete()
  }

  const handleNext = () => {
    markStepComplete()
    router.push('/wizard/step4')
  }

  const toggleAddOn = (addOnId: string) => {
    const updatedAddOns = addOns.includes(addOnId)
      ? addOns.filter(a => a !== addOnId) // remove
      : [...addOns, addOnId] // add

    methods.setValue('addOns', updatedAddOns)
    setStep3({ addOns: methods.getValues('addOns') })

    console.log({addOnId, addOns: methods.getValues('addOns')})
  }

  const isAllowed = useGuard(3)

  if (!isAllowed) {
    return null
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
                price={formatAddOnPrice(addOn, billingYearly)}
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

