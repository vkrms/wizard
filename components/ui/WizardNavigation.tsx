import { Button } from './Button';

interface WizardNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export function WizardNavigation({
  showBack = true,
  onBack,
  onNext,
  nextLabel = "Next Step",
  backLabel = "Go Back"
}: WizardNavigationProps) {
  return (
    <div className="mt-auto flex justify-between pt-8">
      {showBack && onBack && (
        <Button type="button" variant="ghost" onClick={onBack}>
          {backLabel}
        </Button>
      )}
      <Button type={onNext ? "button" : "submit"} onClick={onNext}>
        {nextLabel}
      </Button>
    </div>
  );
}
