import ClientProviders from "@/components/ClientProviders";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex flex-col">
          { children }
        </div>
      </div>
    </ClientProviders>
  );
}
