"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] px-4 pt-4">
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-[28px] border border-white/50 backdrop-blur-2xl transition-all duration-500 ${
          isScrolled
            ? "px-6 py-3 bg-white/95 shadow-md border-[#E5E7EB]/80"
            : "px-8 py-5 bg-white/80 shadow-sm"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#0f3549] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
            <span className="text-[#ffdc46] font-black text-xs tracking-tighter">4M</span>
          </div>
          <div>
            <p className="text-xl font-bold text-[#0f3549] tracking-tight leading-none">
              4Moovy
            </p>
            <p className="text-[11px] text-[#73d2d2] font-medium leading-tight">
              Noleggio intelligente
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#0f3549]/60">
          <Link
            href="/"
            className="hover:text-[#0f3549] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/#confronto"
            className="hover:text-[#0f3549] transition-colors duration-200"
          >
            Confronto
          </Link>
          <Link
            href="/preventivo"
            className="hover:text-[#0f3549] transition-colors duration-200"
          >
            Preventivo
          </Link>
        </div>

        <a
          href="mailto:info@4moovy.it?subject=Richiesta informazioni noleggio"
          className="bg-[#0f3549] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:bg-[#1a4d66] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Contattaci
        </a>
      </nav>
    </div>
  );
}
