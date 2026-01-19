'use client'

import DesignControl from '@/components/DesignControl';
import { WizardContent } from '@/components/ui';
import Image from 'next/image';

export default function Step5() {
  return (
    <>
      <DesignControl
        srcMobile="/design/mobile-design-step-5.jpg"
        srcDesktop="/design/desktop-design-step-5.jpg"
        className=""
      />
      
      <WizardContent>
        <div className="flex flex-col items-center justify-center text-center mt-14 md:mt-18 mb-12 md:py-16">
          {/* Thank You Icon */}
          <div className="mb-4 md:mb-6 flex shrink-0 items-center justify-center">
            <Image 
              src="/icon-thank-you.svg" 
              alt="Thank you" 
              width={80} 
              height={80}
              className="w-14 h-auto md:w-auto"
            />
          </div>

          {/* Heading */}
          <h1 className="text-[24px] md:text-[32px] font-bold text-blue-950">
            Thank you!
          </h1>

          {/* Confirmation Message */}
          <p className="max-w-md text-base text-grey-500 mt-2 leading-[1.55]">
            Thanks for confirming your subscription! We hope you have fun using our platform. 
            If you ever need support, please feel free to email us at{' '}
            <a 
              href="mailto:support@loremgaming.com" 
              className="hover:text-purple-600 transition"
            >
              support@loremgaming.com
            </a>
            .
          </p>
        </div>
      </WizardContent>
    </>
  );
}
