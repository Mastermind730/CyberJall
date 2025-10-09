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
  
  // Hide navbar and footer for provider, customer, and dashboard routes
  const hideNavbar = isProviderRoute || isCustomerRoute || isDashboardRoute;

  return (
    <>
      <div className="relative z-10 min-h-screen flex flex-col">
        {!hideNavbar && <NavbarNew />}
        <main className={hideNavbar ? "min-h-screen" : "flex-1"}>{children}</main>
        {!isCustomerRoute && !hideNavbar && <Footer />}
      </div>
    </>
  );
}
