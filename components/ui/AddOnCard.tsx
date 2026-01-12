import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AddOnCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  addOn: {
    id: string;
    name: string;
    description: string;
  };
  price: string;
  isSelected?: boolean;
}

const AddOnCard = ({ className, addOn, price, isSelected, ...props }: AddOnCardProps) => {
  return (
    <label className={cn(
      'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
      isSelected
        ? 'border-primary bg-alabaster'
        : 'border-light-gray bg-white hover:border-primary',
      className
    )}>
      <input 
        type="checkbox" 
        className="w-5 h-5 rounded border-light-gray text-primary focus:ring-primary cursor-pointer accent-primary" 
        checked={isSelected}
        {...props} 
      />
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-marine-blue font-medium">{addOn.name}</span>
        <span className="text-cool-gray text-sm">{addOn.description}</span>
      </div>
      <span className="text-primary text-sm font-medium">{price}</span>
    </label>
  );
};

AddOnCard.displayName = 'AddOnCard';

export { AddOnCard };
