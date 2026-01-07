'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  label: string;
  title: string;
  path?: string;
}

const steps: Step[] = [
  { number: 1, label: 'STEP 1', title: 'YOUR INFO', path: '/wizard/step1' },
  { number: 2, label: 'STEP 2', title: 'SELECT PLAN', path: '/wizard/step2' },
  { number: 3, label: 'STEP 3', title: 'ADD-ONS', path: '/wizard/step3' },
  { number: 4, label: 'STEP 4', title: 'SUMMARY', path: '/wizard/step4' },
];

interface WizardSidebarProps {
  currentStep?: number;
}

export default function WizardSidebar({ currentStep }: WizardSidebarProps) {
  const pathname = usePathname();

  const getActiveStep = () => {
    if (currentStep) return currentStep;
    const activeStep = steps.find((step) => pathname?.includes(step.path || ''));
    return activeStep?.number || 1;
  };

  const activeStepNumber = getActiveStep();

  return (
    <aside
      className="relative flex min-h-[568px] flex-col rounded-lg bg-primary p-8 pt-10 overflow-hidden"
      style={{
        backgroundImage: 'url(/bg-sidebar-desktop.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Steps */}
      <nav className="relative z-10 flex flex-col gap-7">
        {steps.map((step) => {
          const isActive = step.number === activeStepNumber;

          return (
            <div key={step.number} className="flex items-center gap-4">
              {/* Step Number Circle */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-all duration-200',
                  isActive
                    ? 'border-light-blue bg-light-blue text-marine-blue'
                    : 'border-white bg-transparent text-white'
                )}
              >
                {step.number}
              </div>

              {/* Step Text */}
              <div className="flex flex-col">
                <span className="text-xs font-normal tracking-wide text-pastel-blue">
                  {step.label}
                </span>
                <span className="text-sm font-bold tracking-widest text-white">
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

