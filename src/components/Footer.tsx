import Link from "next/link";

const nav = [
  { label: "Home", href: "/" },
  { label: "Confronto", href: "/#confronto" },
  { label: "Preventivo", href: "/preventivo" },
  { label: "FAQ", href: "/preventivo#faq" },
];

const services = [
  "Noleggio lungo termine",
  "Confronto costi",
  "Preventivo gratuito",
  "Consulenza dedicata",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-[#0f3549] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">4M</span>
              </div>
              <span
                className="font-semibold text-[#0f3549] text-[15px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                4Moovy
              </span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
              La piattaforma per confrontare noleggio lungo termine e acquisto
              auto con trasparenza e controllo totale dei costi.
            </p>
            <div className="mt-6 space-y-1.5">
              <a
                href="mailto:info@4moovy.it"
                className="block text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
              >
                info@4moovy.it
              </a>
              <p className="text-sm text-[#6B7280]">+39 02 1234 5678</p>
              <p className="text-sm text-[#6B7280]">Milano, Italia</p>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] mb-4">
              Servizi
            </p>
            <div className="space-y-2.5">
              {services.map((s) => (
                <p key={s} className="text-sm text-[#6B7280]">
                  {s}
                </p>
              ))}
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] mb-4">
              Navigazione
            </p>
            <div className="space-y-2.5">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            © 2026 4Moovy. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Cookie Policy", "Termini e condizioni"].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs text-[#6B7280] hover:text-[#0A0A0A] cursor-pointer transition-colors"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
