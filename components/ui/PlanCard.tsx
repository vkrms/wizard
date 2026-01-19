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
  yearlyPerk?: string;
}

const PlanCard = ({ className, plan, price, isSelected, yearlyPerk, ...props }: PlanCardProps) => {
  return (
    <label className={cn(
      'flex flex-row md:flex-col gap-3 md:gap-11 p-4 rounded-lg border-2 cursor-pointer transition-all md:h-[184px]',
      isSelected
        ? 'border-purple-600 bg-blue-50'
        : 'border-purple-200 bg-white hover:border-purple-600',
      className
    )}>
      <input type="radio" className="sr-only" value={plan.id} {...props} />
      <div className="shrink-0">
        <Image src={plan.icon} alt={plan.name} width={40} height={40} className="w-10 h-10" />
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

