'use client'

import { useEffect } from 'react';
import { FormHeader, WizardNavigation, AddOnCard } from '@/components/ui';
import { useForm, FormProvider, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useWizard } from '@/lib/WizardContext';

type Inputs = {
  addOns: string[];
}

const addOns = [
  {
    id: 'online-service',
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
  },
];

export default function Step3() {
  const { data, updateData } = useWizard()
  const isYearly = data.billingYearly || false
  const router = useRouter();

  const methods = useForm<Inputs>({
    defaultValues: {
      addOns: data.addOns || [],
    }
  });

  // Update form values when context data changes
  useEffect(() => {
    if (data.addOns) {
      methods.setValue('addOns', data.addOns)
    }
  }, [data.addOns, methods])

  // Save data whenever form values change
  const saveData = () => {
    const currentValues = methods.getValues()
    updateData(currentValues)
  }

  const onSubmit = (formData: Inputs) => {
    updateData(formData)
    router.push('/wizard/step4');
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <>
      <FormHeader
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mt-9 flex flex-1 flex-col"
        >
          {/* Add-on Cards */}
          <div className="flex flex-col gap-4">
            {addOns.map((addOn) => {
              const price = isYearly
                ? `+$${addOn.monthlyPrice * 10}/yr`
                : `+$${addOn.monthlyPrice}/mo`

              return (
                <Controller
                  key={addOn.id}
                  name="addOns"
                  control={methods.control}
                  render={({ field }) => {
                    const fieldValue = field.value || []
                    const isChecked = fieldValue.includes(addOn.id)
                    return (
                      <AddOnCard
                        addOn={addOn}
                        price={price}
                        isSelected={isChecked}
                        checked={isChecked}
                        onChange={(e) => {
                          const currentAddOns = fieldValue
                          if (e.target.checked) {
                            field.onChange([...currentAddOns, addOn.id])
                          } else {
                            field.onChange(currentAddOns.filter((id: string) => id !== addOn.id))
                          }
                          setTimeout(saveData, 0)
                        }}
                      />
                    )
                  }}
                />
              );
            })}
          </div>

          <WizardNavigation
            showBack={true}
            onBack={handleGoBack}
          />

        </form>
      </FormProvider>      
    </>
  );
}

