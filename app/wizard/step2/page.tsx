'use client'

import { Button, FormHeader, PlanCard } from '@/components/ui';
import { useForm, FormProvider, Controller } from "react-hook-form"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
  const router = useRouter();
  const methods = useForm<Inputs>({
    defaultValues: {
      plan: 'arcade',
      billingYearly: false,
    }
  });
  
  const { register } = methods;

  const [isYearly, setIsYearly] = useState(false);
  const selectedPlan = methods.watch('plan');

  const onSubmit = (data: Inputs) => {
    console.log({formData: data})
    router.push('/wizard/step3');
  }

  const handleGoBack = () => {
    router.push('/wizard/step1');
  }

  return (
    <div>
      <div className="flex flex-1 flex-col py-10">
        <div className="max-w-[448px]">
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
              <div className="flex flex-col md:flex-row gap-4">
                {plans.map((plan) => {
                  
                  const price = isYearly
                    ? `$${plan.monthlyPrice * 10}/yr`
                    : `$${plan.monthlyPrice}/mo`

                  return(
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        price={price}
                        isSelected={selectedPlan === plan.id}
                        {...register('plan')}
                      />
                )})}
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-6 mt-8 bg-magnolia rounded-lg py-4">
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
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setIsYearly(e.target.checked);
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
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

              {/* Navigation */}
              <div className="mt-auto flex justify-between pt-8">
                <Button type="button" variant="ghost" onClick={handleGoBack}>
                  Go Back
                </Button>
                <Button type="submit">Next Step</Button>
              </div>

            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

