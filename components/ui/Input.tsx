import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-lg border px-4 text-base font-medium text-marine-blue placeholder:text-cool-gray focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out',
          error
            ? 'border-strawberry-red focus:border-strawberry-red focus:ring-strawberry-red'
            : 'border-light-gray focus:border-primary focus:ring-primary',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

