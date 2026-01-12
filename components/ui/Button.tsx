import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'h-12 rounded-lg px-6 text-base font-medium transition-colors cursor-pointer',
          {
            'bg-blue-950 text-white hover:bg-blue-950': variant === 'primary',
            'bg-transparent text-grey-500 hover:text-blue-950': variant === 'secondary',
            'bg-transparent text-grey-500 hover:text-blue-950 temp': variant === 'ghost',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };

