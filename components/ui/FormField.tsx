import { type ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-blue-950">
          {label}
        </label>
        
        {error && (
          <span className="text-sm font-bold text-red-500">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}

