'use client'

import { useEffect } from 'react';
import { Form, FormHeader, PlanCard, WizardContent, WizardNavigation } from '@/components/ui';
import { useForm, FormProvider, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import { hasRequiredDataForStep, useWizard } from '@/lib/WizardContext';
import { PLANS, formatPlanPrice } from '@/lib/constants';

const formSchema = z.object({
  plan: z.enum(['arcade', 'advanced', 'pro']),
  billingYearly: z.boolean(),
})

type Inputs = z.infer<typeof formSchema>

export default function Step2() {
  const { data, updateData } = useWizard()
  const router = useRouter();
  const isAllowed = hasRequiredDataForStep(2, data)

  const methods = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: data.plan || 'arcade',
      billingYearly: data.billingYearly || false,
    }
  });

  useEffect(() => {
    if (!isAllowed) {
      router.replace('/wizard/step1')
    }
  }, [isAllowed, router])

  const selectedPlan = methods.watch('plan');
  const isYearly = methods.watch('billingYearly');

  // Auto-persist form changes to context
  useEffect(() => {
    if (selectedPlan !== data.plan || isYearly !== data.billingYearly) {
      updateData({ plan: selectedPlan, billingYearly: isYearly })
    }
  }, [selectedPlan, isYearly, data.plan, data.billingYearly, updateData])

  if (!isAllowed) {
    return null
  }

  const { register } = methods;

  const onSubmit = (formData: Inputs) => {
    updateData(formData)
    router.push('/wizard/step3');
  }

  const handleGoBack = () => {
    router.push('/wizard/step1');
  }

  return (
    <>
      <FormProvider {...methods}>
        <WizardContent className='flex-1 max-h-[564px]'>
          <FormHeader
            title="Select your plan"
            description="You have the option of monthly or yearly billing."
          />

          <Form
            onSubmit={onSubmit}
            className="mt-5 sm:mt-9 flex flex-1 flex-col"
          >
            {/* Plan Cards Grid */}
            <div className="grid gap-[10px] md:gap-4 grid-cols-1 md:grid-cols-3">
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  price={formatPlanPrice(plan, isYearly)}
                  yearlyPerk={isYearly ? plan.yearlyPerk : undefined}
                  isSelected={selectedPlan === plan.id}
                  {...register('plan')}
                />
              ))}
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-6 mt-5 sm:mt-8 bg-blue-100 rounded-lg py-4 mb-0 sm:mb-8 h-[48px] sm:h-[44px]">
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
                    }}
                    className={cn(
                      "group inline-flex items-center rounded-full transition bg-blue-950 cursor-pointer w-10 h-5",
                      'focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1',
                    )}
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

