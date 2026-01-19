import WizardSidebar from '@/components/WizardSidebar';
import { cn } from '@/lib/utils';
import { WizardProvider } from '@/lib/WizardContext';

export default function WizardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen items-start md:items-center justify-center bg-blue-100 font-sans relative">

      <main
        className="flex flex-col md:flex-row md:p-4 md:bg-white md:rounded-lg min-h-[600px] w-full max-w-[944px] h-screen md:h-fit pb-10 max-h-[784px] md:max-h-[719px]"
        data-testid="wizard-body"
      >

        {/* Sidebar */}
        <WizardSidebar />

        <div
          className={cn(
            "flex flex-1 flex-col px-4",
            "md:px-[100px] md:pt-8 md:pb-4 md:pl-[100px] md:pr-[88px]"
          )}>
          <WizardProvider>
            {children}
          </WizardProvider>
        </div>
      </main>
    </div>
  )
}
