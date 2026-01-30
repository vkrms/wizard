'use client'

import { useEffect } from 'react';
import { FormHeader, WizardContent, WizardNavigation } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { hasRequiredDataForStep, useWizard } from '@/lib/WizardContext';
import Link from 'next/link';
import { getPlanById, getAddOnsByIds, formatAddOnPrice, getYearlyPrice } from '@/lib/constants';

export default function Step4() {
  const { data } = useWizard()
  const router = useRouter();
  const isAllowed = hasRequiredDataForStep(4, data)

  const isYearly = data.billingYearly || false
  const selectedPlan = getPlanById(data.plan || 'arcade')
  const selectedAddOnsData = getAddOnsByIds(data.addOns || [])

  const planPrice = isYearly
    ? getYearlyPrice(selectedPlan.monthlyPrice)
    : selectedPlan.monthlyPrice

  const planPriceDisplay = isYearly
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`

  const addOnsTotal = selectedAddOnsData.reduce((sum, ao) => {
    return sum + (isYearly ? getYearlyPrice(ao.monthlyPrice) : ao.monthlyPrice)
  }, 0)

  const total = planPrice + addOnsTotal
  const totalDisplay = isYearly
    ? `$${total}/yr`
    : `$${total}/mo`

  const billingPeriod = isYearly ? 'year' : 'month'

  useEffect(() => {
    if (!isAllowed) {
      router.replace('/wizard/step1')
    }
  }, [isAllowed, router])

  if (!isAllowed) {
    return null
  }

  const handleGoBack = () => {
    router.push('/wizard/step3');
  }

  const handleConfirm = () => {
    // Navigate to thank you page or handle confirmation
    router.push('/wizard/step5')
  }

  return (
    <>
      <WizardContent>
        <FormHeader
          title="Finishing up"
          description="Double-check everything looks OK before confirming."
        />

        <div className="mt-5 sm:mt-9 flex flex-1 flex-col">
          {/* Summary Card */}
          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 sm:py-4">
            {/* Plan Summary */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-blue-950 text-[14px] sm:text-[16px] font-medium">
                    {selectedPlan.name} ({isYearly ? 'Yearly' : 'Monthly'})
                  </span>
                </div>
                <Link
                  href="/wizard/step2"
                  className="text-sm text-grey-500 underline hover:text-purple-600 sm:mt-[2px]"
                >
                  Change
                </Link>
              </div>
              <span className="text-blue-950 text-[14px] sm:text-[16px] font-bold">
                {planPriceDisplay}
              </span>
            </div>

            {/* Divider */}
            {selectedAddOnsData.length > 0 && (
              <div className="border-t border-purple-200 my-[10px] sm:mt-6 sm:mb-4"></div>
            )}

            {/* Add-ons Summary */}
            {selectedAddOnsData.length > 0 && (
              <div className="flex flex-col gap-4">
                {selectedAddOnsData.map((addOn) => (
                  <div key={addOn.id} className="flex items-center justify-between">
                    <span className="text-grey-500 text-sm">{addOn.name}</span>
                    <span className="text-blue-950 text-sm">{formatAddOnPrice(addOn, isYearly)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between px-4 sm:px-6 mt-5 sm:mt-[30px]">
            <span className="text-grey-500 text-sm">
              Total (per {billingPeriod})
            </span>
            <span className="text-purple-600 text-[16px] sm:text-[20px] font-bold">
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
        nextVariant="confirm"
      />
    </>
  );
}
