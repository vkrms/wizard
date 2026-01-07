"use client";

import { type InputHTMLAttributes } from 'react';
import { useFormContext, RegisterOptions, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';
import { Input } from './Input';

interface TextFieldProps<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label: string;
  name: Path<T>;
  rules?: RegisterOptions<T>;
}

export function TextField<T extends FieldValues>({
  label,
  name,
  rules,
  ...inputProps
}: TextFieldProps<T>) {
  const { register, formState: { errors } } = useFormContext<T>();
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <FormField label={label} htmlFor={name} error={errorMessage}>
      <Input
        id={name}
        error={!!error}
        {...register(name, rules)}
        {...inputProps}
      />
    </FormField>
  );
}

