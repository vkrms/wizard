'use client'

import Image from 'next/image';

export default function Step5() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 md:py-16">
      {/* Thank You Icon */}
      <div className="mb-6 flex shrink-0 items-center justify-center">
        <Image 
          src="/icon-thank-you.svg" 
          alt="Thank you" 
          width={80} 
          height={80}
          className="h-auto w-auto"
        />
      </div>

      {/* Heading */}
      <h1 className="mb-4 text-[32px] font-bold text-blue-950">
        Thank you!
      </h1>

      {/* Confirmation Message */}
      <p className="max-w-md text-base leading-relaxed text-grey-500">
        Thanks for confirming your subscription! We hope you have fun using our platform. 
        If you ever need support, please feel free to email us at{' '}
        <a 
          href="mailto:support@loremgaming.com" 
          className="text-blue-950 hover:text-purple-600 underline"
        >
          support@loremgaming.com
        </a>
        .
      </p>
    </div>
  );
}
