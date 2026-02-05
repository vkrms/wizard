import { Button, type ButtonProps } from './Button';
import { cn } from '@/lib/utils';

interface WizardNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextVariant?: ButtonProps['variant'];
  className?: string;
}

export function WizardNavigation({
  showBack = true,
  onBack,
  onNext,
  nextLabel = "Next Step",
  backLabel = "Go Back",
  nextVariant = "primary",
  className
}: WizardNavigationProps) {
  return (
    <div
      className={cn(
        "mt-auto flex justify-between pt-8 place-content-end self-end w-full max-w-[488px] mx-auto",
        "sm:ml-0 sm:mr-auto sm:max-w-none",
        className
      )}
      data-testid="wizard-navigation"
    >
      {showBack && onBack && (
        <Button type="button" variant="ghost" onClick={onBack}>
          {backLabel}
        </Button>
      )}

      <Button
        type={onNext ? "button" : "submit"}
        variant={nextVariant}
        onClick={onNext}
        className="min-w-[96px] sm:min-w-[120px]"
      >
        {nextLabel}
      </Button>
    </div>
  );
}
