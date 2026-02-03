"use client";

import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { Input } from './Input';

type TextFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  disabled?: boolean;
  className?: string;
};

export function TextField({
  label,
  name,
  // rules,
  ...inputProps
}: TextFieldProps) {
    const methods = useFormContext();
    const { register, formState: { errors } } = methods;

    const error = errors[name];
    const errorMessage = error?.message as string | undefined;

    return (
    <FormField label={label} htmlFor={name} error={errorMessage}>
      <Input
        id={name}
        error={!!error}
        {...register(name /*, rules*/)}
        {...inputProps}
      />
    </FormField>
  );
}

