'use client'

import { FormHeader, WizardContent, WizardNavigation } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/lib/WizardContext';
import Link from 'next/link';
import DesignControl from '@/components/DesignControl';

const plans = [
  {
    id: 'arcade' as const,
    name: 'Arcade',
    monthlyPrice: 9,
  },
  {
    id: 'advanced' as const,
    name: 'Advanced',
    monthlyPrice: 12,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    monthlyPrice: 15,
  },
];

const addOns = [
  {
    id: 'online-service',
    name: 'Online service',
    monthlyPrice: 1,
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    monthlyPrice: 2,
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    monthlyPrice: 2,
  },
];

export default function Step4() {
  const { data } = useWizard()
  const router = useRouter();

  const isYearly = data.billingYearly || false
  const selectedPlanId = data.plan || 'arcade'
  const selectedAddOns = data.addOns || []

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0]
  const selectedAddOnsData = addOns.filter(ao => selectedAddOns.includes(ao.id))

  const planPrice = isYearly
    ? selectedPlan.monthlyPrice * 10
    : selectedPlan.monthlyPrice

  const planPriceDisplay = isYearly
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`

  const addOnsTotal = selectedAddOnsData.reduce((sum, ao) => {
    return sum + (isYearly ? ao.monthlyPrice * 10 : ao.monthlyPrice)
  }, 0)

  // const addOnsTotalDisplay = isYearly
  //   ? `+$${addOnsTotal}/yr`
  //   : `+$${addOnsTotal}/mo`

  const total = planPrice + addOnsTotal
  const totalDisplay = isYearly
    ? `$${total}/yr`
    : `$${total}/mo`

  const billingPeriod = isYearly ? 'year' : 'month'

  const handleGoBack = () => {
    router.back()
  }

  const handleConfirm = () => {
    // Navigate to thank you page or handle confirmation
    router.push('/wizard/step5')
  }

  return (
    <>
      <DesignControl
        srcMobile="/design/mobile-design-step-4-yearly.jpg"
        srcDesktop="/design/desktop-design-step-4-yearly.jpg"
        className=""
      />

      <WizardContent>
        <FormHeader
          title="Finishing up"
          description="Double-check everything looks OK before confirming."
        />

        <div className="mt-5 md:mt-9 flex flex-1 flex-col">
          {/* Summary Card */}
          <div className="bg-blue-50 rounded-lg p-4 md:p-6 md:py-4">
            {/* Plan Summary */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-blue-950 text-[14px] md:text-[16px] font-medium">
                    {selectedPlan.name} ({isYearly ? 'Yearly' : 'Monthly'})
                  </span>
                </div>
                <Link
                  href="/wizard/step2"
                  className="text-sm text-grey-500 underline hover:text-purple-600 md:mt-[2px]"
                >
                  Change
                </Link>
              </div>
              <span className="text-blue-950 text-[14px] md:text-[16px] font-bold">
                {planPriceDisplay}
              </span>
            </div>

            {/* Divider */}
            {selectedAddOnsData.length > 0 && (
              <div className="border-t border-purple-200 my-[10px] md:mt-6 md:mb-4"></div>
            )}

            {/* Add-ons Summary */}
            {selectedAddOnsData.length > 0 && (
              <div className="flex flex-col gap-4">
                {selectedAddOnsData.map((addOn) => {
                  const addOnPrice = isYearly
                    ? `+$${addOn.monthlyPrice * 10}/yr`
                    : `+$${addOn.monthlyPrice}/mo`

                  return (
                    <div key={addOn.id} className="flex items-center justify-between">
                      <span className="text-grey-500 text-sm">{addOn.name}</span>
                      <span className="text-blue-950 text-sm">{addOnPrice}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between px-4 md:px-6 mt-5 md:mt-[30px]">
            <span className="text-grey-500 text-sm">
              Total (per {billingPeriod})
            </span>
            <span className="text-purple-600 text-[16px] md:text-[20px] font-bold">
              +{totalDisplay}
            </span>
          </div>
        </div>
      </WizardContent>

      <WizardNavigation
        showBack={true}
        onBack={handleGoBack}
        onNext={handleConfirm}
        nextLabel="Confirm"
      />
    </>
  );
}
