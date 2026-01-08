'use client'

import { Button, FormHeader, TextField } from '@/components/ui';
import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from 'next/navigation'

type Inputs = {
  name: string
  email: string
  phone: string
}

export default function Step1() {
  const methods = useForm<Inputs>();
  const router = useRouter();

  const onSubmit = (data: Inputs) => {
    console.log({formData:data})
    // Save form data to localStorage
    localStorage.setItem('wizardStep1', JSON.stringify(data))
    // Navigate to next step
    router.push('/wizard/step2')
  }

  return (
    <div>
      {/* px-6 */}
      <div className="flex flex-1 flex-col py-10">
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

              {/* Navigation */}
              <div className="mt-auto flex justify-end pt-8">
                <Button type="submit">Next Step</Button>
              </div>
              
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
