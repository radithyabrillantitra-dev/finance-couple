import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Providers } from "./providers"; // Import Provider

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Finance Couple",
  description: "Keuangan kita bersama.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning> 
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}>
        <Providers> {/* Bungkus disini */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}