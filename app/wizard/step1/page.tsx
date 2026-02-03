'use client'

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Form, FormHeader, TextField, WizardNavigation, WizardContent } from '@/components/ui';
import { useRouter } from 'next/navigation'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/lib/formStore';

const step1Schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z
    .string()
    .regex(/^[\d+\-\s()]+$/, 'Only numbers, +, -, spaces and parentheses')
    .refine((val) => (val.match(/\d/g) ?? []).length >= 6, 'At least 6 digits required')
})

export type step1SchemaType = z.infer<typeof step1Schema>

export default function Step1() {
  const { name, email, phone } = useFormStore()

  const methods = useForm<step1SchemaType>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name, email, phone }
  })

  const router = useRouter();

  const { setStep1, markStepComplete } = useFormStore()

  const onSubmit: SubmitHandler<step1SchemaType> = (data) => {    
    setStep1(data)
    markStepComplete()
    router.push('/wizard/step2')
  }

  return (
    <>
      <WizardContent>
        <FormHeader
          title="Personal info"
          description="Please provide your name, email address, and phone number."
        />

        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} className="mt-5 sm:mt-8">
            <div className="flex flex-col gap-3 sm:gap-5 max-w-[446px]">
              <TextField
                label="Name"
                name="name"
                type="text"
                placeholder="e.g. Stephen King"
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g. stephenking@lorem.com"
              />

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="e.g. +66 234 567 890"
              />
            </div>
          </Form>
        </FormProvider>
      </WizardContent>

      <WizardNavigation
        showBack={false}
        onNext={(methods.handleSubmit(onSubmit))}
      />
    </>
  );
}
