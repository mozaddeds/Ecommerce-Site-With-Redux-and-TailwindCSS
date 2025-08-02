import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/provider";
import Navbar from "./Components/Navbar";


export const metadata: Metadata = {
  title: {
    default: 'ShopEase - Your Favorite Store',
    template: '%s | ShopEase'
  },
  description: 'Discover amazing products at great prices',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >

        <Providers>
          <Navbar />
          <main className="min-h-screen bg-[#eaf5e8]">
            {children}
          </main>
          <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
