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
          'h-10 md:h-12 w-full rounded-sm md:rounded-lg border px-4 text-base font-medium text-blue-950 placeholder:text-grey-500 focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-purple-200 focus:border-purple-600 focus:ring-purple-600',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

