import Navigation from "@/components/site/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full">
      <Navigation />
      {children}
    </main>
  );
}
