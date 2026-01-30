'use client'

import { Form, FormHeader, TextField, WizardNavigation, WizardContent } from '@/components/ui';
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/lib/WizardContext'

const formSchema = z.object({
  name: z.string().min(2, 'This field is required'),
  email: z.email('Please enter a valid email'),
  phone: z.string()
    .min(1, 'This field is required')
    .regex(/^[\d ]+$/, 'Please enter a valid phone number')
    .refine(val => val.replace(/ /g, '').length >= 6, 'Phone number must contain at least 6 digits')
})

type Inputs = z.infer<typeof formSchema>

export default function Step1() {
  const { data, updateData } = useWizard()
  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
    },
  });

  const onSubmit = (formData: Inputs) => {
    updateData(formData)
    router.push('/wizard/step2')
  }

  const handleNext = methods.handleSubmit(onSubmit)

  return (
    <>
      <FormProvider {...methods}>
        <WizardContent>
          <FormHeader
            title="Personal info"
            description="Please provide your name, email address, and phone number."
          />

          <Form onSubmit={onSubmit} className="mt-5 sm:mt-8">
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
                placeholder="e.g. 66 234 567 890"
              />
            </div>
          </Form>
        </WizardContent>

        <WizardNavigation
          showBack={false}
          onNext={handleNext}
        />
      </FormProvider>
    </>
  );
}
