'use client'

import { FormHeader, WizardContent, WizardNavigation } from '@/components/ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAddOnsByIds, formatAddOnPrice, getYearlyPrice, getPlanById, PlanId } from '@/lib/constants';
import { selectPlanMonthlyPrice, useFormStore } from '@/lib/formStore';
import { useGuard } from '@/lib/useGuard';

export default function Step4() {
  const router = useRouter();

  const monthlyPrice = useFormStore(selectPlanMonthlyPrice)

  const {
    billingYearly: isYearly,
    plan: selectedPlanId,
    addOns: selectedAddOns,
    markStepComplete,
    markStepIncomplete,
  } = useFormStore()

  const isAllowed = useGuard(4)

  if (!isAllowed) {
    return null
  }

  const selectedPlanName = getPlanById(selectedPlanId as PlanId).name

  const planPrice = isYearly
    ? getYearlyPrice(monthlyPrice)
    : monthlyPrice

  const planPriceDisplay = isYearly
    ? `$${planPrice}/yr`
    : `$${planPrice}/mo`


  const selectedAddOnsData = getAddOnsByIds(selectedAddOns)

  const addOnsTotal = selectedAddOnsData.reduce((sum, ao) => {
    return sum + (isYearly ? getYearlyPrice(ao.monthlyPrice) : ao.monthlyPrice)
  }, 0)

  const total = planPrice + addOnsTotal
  const totalDisplay = isYearly
    ? `$${total}/yr`
    : `$${total}/mo`

  const billingPeriod = isYearly ? 'year' : 'month'

  const handleGoBack = () => {
    router.push('/wizard/step3');
    markStepIncomplete()
  }

  const handleConfirm = () => {
    markStepComplete()
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
                    {selectedPlanName} ({isYearly ? 'Yearly' : 'Monthly'})
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
            {selectedAddOns.length > 0 && (
              <div className="border-t border-purple-200 my-[10px] sm:mt-6 sm:mb-4"></div>
            )}

            {/* Add-ons Summary */}
            {selectedAddOns.length > 0 && (
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
