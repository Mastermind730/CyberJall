/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
// import DynamicBackground from "./components/Background";
import NavbarNew from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyberjall",
  description: "Next-gen cybersecurity solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router=useRouter();
  // const isAdminRoute = router.pathname.startsWith('/admin');
  // const pathName= usePathname();

  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}>
        {/* Background for ALL pages */}
        {/* <DynamicBackground /> */}
        {/* <GlobalLayout> */}
        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 min-h-screen flex flex-col">
      <NavbarNew />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* </GlobalLayout> */}
      </body>
    </html>
  );
}