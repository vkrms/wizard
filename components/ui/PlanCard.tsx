import { type ComponentType, type InputHTMLAttributes, type SVGProps } from 'react';
import { cn } from '@/lib/utils';

// god, this is some type gymnastics
export interface PlanCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  plan: {
    id: string;
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  };
  price: string;
  isSelected?: boolean;
  yearlyPerk?: string;
}

const PlanCard = ({ className, plan, price, isSelected, yearlyPerk, ...props }: PlanCardProps) => {
  const Icon = plan.icon;

  return (
    <label
      // tabIndex={0}
      className={cn(
        'flex flex-row md:flex-col gap-3 md:gap-11 p-4 rounded-lg border-2 cursor-pointer transition-all md:h-[184px]',

        'focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1',
        
        isSelected
          ? 'border-purple-600 bg-blue-50'
          : 'border-purple-200 bg-white hover:border-purple-600',
        className
    )}>
      <input type="radio" className="sr-only" value={plan.id} {...props} />
      <div className="shrink-0">
        <Icon className="w-10 h-10" role="img" aria-label={plan.name} />
      </div>
      <div className="flex flex-col">
        <span className="text-blue-950 font-medium md:leading-[1.3]">{plan.name}</span>
        <span className="text-grey-500 text-sm">{price}</span>
        <span className="text-grey-500 text-[12px] md:mt-1">{yearlyPerk}</span>
      </div>
    </label>
  );
};

PlanCard.displayName = 'PlanCard';

export { PlanCard };

