'use client'

import { FormHeader, TextField, WizardNavigation } from '@/components/ui';
import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useWizard } from '@/lib/WizardContext'

type Inputs = {
  name: string
  email: string
  phone: string
}

export default function Step1() {
  const { data, updateData } = useWizard()
  const router = useRouter();

  const methods = useForm<Inputs>({
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

  return (
    <>
      <div className="max-w-[384px]">
        <FormHeader
          title="Personal info"
          description="Please provide your name, email address, and phone number."
        />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-9 flex flex-1 flex-col"
          >
            <div className="flex flex-col gap-6">
              <TextField
                label="Name"
                name="name"
                type="text"
                placeholder="e.g. Stephen King"
                rules={{ required: "This field is required" }}
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g. stephenking@lorem.com"
                rules={{ required: "This field is required" }}
              />

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="e.g. +1 234 567 890"
                rules={{ required: "This field is required" }}
              />
            </div>

            <WizardNavigation
              showBack={false}
            />
            
          </form>
        </FormProvider>
      </div>
    </>
  );
}
