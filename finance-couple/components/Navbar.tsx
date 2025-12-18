"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Heart } from "lucide-react"; 
import { ThemeToggle } from "./ThemeToggle"; // Import Toggle

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
          Finance.
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <Link 
            href="/" 
            className={`flex items-center gap-2 text-sm font-sans transition-colors ${pathname === '/' ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'}`}
          >
            <BookOpen size={18} />
            <span className="hidden md:inline">Stories</span>
          </Link>
          
          <Link 
            href="/wishlist" 
            className={`flex items-center gap-2 text-sm font-sans transition-colors ${pathname === '/wishlist' ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'}`}
          >
            <Heart size={18} />
            <span className="hidden md:inline">Wishlist</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* PASANG TOMBOL DARK MODE DISINI */}
          <ThemeToggle />
          
          <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-xs font-serif italic ml-2">
            Us
          </div>
        </div>

      </div>
    </nav>
  );
}