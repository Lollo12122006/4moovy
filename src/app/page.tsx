"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FeatureGrid from "@/components/FeatureGrid";
import { useInView } from "@/hooks/useInView";

/* ─── DATA ──────────────────────────────────────────────── */
const carData = {
  "Fiat 500 Hybrid Icon": {
    image: "/cars/fiat500.jpg",
    shortDescription: "City car iconica, economica e facile da parcheggiare.",
    longDescription: "La Fiat 500 è una piccola che non passa inosservata. Nata per la città, è facile da guidare, economica da gestire e semplice da parcheggiare anche negli spazi più stretti. Una scelta intelligente per chi si muove principalmente in centro o in contesti urbani affollati.",
    highlights: ["Consumi ridotti, ideale per uso urbano quotidiano", "Dimensioni compatte, parcheggio facilitato", "Costi di manutenzione tra i più bassi della categoria"],
    noleggio: "€406",
    acquisto: "€520",
    assicurazione: "€800-1.100/anno",
    manutenzione: "€700/anno",
    totaleNoleggio: "€19.500",
    totaleAcquisto: "€24.800",
    prezzoAuto: "€18.900",
    assicurazioneAnnua: 950,
    manutenzioneAnnua: 700,
    alimentazione: "Hybrid",
    simili: ["Kia Picanto", "Toyota Yaris Hybrid"],
  },
  "Peugeot 208": {
    image: "/cars/peugeot208.jpg",
    shortDescription: "Design originale, interni curati e una guida vivace per la categoria.",
    longDescription: "La Peugeot 208 è una delle city car più raffinate del segmento. Interni con finiture di qualità, un design riconoscibile e un comportamento su strada piacevole. Una buona scelta per chi vuole qualcosa di più ricercato rispetto alla media, senza aumentare troppo il canone mensile.",
    highlights: ["Design di interni originale e ben riuscito", "Guida vivace e coinvolgente per la categoria", "Buon equilibrio tra stile e praticità quotidiana"],
    noleggio: "€439",
    acquisto: "€570",
    assicurazione: "€850-1.200/anno",
    manutenzione: "€850/anno",
    totaleNoleggio: "€21.072",
    totaleAcquisto: "€27.360",
    prezzoAuto: "€22.500",
    assicurazioneAnnua: 1050,
    manutenzioneAnnua: 850,
    alimentazione: "Benzina/Diesel",
    simili: ["Toyota Yaris Hybrid", "Fiat 500 Hybrid Icon"],
  },
  "Toyota Yaris Hybrid": {
    image: "/cars/yaris.jpg",
    shortDescription: "Affidabile e risparmiosa, ideale per chi percorre tanti km.",
    longDescription: "La Toyota Yaris ibrida è una delle auto più affidabili sul mercato. Il sistema hybrid Toyota riduce i consumi in modo significativo, soprattutto in città, e la qualità costruttiva garantisce pochi problemi nel tempo. Una scelta solida per chi fa tanti chilometri e vuole spendere poco in carburante e manutenzione.",
    highlights: ["Motore ibrido con consumi reali tra i più bassi", "Affidabilità Toyota comprovata nel tempo", "Ottimo valore di rivendita a fine noleggio"],
    noleggio: "€469",
    acquisto: "€610",
    assicurazione: "€900-1.250/anno",
    manutenzione: "€900/anno",
    totaleNoleggio: "€22.512",
    totaleAcquisto: "€29.280",
    prezzoAuto: "€24.900",
    assicurazioneAnnua: 1100,
    manutenzioneAnnua: 900,
    alimentazione: "Hybrid",
    simili: ["Kia Picanto", "Fiat 500 Hybrid Icon"],
  },
  "Volkswagen T-Cross": {
    image: "/cars/tcross.jpg",
    shortDescription: "SUV compatto Volkswagen: spazioso, solido e ben rifinito.",
    longDescription: "Il Volkswagen T-Cross è uno dei SUV compatti meglio riusciti della categoria. Spazio interno sorprendente per le sue dimensioni, finiture di qualità tipicamente tedesche e una tenuta di strada sicura e prevedibile. Adatto sia all'uso quotidiano che ai viaggi più lunghi con famiglia o bagagli.",
    highlights: ["Spazio interno ampio per la categoria", "Finiture e qualità costruttiva tipicamente VW", "Tenuta di strada stabile e rassicurante"],
    noleggio: "€512",
    acquisto: "€690",
    assicurazione: "€950-1.300/anno",
    manutenzione: "€950/anno",
    totaleNoleggio: "€24.560",
    totaleAcquisto: "€33.120",
    prezzoAuto: "€29.718",
    assicurazioneAnnua: 1150,
    manutenzioneAnnua: 950,
    alimentazione: "Benzina",
    simili: ["Volvo XC40 B3", "Nissan Juke"],
  },
  "Volvo XC40 B3": {
    image: "/cars/volvoxc40.jpg",
    shortDescription: "Premium svedese, sicurezza eccellente e comfort superiore.",
    longDescription: "La Volvo XC40 è la scelta di chi non vuole scendere a compromessi. Interni di qualità premium, tecnologie di sicurezza tra le più avanzate del mercato e una guida confortevole anche sui percorsi più lunghi. Il B3 mild hybrid bilancia bene prestazioni e consumi, mantenendo il carattere elegante tipico di Volvo.",
    highlights: ["Sistemi di sicurezza attiva tra i migliori della categoria", "Interni premium con materiali di qualità superiore", "Comfort di guida eccellente su tutti i percorsi"],
    noleggio: "€778",
    acquisto: "€980",
    assicurazione: "€1.200-1.700/anno",
    manutenzione: "€1.200/anno",
    totaleNoleggio: "€37.344",
    totaleAcquisto: "€47.040",
    prezzoAuto: "€44.365",
    assicurazioneAnnua: 1450,
    manutenzioneAnnua: 1200,
    alimentazione: "Mild Hybrid",
    simili: ["Volkswagen T-Cross", "Nissan Juke"],
  },
  "Kia Picanto": {
    image: "/cars/kiapicanto.jpg",
    shortDescription: "L'opzione più economica: compatta, affidabile e a basso costo.",
    longDescription: "La Kia Picanto è la scelta più accessibile della selezione, ma non per questo deludente. Affidabile, semplice da guidare e con costi di gestione tra i più contenuti del mercato. Perfetta per chi cerca la soluzione essenziale per la città, senza rinunciare all'affidabilità nel tempo.",
    highlights: ["Canone mensile tra i più bassi della selezione", "Affidabilità Kia con garanzia pluriennale", "Dimensioni compatte, ideale per uso urbano"],
    noleggio: "€346",
    acquisto: "€290",
    assicurazione: "€750-950/anno",
    manutenzione: "€500/anno",
    totaleNoleggio: "€16.600",
    totaleAcquisto: "€24.200",
    prezzoAuto: "€18.300",
    assicurazioneAnnua: 850,
    manutenzioneAnnua: 500,
    alimentazione: "Benzina",
    simili: ["Fiat 500 Hybrid Icon", "Toyota Yaris Hybrid"],
  },
  "Nissan Juke": {
    image: "/cars/nissanjuke.jpg",
    shortDescription: "SUV compatto dinamico, tecnologia e stile senza compromessi.",
    longDescription: "Il Nissan Juke divide i gusti per il design, ma convince chi lo guida. L'abitacolo è curato, la tecnologia di bordo è aggiornata e il comportamento su strada è più dinamico di quanto le dimensioni facciano pensare. Una buona scelta per chi vuole un SUV compatto con carattere.",
    highlights: ["Tecnologia di bordo aggiornata e intuitiva", "Guida dinamica e piacevole per un SUV compatto", "Design riconoscibile e distintivo"],
    noleggio: "€554",
    acquisto: "€470",
    assicurazione: "€950-1.250/anno",
    manutenzione: "€750/anno",
    totaleNoleggio: "€26.600",
    totaleAcquisto: "€41.800",
    prezzoAuto: "€31.700",
    assicurazioneAnnua: 1100,
    manutenzioneAnnua: 750,
    alimentazione: "Hybrid",
    simili: ["Volkswagen T-Cross", "Volvo XC40 B3"],
  },
};

