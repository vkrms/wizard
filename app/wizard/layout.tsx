import WizardSidebar from '@/components/WizardSidebar';
import { WizardProvider } from '@/lib/WizardContext';

export default function WizardLayout({
  children
}: Readonly<{ children: React.ReactNode}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100 font-sans">
      <main className="flex flex-col md:flex-row md:p-4 md:bg-white md:rounded-lg min-h-[608px] w-full max-w-[720px]" data-testid="wizard-body">
        {/* Sidebar */}
        <WizardSidebar />

        <div className="flex flex-1 flex-col px-6 mx-6 rounded-2xl -mt-32 md:mt-0 z-10 relative bg-white shadow-lg md:shadow-none py-10">
          <div className="flex flex-1 flex-col">
            <WizardProvider>
              {children}
            </WizardProvider>
          </div>
        </div>
      </main>
    </div>
  )
}
