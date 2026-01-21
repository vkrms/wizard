import WizardSidebar from '@/components/WizardSidebar';
import { cn } from '@/lib/utils';
import { WizardProvider } from '@/lib/WizardContext';

export default function WizardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen items-start sm:items-center justify-center bg-blue-100 font-sans relative">

      <main
        className="flex flex-col sm:flex-row sm:p-4 sm:bg-white sm:rounded-lg min-h-[600px] w-full max-w-[944px] h-screen sm:h-fit pb-10 max-h-[784px] sm:max-h-[719px] sm:pr-0"
        data-testid="wizard-body"
      >

        {/* Sidebar */}
        <WizardSidebar />

        <div
          className={cn(
            "flex flex-1 flex-col px-4",
            "sm:pt-8 sm:pb-4 sm:pl-[clamp(16px,6%,100px)] sm:pr-[clamp(16px,6%,88px)]"
          )}>
          <WizardProvider>
            {children}
          </WizardProvider>
        </div>
      </main>
    </div>
  )
}
