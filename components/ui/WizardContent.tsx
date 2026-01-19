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
        "flex flex-0 flex-col rounded-lg -mt-18 z-10 relative bg-white shadow-lg pt-6 px-6 pb-8",
        "md:mt-0 md:rounded-2xl md:shadow-none md:py-10 md:px-[84px] md:pt-8 md:pb-4 md:mx-0 md:p-0",
        className
      )}
    >
      {children}
    </div>
  );
}
