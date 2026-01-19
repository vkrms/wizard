'use client'

import { type FormHTMLAttributes, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: any) => void | Promise<void>;
  children: ReactNode;
}

export function Form({ onSubmit, className, children, ...props }: FormProps) {
  const { handleSubmit } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-1 flex-col', className)}
      {...props}
    >
      {children}
    </form>
  );
}
