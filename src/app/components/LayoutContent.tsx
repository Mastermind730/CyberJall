'use client';

import { usePathname } from 'next/navigation';
import NavbarNew from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCustomerRoute = pathname?.startsWith('/customer');

  return (
    <>
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavbarNew />
        <main className="flex-1">{children}</main>
        {!isCustomerRoute && <Footer />}
      </div>
    </>
  );
}