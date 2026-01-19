import { Button } from './Button';
import { cn } from '@/lib/utils';

interface WizardNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  className?: string;
}

export function WizardNavigation({
  showBack = true,
  onBack,
  onNext,
  nextLabel = "Next Step",
  backLabel = "Go Back",
  className
}: WizardNavigationProps) {
  return (
    <div
      className={cn("mt-auto flex justify-between pt-8 place-content-end self-end w-full", className)}
      data-testid="wizard-navigation"
    >
      {showBack && onBack && (
        <Button type="button" variant="ghost" onClick={onBack}>
          {backLabel}
        </Button>
      )}

      <Button
        type={onNext ? "button" : "submit"}
        onClick={onNext}
        className="min-w-[96px] md:min-w-[120px]"
      >
        {nextLabel}
      </Button>
    </div>
  );
}
