import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'confirm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'h-10 sm:h-12 rounded-sm sm:rounded-lg px-3 sm:px-6 text-base font-medium transition-colors cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1',
          {
            'bg-blue-950 text-white hover:bg-blue-950/90': variant === 'primary',
            'bg-transparent text-grey-500 hover:text-blue-950': variant === 'secondary',
            'bg-transparent text-grey-500 hover:text-blue-950 px-3 -mx-3': variant === 'ghost',
            'bg-purple-600 text-white hover:bg-purple-600/70': variant === 'confirm',
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

