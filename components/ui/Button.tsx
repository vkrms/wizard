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
            'bg-marine-blue text-white hover:bg-primary-hover': variant === 'primary',
            'bg-transparent text-cool-gray hover:text-marine-blue': variant === 'secondary',
            'bg-transparent text-cool-gray hover:text-marine-blue temp': variant === 'ghost',
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

