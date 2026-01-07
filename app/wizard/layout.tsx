import WizardSidebar from '@/components/WizardSidebar';

export default function WizardLayout({
  children
}: Readonly<{ children: React.ReactNode}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-magnolia font-sans">
      <main className="flex rounded-2xl bg-white p-4 shadow-lg">
        {/* Sidebar */}
        <WizardSidebar />

        <div>
          {children}
        </div>
      </main>
    </div>
  )
}
