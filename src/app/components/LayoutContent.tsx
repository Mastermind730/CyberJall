"use client";

import { usePathname } from "next/navigation";
import NavbarNew from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCustomerRoute = pathname?.startsWith("/customer");
  const isProviderRoute = pathname?.startsWith("/provider");
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  // Always show Navbar; only hide Footer for portal/dashboard routes
  const hideFooter = isProviderRoute || isCustomerRoute || isDashboardRoute;

  return (
    <>
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavbarNew />
        <main className={hideFooter ? "min-h-screen" : "flex-1"}>
          {children}
        </main>
        {!isCustomerRoute && !hideFooter && <Footer />}
      </div>
    </>
  );
}
