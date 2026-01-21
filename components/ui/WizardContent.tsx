import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WizardContentProps {
  children: ReactNode;
  className?: string;
}

export function WizardContent({ children, className }: WizardContentProps) {
  return (
    <div
      data-testid="wizard-content"
      className={cn(
        "flex flex-0 flex-col rounded-lg -mt-18 z-10 relative bg-white shadow-lg pt-6 px-6 pb-8 w-fit mx-auto mb-10",
        "sm:mt-0 sm:shadow-none sm:py-10 sm:px-[84px] sm:pt-8 sm:pb-4 sm:mx-0 sm:p-0 sm:bg-transparent sm:rounded-none sm:w-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
