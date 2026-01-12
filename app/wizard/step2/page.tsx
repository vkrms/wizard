'use client'

import { useEffect } from 'react';
import { FormHeader, PlanCard, WizardNavigation } from '@/components/ui';
import { useForm, FormProvider, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import { useWizard } from '@/lib/WizardContext';

type Inputs = {
  plan: 'arcade' | 'advanced' | 'pro';
  billingYearly: boolean;
}

const plans = [
  {
    id: 'arcade' as const,
    name: 'Arcade',
    icon: '/icon-arcade.svg',
    monthlyPrice: 9,
  },
  {
    id: 'advanced' as const,
    name: 'Advanced',
    icon: '/icon-advanced.svg',
    monthlyPrice: 12,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    icon: '/icon-pro.svg',
    monthlyPrice: 15,
  },
];

export default function Step2() {
  const { data, updateData } = useWizard()
  const router = useRouter();

  const methods = useForm<Inputs>({
    defaultValues: {
      plan: data.plan || 'arcade',
      billingYearly: data.billingYearly || false,
    }
  });

  // Update form values when context data changes
  useEffect(() => {
    if (data.plan) {
      methods.setValue('plan', data.plan)
    }
    if (data.billingYearly !== undefined) {
      methods.setValue('billingYearly', data.billingYearly)
    }
  }, [data.plan, data.billingYearly, methods])

  const { register } = methods;

  const selectedPlan = methods.watch('plan');
  const isYearly = methods.watch('billingYearly');

  // Save data whenever form values change
  const saveData = () => {
    const currentValues = methods.getValues()
    updateData(currentValues)
  }

  const onSubmit = (formData: Inputs) => {
    updateData(formData)
    router.push('/wizard/step3');
  }

  const handleGoBack = () => {
    router.back();
  }

  return (
    <>
      <FormHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mt-9 flex flex-1 flex-col"
        >
          {/* Plan Cards Grid */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => {
              const price = isYearly
                ? `$${plan.monthlyPrice * 10}/yr`
                : `$${plan.monthlyPrice}/mo`

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  price={price}
                  isSelected={selectedPlan === plan.id}
                  {...register('plan', {
                    onChange: saveData
                  })}
                />
              );
            })}
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-6 mt-8 bg-magnolia rounded-lg py-4 mb-8">
            <span className={cn(
              'text-sm font-medium',
              {
                'text-marine-blue': !isYearly,
                'text-cool-gray': isYearly
              }
            )}>
              Monthly
            </span>
            
            <Controller
              name="billingYearly"
              control={methods.control}
              render={({ field }) => (
                // <input
                //   type="checkbox"
                //   checked={field.value}
                //   onChange={(e) => {
                //     field.onChange(e.target.checked);
                //     setIsYearly(e.target.checked);
                //   }}
                //   className="w-4 h-4 cursor-pointer"
                // />
                <Switch
                  checked={field.value}
                  onChange={() => {
                    field.onChange(!field.value)
                    // Save data immediately when billing preference changes
                    setTimeout(saveData, 0) // Use setTimeout to ensure form state is updated first
                  }}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600 cursor-pointer"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>                    
              )}
            />
            
            <span className={cn(
              'text-sm font-medium',
              {
                'text-marine-blue': isYearly,
                'text-cool-gray': !isYearly
              }
            )}>
              Yearly
            </span>
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

