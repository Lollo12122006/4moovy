"use client";

import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Tutto incluso",
    description: "RCA, Kasko, manutenzione ordinaria e straordinaria. Un canone, zero sorprese.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Costi prevedibili",
    description: "Pianifica le spese con certezza. Un canone fisso per tutta la durata del contratto.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Auto nuova ogni contratto",
    description: "A fine contratto scegli il modello successivo. Nessuna gestione della rivendita.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
      </svg>
    ),
    title: "Zero svalutazione",
    description: "Non sei proprietario del veicolo. Non perdi il 40–50% del valore nei primi 4 anni.",
  },
];

export default function FeatureGrid() {
  const { ref: gridRef, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 border-t border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3549] mb-3">
            Perché il noleggio
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] max-w-lg leading-tight">
            Guida senza pensieri. Costi senza sorprese.
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#0f3549] hover:shadow-sm transition-all duration-200 ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={inView ? { animationDelay: `${i * 100}ms` } : {}}
            >
              <div className="w-9 h-9 rounded-lg bg-[#0f3549]/8 flex items-center justify-center text-[#0f3549] mb-5">
                {f.icon}
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2 text-[15px]">{f.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
