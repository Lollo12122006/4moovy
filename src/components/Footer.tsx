import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-5 md:px-10 pb-10 pt-16">
      <div className="max-w-7xl mx-auto rounded-[40px] bg-[#0f3549] overflow-hidden shadow-[0_30px_80px_rgba(15,53,73,0.20)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 p-10 md:p-14 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[#ffdc46] font-black text-sm">4M</span>
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">4Moovy</p>
                <p className="text-xs text-[#73d2d2] font-medium">Noleggio intelligente</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm text-sm">
              La piattaforma premium per confrontare noleggio lungo termine e
              acquisto auto con trasparenza, semplicità e controllo totale dei
              costi.
            </p>
            <div className="mt-8 space-y-2">
              <a
                href="mailto:info@4moovy.it"
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                info@4moovy.it
              </a>
              <p className="text-sm text-gray-400">+39 02 1234 5678</p>
              <p className="text-sm text-gray-400">Milano, Italia</p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Servizi
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              {["Noleggio lungo termine", "Confronto costi", "Preventivo gratuito", "Consulenza dedicata"].map(
                (s) => (
                  <p key={s} className="hover:text-white transition-colors cursor-default">
                    {s}
                  </p>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigazione
            </h3>
            <div className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Confronto", href: "/#confronto" },
                { label: "Preventivo", href: "/preventivo" },
                { label: "FAQ", href: "/preventivo#faq" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-10 md:px-14 py-6">
          <p className="text-xs text-gray-500">
            © 2026 4Moovy — Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            {["Privacy Policy", "Cookie Policy", "Termini e condizioni"].map(
              (item) => (
                <span
                  key={item}
                  className="hover:text-gray-300 cursor-pointer transition-colors"
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
