import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// god, this is some type gymnastics
export interface PlanCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  plan: {
    id: string;
    name: string;
    icon: string;
  };
  price: string;
  isSelected?: boolean;
}

const PlanCard = ({ className, plan, price, isSelected, ...props }: PlanCardProps) => {
  return (
    <label className={cn(
      'flex flex-col md:flex-row gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
      isSelected
        ? 'border-primary bg-alabaster'
        : 'border-light-gray bg-white hover:border-primary',
      className
    )}>
      <input type="radio" className="sr-only" value={plan.id} {...props} />
      <div className="shrink-0">
        <Image src={plan.icon} alt={plan.name} width={40} height={40} className="w-10 h-10" />
      </div>
      <div className="flex flex-col">
        <span className="text-marine-blue font-medium">{plan.name}</span>
        <span className="text-cool-gray text-sm">{price}</span>
      </div>
    </label>
  );
};

PlanCard.displayName = 'PlanCard';

export { PlanCard };

