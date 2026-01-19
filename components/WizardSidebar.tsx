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
    // Special case: step 5 should show step 4 as active
    if (pathname?.includes('/wizard/step5')) {
      return 4;
    }
    const activeStep = steps.find((step) => pathname?.includes(step.path || ''));
    return activeStep?.number || 1;
  };

  const activeStepNumber = getActiveStep();

  return (
    <aside
      className="relative flex flex-col md:rounded-lg p-8 pt-8 md:pt-10 overflow-hidden items-center md:w-full md:max-w-[276px] md:items-start sidebar h-[172px] md:h-auto"
      data-testid="wizard-sidebar"
    >
      {/* Steps */}
      <nav className="relative z-10 flex md:flex-col gap-4 md:gap-7">
        {steps.map((step) => {
          const isActive = step.number === activeStepNumber;

          return (
            <div key={step.number} className="flex items-center gap-4">
              {/* Step Number Circle */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-all duration-200',
                  isActive
                    ? 'border-blue-200 bg-blue-200 text-blue-950'
                    : 'border-white bg-transparent text-white'
                )}
              >
                {step.number}
              </div>

              {/* Step Text */}
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-normal tracking-wide text-blue-300">
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

