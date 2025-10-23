/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutContent from "./components/LayoutContent";
// import DynamicBackground from "./components/Background";

// Inter for body text - clean, modern, highly readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Poppins for headings - professional, marketplace-friendly
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Space Grotesk for accents - tech-focused, modern
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
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
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/main_logo.svg" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Viewport optimization for mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} font-sans bg-black text-white antialiased`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