/* ─── HELPERS ────────────────────────────────────────────── */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [driverProfile, setDriverProfile] = useState("");
  const [contractDuration, setContractDuration] = useState("");

  /* ── Derived ── */
  const isNewDriver = driverProfile === "Neopatentato";
  const currentCar = carData[selectedCar as keyof typeof carData] ?? null;
  const similarCars = currentCar?.simili ?? ["Fiat 500 Hybrid Icon", "Toyota Yaris Hybrid"];
  const is36Months = contractDuration === "36 mesi";

  const insuranceCost = isNewDriver ? "€1.400/anno" : currentCar?.assicurazione;

  const rentalPrice = is36Months
    ? `€${parseInt(currentCar?.noleggio.replace("€", "") ?? "0") + 40}`
    : currentCar?.noleggio ?? "€0";

  const totalRental = is36Months
    ? `€${((parseInt(currentCar?.noleggio.replace("€", "") ?? "0") + 40) * 36).toLocaleString("it-IT")}`
    : currentCar?.totaleNoleggio ?? "€0";

  const durationYears = is36Months ? 3 : 4;
  const insuranceTotal = isNewDriver ? 1400 * durationYears : (currentCar?.assicurazioneAnnua ?? 0) * durationYears;
  const maintenanceTotal = (currentCar?.manutenzioneAnnua ?? 0) * durationYears;
  const totalOwnershipCost =
    parseInt(currentCar?.prezzoAuto.replace(/[^\d]/g, "") ?? "0") +
    insuranceTotal +
    maintenanceTotal;

  /* ── Handlers ── */
  const handleSelectCar = (name: string) => {
    if (selectedCar === name) {
      setSelectedCar("");
      setShowConfigurator(false);
    } else {
      setSelectedCar(name);
    }
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfigurator(true);
    setTimeout(() => {
      document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleBackToSelection = () => {
    setShowConfigurator(false);
    setTimeout(() => {
      document.getElementById("confronto")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setShowResults(false);
    setSelectedCar("");
    setDriverProfile("");
    setContractDuration("");
    setShowConfigurator(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedCar) setShowConfigurator(false);
  }, [selectedCar]);

  const { ref: carsRef, inView: carsInView } = useInView({ threshold: 0.05 });
  const { ref: compRef, inView: compInView } = useInView({ threshold: 0.1 });

  /* ── Comparison cars (for the similar-cars table) ── */
  const comparisonCars = [
    {
      name: selectedCar,
      image: currentCar?.image ?? "",
      monthly: rentalPrice,
      fuel: currentCar?.alimentazione ?? "",
      total: totalRental,
      isSelected: true,
      isCheaper: false,
    },
    ...similarCars.map((n) => {
      const d = carData[n as keyof typeof carData];
      const m = parseInt(d?.noleggio.replace(/[^\d]/g, "") ?? "0");
      return {
        name: n,
        image: d?.image ?? "",
        monthly: d?.noleggio ?? "€0",
        fuel: d?.alimentazione ?? "",
        total: is36Months
          ? `€${(m * 36).toLocaleString("it-IT")}`
          : `€${(m * 48).toLocaleString("it-IT")}`,
        isSelected: false,
        isCheaper: m < parseInt(rentalPrice.replace(/[^\d]/g, "")),
      };
    }),
  ];

  const comparisonRows = [
    { label: "Canone mensile", values: comparisonCars.map((c) => c.monthly) },
    { label: "Alimentazione",  values: comparisonCars.map((c) => c.fuel) },
    { label: "Servizi inclusi", values: comparisonCars.map(() => "RCA · Kasko · Tagliandi") },
    { label: "Totale noleggio", values: comparisonCars.map((c) => c.total) },
  ];

  /* ── Reusable micro components ── */
  const StepLabel = ({ n, title, subtitle }: { n: string; title: string; subtitle: string }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-8 h-8 rounded-lg bg-[#0f3549] text-white flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">
        {n}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[#0A0A0A]">{title}</h2>
        <p className="text-sm text-[#6B7280] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );

  const ToggleGroup = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              value === opt
                ? "bg-[#0f3549] text-white border-[#0f3549]"
                : "bg-white text-[#0A0A0A] border-[#E5E7EB] hover:border-[#0f3549] hover:text-[#0f3549]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  /* ════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ── PRE-RESULTS ─────────────────────────────────── */}
      {!showResults && (
        <>
          {/* HERO */}
          <section className="pt-16 pb-0">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <div>
                  {/* Trust badge */}
                  <div
                    className="animate-fade-up inline-flex items-center gap-2 border border-[#E5E7EB] rounded-full px-4 py-1.5 text-xs text-[#6B7280] mb-8"
                    style={{ animationDelay: "0ms" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f3549]" />
                    7 modelli &nbsp;·&nbsp; Confronto immediato &nbsp;·&nbsp; Gratuito
                  </div>

                  <h1
                    className="animate-fade-up font-bold text-[#0A0A0A] leading-[1.08] mb-5"
                    style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", letterSpacing: "-0.025em", animationDelay: "150ms" }}
                  >
                    Noleggio o acquisto?
                    <br />
                    <span className="text-[#0f3549]">Scopri la scelta giusta.</span>
                  </h1>

                  <p
                    className="animate-fade-up text-base md:text-lg text-[#6B7280] leading-relaxed max-w-lg mb-10"
                    style={{ animationDelay: "300ms" }}
                  >
                    Configura, confronta e scegli in pochi minuti. Tutti i costi
                    inclusi: assicurazione, manutenzione, svalutazione.
                  </p>

                  <div
                    className="animate-fade-up flex flex-wrap gap-3"
                    style={{ animationDelay: "450ms" }}
                  >
                    <a
                      href="#confronto"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("confronto")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 bg-[#0f3549] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#1a4d66] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                    >
                      Confronta ora
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <Link
                      href="/preventivo"
                      className="inline-flex items-center gap-2 border border-[#0f3549] text-[#0f3549] px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#0f3549] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                    >
                      Vedi preventivo
                    </Link>
                  </div>
                </div>

                {/* Car image */}
                <div className="relative flex justify-center">
                  <div className="relative w-full max-w-[580px] aspect-[4/3]">
                    <Image
                      src="/cars/volvoxc40.jpg"
                      alt="Volvo XC40 — Noleggio lungo termine"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CAR SELECTION */}
          {!showConfigurator && (
            <section className="border-t border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
              <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
                <StepLabel
                  n="1"
                  title="Scegli il veicolo"
                  subtitle="Seleziona il modello da confrontare tra noleggio e acquisto."
                />
                <div
                  ref={carsRef}
                  id="confronto"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {Object.entries(carData).map(([name, car], idx) => (
                    <div
                      key={name}
                      className={carsInView ? "animate-fade-up" : "opacity-0"}
                      style={carsInView ? { animationDelay: `${idx * 60}ms` } : {}}
                    >
                      <CarCard
                        name={name}
                        image={car.image}
                        description={car.shortDescription}
                        price={car.noleggio}
                        alimentazione={car.alimentazione}
                        isSelected={selectedCar === name}
                        showConfigurator={showConfigurator}
                        onSelect={() => handleSelectCar(name)}
                        onConfigure={handleConfigure}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CONFIGURATOR */}
          {showConfigurator && (
            <section id="configurator" className="border-t border-[#E5E7EB]">
              <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
                <StepLabel
                  n="2"
                  title="Configura il noleggio"
                  subtitle="Scegli durata e profilo conducente per il tuo confronto."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Options panel */}
                  <div className="lg:col-span-2 space-y-6">
                    <button
                      type="button"
                      onClick={handleBackToSelection}
                      className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200 mb-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Torna alla selezione
                    </button>

                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-6">
                      <ToggleGroup
                        label="Durata contratto"
                        options={["36 mesi", "48 mesi"]}
                        value={contractDuration}
                        onChange={setContractDuration}
                      />
                      <div className="border-t border-[#E5E7EB]" />
                      <ToggleGroup
                        label="Profilo conducente"
                        options={["Neopatentato", "Guidatore esperto"]}
                        value={driverProfile}
                        onChange={setDriverProfile}
                      />
                    </div>
                  </div>

                  {/* Summary card */}
                  <div className="bg-[#0f3549] text-white rounded-xl p-6 flex flex-col">
                    <div className="mb-auto">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#73d2d2] mb-1">
                        {selectedCar}
                      </p>
                      <p className="text-4xl font-bold price mb-1">{currentCar?.noleggio}</p>
                      <p className="text-sm text-white/60 mb-6">/mese · tutto incluso</p>

                      <div className="space-y-2">
                        {["RCA inclusa", "Manutenzione inclusa", "Assistenza inclusa"].map((s) => (
                          <div key={s} className="flex items-center gap-2 text-sm text-white/80">
                            <CheckIcon className="w-3.5 h-3.5 text-[#73d2d2] shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      disabled={!selectedCar || !contractDuration}
                      onClick={() => {
                        setShowResults(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-8 w-full bg-white text-[#0f3549] py-3 rounded-lg text-sm font-semibold hover:bg-[#F7F8FA] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Scopri il confronto →
                    </button>
                    {!contractDuration && (
                      <p className="text-xs text-white/40 text-center mt-3">
                        Seleziona prima una durata
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FEATURE GRID */}
          {!showConfigurator && <FeatureGrid />}
        </>
      )}

      {/* ── RESULTS ─────────────────────────────────────── */}
      {showResults && (
        <div className="pt-16">
          {/* Neopatentato banner */}
          {isNewDriver && (
            <div className="border-b border-amber-200 bg-amber-50">
              <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex gap-3 items-start">
                <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">Neopatentato:</span> i costi assicurativi sono più elevati. Nel noleggio risultano spesso più prevedibili e integrati nel canone.
                </p>
              </div>
            </div>
          )}

          {/* Results header */}
          <div className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
                Analisi personalizzata &nbsp;·&nbsp; {contractDuration}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">{selectedCar}</h1>
              <p className="text-base text-[#6B7280]">
                Confronto tra noleggio lungo termine e acquisto tradizionale.
              </p>
            </div>
          </div>

          {/* Car image */}
          <div className="border-b border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
              <div className="relative w-full max-w-3xl mx-auto aspect-[16/7]">
                <Image
                  src={currentCar?.image ?? "/cars/volvoxc40.jpg"}
                  alt={selectedCar}
                  fill
                  sizes="(max-width: 1280px) 100vw, 896px"
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Monthly rental */}
                <div className="bg-[#0f3549] text-white rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#73d2d2] mb-3">
                    Canone mensile
                  </p>
                  <p className="text-4xl font-bold price mb-3">{rentalPrice}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["RCA", "Manutenzione", "Assistenza"].map((t) => (
                      <span key={t} className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Total rental */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                    Costo totale noleggio
                  </p>
                  <p className="text-4xl font-bold text-[#0f3549] price mb-3">{totalRental}</p>
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                    <CheckIcon className="w-3.5 h-3.5" />
                    Costi prevedibili
                  </div>
                </div>

                {/* Total purchase */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                    Costo totale acquisto
                  </p>
                  <p className="text-4xl font-bold text-[#0A0A0A] price mb-3">
                    €{totalOwnershipCost.toLocaleString("it-IT")}
                  </p>
                  <p className="text-xs text-[#6B7280]">Auto + assicurazione + manutenzione</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison bars + savings */}
          <div className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-1">
                    Risparmio stimato
                  </p>
                  <p className="text-3xl font-bold text-[#0f3549] price">
                    €{(totalOwnershipCost - parseInt(totalRental.replace(/[^\d]/g, ""))).toLocaleString("it-IT")}
                  </p>
                </div>
                <span className="shrink-0 bg-[#ffdc46] text-[#0A0A0A] text-xs font-semibold px-3 py-1.5 rounded-md">
                  A favore del noleggio
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Noleggio",
                    amount: parseInt(totalRental.replace(/[^\d]/g, "")),
                    display: totalRental,
                    color: "bg-[#0f3549]",
                  },
                  {
                    label: "Acquisto",
                    amount: totalOwnershipCost,
                    display: `€${totalOwnershipCost.toLocaleString("it-IT")}`,
                    color: "bg-[#E5E7EB]",
                  },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-[#0A0A0A]">{bar.label}</span>
                      <span className="text-[#6B7280] price">{bar.display}</span>
                    </div>
                    <div className="h-3 bg-[#F7F8FA] rounded-full overflow-hidden border border-[#E5E7EB]">
                      <div
                        className={`h-full ${bar.color} rounded-full transition-all duration-700`}
                        style={{ width: `${(bar.amount / totalOwnershipCost) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail table */}
          <div className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
              <h2 className="text-lg font-semibold text-[#0A0A0A] mb-6">Confronto dettagliato</h2>
              <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0f3549] text-white">
                      <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Parametro</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Noleggio</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Acquisto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {[
                      { label: "Canone mensile",  noleggio: rentalPrice,   acquisto: currentCar?.acquisto },
                      { label: "Costo iniziale",  noleggio: "Incluso",     acquisto: currentCar?.prezzoAuto },
                      { label: "Assicurazione",   noleggio: "Inclusa",     acquisto: insuranceCost },
                      { label: "Manutenzione",    noleggio: "Inclusa",     acquisto: currentCar?.manutenzione },
                      { label: "Costo totale",    noleggio: totalRental,   acquisto: `€${totalOwnershipCost.toLocaleString("it-IT")}` },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className={`animate-fade-up ${i % 2 === 0 ? "bg-white" : "bg-[#F7F8FA]"}`}
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <td className="px-5 py-4 font-medium text-[#0A0A0A]">{row.label}</td>
                        <td className={`px-5 py-4 price ${i === 4 ? "font-bold text-[#0f3549]" : "text-[#6B7280]"}`}>
                          {row.noleggio}
                        </td>
                        <td className={`px-5 py-4 price ${i === 4 ? "font-bold text-[#0A0A0A]" : "text-[#6B7280]"}`}>
                          {row.acquisto}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar cars comparison — 3-column CSS Grid, flattened for perfect alignment */}
          <div ref={compRef} className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-10">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-1">
                  Alternative simili
                </p>
                <h2 className="text-lg font-semibold text-[#0A0A0A]">Confronta altri noleggi</h2>
              </div>

              <div className="overflow-x-auto">
                {/* Single grid: all rows are direct children — guarantees alignment */}
                <div
                  className="grid min-w-[600px] border border-[#E5E7EB] rounded-xl overflow-hidden"
                  style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                  {/* ── Car header cells ── */}
                  {comparisonCars.map((car, idx) => (
                    <div
                      key={`hdr-${idx}`}
                      className={`p-5 ${idx > 0 ? "border-l border-[#E5E7EB]" : "border-l-4 border-l-[#0f3549]"} ${
                        car.isSelected ? "bg-[#0f3549]/5" : "bg-white"
                      } ${compInView ? "animate-fade-up" : "opacity-0"}`}
                      style={compInView ? { animationDelay: `${idx * 80}ms` } : {}}
                    >
                      <div className="relative aspect-[4/3] mb-4">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="240px"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
                        {car.isSelected && (
                          <span className="inline-flex items-center gap-1 bg-[#0f3549] text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            <CheckIcon className="w-2.5 h-2.5" />
                            Selezionata
                          </span>
                        )}
                        {car.isCheaper && (
                          <span className="bg-[#ffdc46] text-[#0A0A0A] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            Più economica
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-semibold ${car.isSelected ? "text-[#0f3549]" : "text-[#0A0A0A]"}`}>
                        {car.name}
                      </p>
                      <p className="text-xs text-[#6B7280] price">{car.monthly}/mese</p>
                    </div>
                  ))}

                  {/* ── Data rows — flattened so CSS grid rows stay aligned ── */}
                  {comparisonRows.flatMap((row, ri) => [
                    /* Full-width label row */
                    <div
                      key={`lbl-${ri}`}
                      className={`col-span-3 px-5 py-2 border-t border-[#E5E7EB] bg-[#F7F8FA] ${compInView ? "animate-fade-in" : "opacity-0"}`}
                      style={compInView ? { animationDelay: `${240 + ri * 80}ms` } : {}}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]">
                        {row.label}
                      </span>
                    </div>,
                    /* Value cells (one per car column) */
                    ...row.values.map((val, vi) => (
                      <div
                        key={`val-${ri}-${vi}`}
                        className={`px-5 py-3.5 text-sm price ${vi > 0 ? "border-l border-[#E5E7EB]" : "border-l-4 border-l-[#0f3549]"} ${
                          vi === 0
                            ? "bg-[#0f3549]/5 text-[#0f3549] font-semibold"
                            : "bg-white text-[#0A0A0A]"
                        } ${compInView ? "animate-fade-in" : "opacity-0"}`}
                        style={compInView ? { animationDelay: `${240 + ri * 80}ms` } : {}}
                      >
                        {val}
                      </div>
                    )),
                  ])}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits summary */}
          <div className="border-b border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                    Svalutazione evitata
                  </p>
                  <p className="text-3xl font-bold text-[#0f3549] mb-2">Fino al 50%</p>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Molte auto perdono metà del valore in 4 anni. Con il noleggio
                    non gestisci rivendita né svalutazione.
                  </p>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-4">
                    Tutto incluso
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "Cambio gomme",
                      "Auto sostitutiva",
                      "RCA / Kasko",
                      "Manutenzione",
                      "Assistenza stradale",
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">{item}</span>
                        <span className="font-medium text-[#0f3549] text-xs">Incluso</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0f3549] text-white rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#73d2d2] mb-3">
                    Controllo totale
                  </p>
                  <p className="text-3xl font-bold mb-3">Un canone. Nessuna sorpresa.</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Gestione più semplice e prevedibile di tutte le spese legate
                    all&apos;auto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="border-b border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                    Passo successivo
                  </p>
                  <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">
                    Vuoi un&apos;offerta personalizzata?
                  </h2>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                    Rispondiamo entro 24h con una proposta su misura per modello,
                    durata e chilometraggio. Nessun impegno.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/preventivo?car=${encodeURIComponent(selectedCar)}`}>
                      <button className="bg-[#0f3549] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#1a4d66] transition-colors duration-200">
                        Scopri il preventivo completo
                      </button>
                    </Link>
                    <button
                      onClick={handleReset}
                      className="border border-[#E5E7EB] text-[#6B7280] px-6 py-3 rounded-lg font-medium text-sm hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-200"
                    >
                      ← Torna alla home
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-4">
                    Cosa è incluso nel noleggio
                  </p>
                  <div className="space-y-3">
                    {[
                      "RCA / Kasko inclusa",
                      "Manutenzione inclusa",
                      "Assistenza stradale",
                      "Cambio gomme disponibile",
                      "Costi mensili prevedibili",
                      "Zero svalutazione da gestire",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-[#0f3549] shrink-0" />
                        <span className="text-sm text-[#0A0A0A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
