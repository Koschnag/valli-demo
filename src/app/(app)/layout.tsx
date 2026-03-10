import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16 pb-20 md:pb-0 min-h-screen">{children}</main>
      <BottomNav />
    </>
  );
}
