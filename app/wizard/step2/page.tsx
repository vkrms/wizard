'use client'

import { useEffect } from 'react';
import { Form, FormHeader, PlanCard, WizardContent, WizardNavigation } from '@/components/ui';
import { useForm, FormProvider, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import { useWizard } from '@/lib/WizardContext';
import DesignControl from '@/components/DesignControl';

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
    yearlyPerk: '2 months free',
  },
  {
    id: 'advanced' as const,
    name: 'Advanced',
    icon: '/icon-advanced.svg',
    monthlyPrice: 12,
    yearlyPerk: '2 months free',
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    icon: '/icon-pro.svg',
    monthlyPrice: 15,
    yearlyPerk: '2 months free',
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
      <DesignControl
        srcMobile="/design/mobile-design-step-2-yearly.jpg"
        srcDesktop="/design/desktop-design-step-2-yearly.jpg"
        className="bob1522"
      />

      <FormProvider {...methods}>
        <WizardContent className='flex-1 max-h-[564px]'>
          <FormHeader
            title="Select your plan"
            description="You have the option of monthly or yearly billing."
          />

          <Form
            onSubmit={onSubmit}
            className="mt-5 md:mt-9 flex flex-1 flex-col"
          >
            {/* Plan Cards Grid */}
            <div className="grid gap-[10px] md:gap-4 grid-cols-1 md:grid-cols-3">
              {plans.map((plan) => {
                const price = isYearly
                  ? `$${plan.monthlyPrice * 10}/yr`
                  : `$${plan.monthlyPrice}/mo`

                const yearlyPerk = isYearly ? plan.yearlyPerk : undefined

                return (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    price={price}
                    yearlyPerk={yearlyPerk}
                    isSelected={selectedPlan === plan.id}
                    {...register('plan', {
                      onChange: saveData
                    })}
                  />
                );
              })}
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-6 mt-5 md:mt-8 bg-blue-100 rounded-lg py-4 mb-0 md:mb-8 h-[48px] md:h-[44px]">
              <span className={cn(
                'text-sm font-medium',
                {
                  'text-blue-950': !isYearly,
                  'text-grey-500': isYearly
                }
              )}>
                Monthly
              </span>

              <Controller
                name="billingYearly"
                control={methods.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={() => {
                      field.onChange(!field.value)
                      // Save data immediately when billing preference changes
                      setTimeout(saveData, 0) // Use setTimeout to ensure form state is updated first
                    }}
                    className="group inline-flex items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600 cursor-pointer w-10 h-5"
                  >
                    <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                  </Switch>
                )}
              />

              <span className={cn(
                'text-sm font-medium',
                {
                  'text-blue-950': isYearly,
                  'text-grey-500': !isYearly
                }
              )}>
                Yearly
              </span>
            </div>
          </Form>

        </WizardContent>

        <WizardNavigation
          showBack={true}
          onBack={handleGoBack}
          onNext={methods.handleSubmit(onSubmit)}
          className="pt-0"
        />
      </FormProvider>
    </>
  );
}

