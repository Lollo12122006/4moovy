"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#E5E7EB] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#0f3549] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] tracking-tight">4M</span>
          </div>
          <span
            className="font-semibold text-[#0f3549] text-[15px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            4Moovy
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Home", href: "/" },
            { label: "Confronto", href: "/#confronto" },
            { label: "Preventivo", href: "/preventivo" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="mailto:info@4moovy.it?subject=Richiesta informazioni noleggio"
          className="shrink-0 bg-[#0f3549] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a4d66] transition-colors duration-200"
        >
          Contattaci
        </a>
      </div>
    </header>
  );
}
