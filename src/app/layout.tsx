import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NewNavbar from "./components/NewNavbar";
import Footer from "./components/Footer";
import DynamicBackground from "./components/Background";

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
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}>
        {/* Background for ALL pages */}
        <DynamicBackground />
        
        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <NewNavbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}