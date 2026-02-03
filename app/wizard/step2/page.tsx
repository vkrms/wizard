'use client'

import { Form, FormHeader, PlanCard, WizardContent, WizardNavigation } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import { PLANS, formatPlanPrice } from '@/lib/constants';
import { useFormStore } from '@/lib/formStore';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PlanId } from '@/lib/constants';
import { useGuard } from '@/lib/useGuard';

const step2Schema = z.object({
  plan: z.enum(PLANS.map(plan => plan.id)),
  billingYearly: z.boolean(),
})

export type step2SchemaType = z.infer<typeof step2Schema>


export default function Step2() {
  const router = useRouter();
  const { plan, billingYearly } = useFormStore(s => s)

  const methods = useForm<step2SchemaType>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      billingYearly: billingYearly || false,
      plan: plan as PlanId || PLANS[0].id,
    }
  })

  const isYearly = methods.watch('billingYearly')
  const selectedPlanId = methods.watch('plan')

  const { setStep2, markStepComplete, markStepIncomplete } = useFormStore(s => s)

  const isAllowed = useGuard(2)

  if (!isAllowed) {
    return null
  }


  const onSubmit = () => {
    markStepComplete()
    setStep2(methods.getValues())
    router.push('/wizard/step3');
  }

  const handleGoBack = () => {
    router.push('/wizard/step1');
    markStepIncomplete()
  }

  return (
    <>
    <WizardContent className='flex-1 max-h-[564px]'>
      <FormHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />

    <FormProvider {...methods}>
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
              isSelected={selectedPlanId === plan.id}
              {...methods.register('plan')}
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

          <Switch
            // checked={field.value}
            // onChange={() => {
            //   field.onChange(!field.value)
            // }}
            onChange={() => {
              methods.setValue('billingYearly', !isYearly)
            }}
            checked={!!isYearly}

            className={cn(
              "group inline-flex items-center rounded-full transition bg-blue-950 cursor-pointer w-10 h-5",
              'focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1',
            )}
          >
            <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
          </Switch>

          {/* <Controller
            name="billingYearly"
            control={methods.control}
            render={({ field }) => (

            )}
          /> */}

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
    </FormProvider>

    </WizardContent>

    <WizardNavigation
      showBack={true}
      onBack={handleGoBack}
      onNext={onSubmit}
      className="pt-0"
    />
    </>
  );
}

