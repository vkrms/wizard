'use client'

import { type FormHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: any) => void | Promise<void>;
  children: ReactNode;
}

export function Form({ onSubmit, className, children, ...props }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex flex-1 flex-col', className)}
      {...props}
    >
      {children}
    </form>
  );
}
