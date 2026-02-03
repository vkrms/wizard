import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AddOnCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  addOn: {
    id: string;
    name: string;
    description: string;
  };
  price: string;
  checked?: boolean;
}

const AddOnCard = ({ className, addOn, price, checked, ...props }: AddOnCardProps) => {
  return (
    <label className={cn(
      'flex items-center gap-4 sm:gap-6 p-4 rounded-lg border-2 cursor-pointer transition-all py-[10px] sm:py-4 sm:px-5 h-auto',
      checked
        ? 'border-purple-600 bg-blue-50'
        : 'border-purple-200 bg-white hover:border-purple-600',
      className
    )}>
      <input
        type="checkbox"
        className="w-5 h-5 rounded-md border-purple-200 text-purple-600 focus:ring-purple-600 cursor-pointer accent-purple-600 custom-checkbox"
        checked={checked}
        {...props}
      />
      <div className="flex-1 flex flex-col leading-normal text-[14px] sm:text-[16px]">
        <span className="text-blue-950 font-medium">{addOn.name}</span>
        <span className="text-grey-500 text-xs sm:text-sm">{addOn.description}</span>
      </div>
      <span className="text-purple-600 text-xs sm:text-sm font-medium">{price}</span>
    </label>
  );
};

AddOnCard.displayName = 'AddOnCard';

export { AddOnCard };
