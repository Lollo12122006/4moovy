"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FeatureGrid from "@/components/FeatureGrid";

const carData = {
  "Fiat 500 Hybrid Icon": {
    image: "/cars/fiat500.jpg",
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

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [driverProfile, setDriverProfile] = useState("");
  const [contractDuration, setContractDuration] = useState("");

  const isNewDriver = driverProfile === "Neopatentato";
  const currentCar = carData[selectedCar as keyof typeof carData] || null;
  const similarCars = currentCar?.simili || ["Fiat 500 Hybrid Icon", "Toyota Yaris Hybrid"];
  const is36Months = contractDuration === "36 mesi";

  const insuranceCost = isNewDriver ? "€1.400/anno" : currentCar?.assicurazione;

  const rentalPrice = is36Months
    ? `€${parseInt(currentCar?.noleggio.replace("€", "") ?? "0") + 40}`
    : currentCar?.noleggio ?? "€0";

  const totalRental = is36Months
    ? `€${((parseInt(currentCar?.noleggio.replace("€", "") ?? "0") + 40) * 36).toLocaleString("it-IT")}`
    : currentCar?.totaleNoleggio ?? "€0";

  const durationYears = is36Months ? 3 : 4;

  const insuranceTotal = isNewDriver
    ? 1400 * durationYears
    : (currentCar?.assicurazioneAnnua ?? 0) * durationYears;

  const maintenanceTotal = (currentCar?.manutenzioneAnnua ?? 0) * durationYears;

  const totalOwnershipCost =
    parseInt(currentCar?.prezzoAuto.replace(/[^\d]/g, "") ?? "0") +
    insuranceTotal +
    maintenanceTotal;

  const handleSelectCar = (name: string) => {
    setSelectedCar((prev) => (prev === name ? "" : name));
    if (selectedCar === name) {
      setShowConfigurator(false);
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

  return (
    <main className="min-h-screen">
      <Navbar />

      {!showResults && (
        <>
          <div className="pt-32 px-5 md:px-10">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f8fbfc] to-[#eef7f7] border border-[#E5E7EB] mb-12">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] border border-gray-300 rounded-full" />
                <div className="absolute top-[-160px] right-[-160px] w-[500px] h-[500px] border border-gray-200 rounded-full" />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-8 md:px-14 py-16">
                <div>
                  <span className="inline-flex items-center rounded-full border border-[#73d2d2] bg-[#73d2d2]/10 px-4 py-2 text-sm font-medium text-[#0f3549] mb-6">
                    Confronto intelligente
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#0f3549]">
                    Trova l&apos;auto perfetta
                    <br />
                    e confronta
                    <span className="text-[#ffdc46]"> con l&apos;acquisto.</span>
                  </h1>

                  <p className="mt-7 text-lg text-gray-500 max-w-xl leading-relaxed">
                    Configura il tuo noleggio lungo termine e scopri il reale
                    costo di possesso di un&apos;auto, inclusi assicurazione,
                    manutenzione e svalutazione.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {["RCA / Kasko", "Manutenzione", "Svalutazione", "Costi reali"].map(
                      (tag) => (
                        <div
                          key={tag}
                          className="bg-white border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-sm font-medium text-[#0f3549] shadow-sm"
                        >
                          {tag}
                        </div>
                      )
                    )}
                  </div>

                  <a
                    href="#confronto"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("confronto")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 mt-10 bg-[#0f3549] text-white px-7 py-4 rounded-2xl font-semibold text-base hover:bg-[#1a4d66] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Scegli la tua auto
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>

                <div className="relative flex justify-center">
                  <div className="absolute w-[380px] h-[380px] bg-[#73d2d2]/15 blur-3xl rounded-full" />
                  <div className="relative z-10 w-full max-w-[600px] aspect-[4/3]">
                    <Image
                      src="/cars/volvoxc40.jpg"
                      alt="Auto premium — Volvo XC40"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain drop-shadow-[0_30px_60px_rgba(15,53,73,0.20)] hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Car Selection */}
            {!showConfigurator && (
              <div className="relative overflow-hidden bg-white rounded-[40px] shadow-sm border border-[#E5E7EB] p-8 md:p-12 mb-12">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-[#ffdc46] text-[#0f3549] flex items-center justify-center text-lg font-black shadow-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#0f3549]">
                      Seleziona il veicolo
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Scegli il modello da confrontare tra noleggio e acquisto.
                    </p>
                  </div>
                </div>

                <div
                  id="confronto"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {Object.entries(carData).map(([name, car]) => (
                    <CarCard
                      key={name}
                      name={name}
                      image={car.image}
                      price={car.noleggio}
                      alimentazione={car.alimentazione}
                      isSelected={selectedCar === name}
                      showConfigurator={showConfigurator}
                      onSelect={() => handleSelectCar(name)}
                      onConfigure={handleConfigure}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Configurator */}
            {showConfigurator && (
              <div id="configurator" className="mb-12">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-[#ffdc46] text-[#0f3549] flex items-center justify-center text-lg font-black shadow-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#0f3549]">
                      Configura il noleggio
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Scegli durata e profilo conducente per il confronto.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
                    <button
                      type="button"
                      onClick={handleBackToSelection}
                      className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f3549] shadow-sm hover:bg-[#F8F9FA] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Torna alla selezione
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F8F9FA]">
                        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                          Durata contratto
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {["36 mesi", "48 mesi"].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setContractDuration(d)}
                              className={`rounded-2xl border py-4 font-semibold text-sm transition-all duration-300 ${
                                contractDuration === d
                                  ? "bg-[#0f3549] text-white border-[#0f3549] shadow-md"
                                  : "bg-white text-[#0f3549] border-[#E5E7EB] hover:border-[#0f3549]/30"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F8F9FA]">
                        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                          Profilo conducente
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {["Neopatentato", "Guidatore esperto"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setDriverProfile(p)}
                              className={`rounded-2xl border py-3.5 font-semibold text-sm transition-all duration-300 ${
                                driverProfile === p
                                  ? "bg-[#0f3549] text-white border-[#0f3549] shadow-md"
                                  : "bg-white text-[#0f3549] border-[#E5E7EB] hover:border-[#0f3549]/30"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[32px] bg-[#0f3549] text-white p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                      <p className="text-[#73d2d2] text-sm font-medium mb-2">
                        {selectedCar}
                      </p>
                      <p className="text-gray-400 text-xs mb-6">Canone mensile stimato</p>
                      <h3 className="text-5xl font-bold mb-2">
                        {currentCar?.noleggio}
                      </h3>
                      <p className="text-gray-400 text-sm">/mese, tutto incluso</p>

                      <div className="mt-6 space-y-2">
                        {["RCA inclusa", "Manutenzione inclusa", "Assistenza inclusa"].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-4 h-4 rounded-full bg-[#73d2d2]/20 flex items-center justify-center shrink-0">
                              <svg className="w-2.5 h-2.5 text-[#73d2d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {item}
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
                      className="mt-8 w-full relative overflow-hidden bg-[#ffdc46] text-[#0f3549] py-4 rounded-[20px] text-base font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,220,70,0.35)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      Scopri il confronto completo
                    </button>

                    {(!selectedCar || !contractDuration) && (
                      <p className="text-xs text-gray-500 text-center mt-3">
                        {!contractDuration ? "Seleziona prima una durata" : "Seleziona un&apos;auto"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {!showConfigurator && <FeatureGrid />}
        </>
      )}

      {/* Results */}
      {showResults && (
        <div className="pt-32 px-5 md:px-10">
          {isNewDriver && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5 mb-8 flex gap-3">
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-bold mb-1">Informazione per neopatentati</p>
                <p className="text-sm leading-relaxed">
                  I costi assicurativi per neopatentati sono significativamente più
                  elevati. Nel noleggio lungo termine questi costi risultano spesso
                  più prevedibili e integrati nel canone.
                </p>
              </div>
            </div>
          )}

          <div className="mb-12">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-medium">
              Analisi personalizzata · {contractDuration}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f3549] mb-4">
              {selectedCar}
            </h1>
            <p className="text-lg text-gray-500">
              Confronto tra noleggio lungo termine e acquisto tradizionale.
            </p>
          </div>

          {/* Car image */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#F8F9FA] to-white border border-[#E5E7EB] p-10 md:p-16 shadow-sm mb-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,53,73,0.03),transparent_50%)]" />
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-3xl aspect-[16/7]">
                <Image
                  src={currentCar?.image ?? "/cars/volvoxc40.jpg"}
                  alt={selectedCar}
                  fill
                  sizes="(max-width: 1280px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            <div className="rounded-[30px] bg-[#0f3549] text-white p-7 shadow-[0_20px_50px_rgba(15,53,73,0.20)] md:col-span-2">
              <p className="text-[#73d2d2] text-xs uppercase tracking-[0.15em] mb-4 font-semibold">
                Canone mensile noleggio
              </p>
              <div className="flex items-end gap-3">
                <h2 className="text-5xl md:text-6xl font-bold">{rentalPrice}</h2>
                <span className="text-gray-400 mb-2 text-sm">/ mese</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["RCA inclusa", "Manutenzione", "Assistenza"].map((tag) => (
                  <div key={tag} className="bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#E5E7EB] shadow-sm">
              <p className="text-gray-400 text-xs mb-3 uppercase tracking-wide font-medium">
                Costo totale noleggio
              </p>
              <h2 className="text-4xl font-bold text-[#0f3549]">{totalRental}</h2>
              <p className="text-green-600 text-sm mt-3 font-medium flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Costi prevedibili
              </p>
            </div>

            <div className="bg-[#ffdc46] rounded-[30px] p-7 shadow-sm">
              <p className="text-[#0f3549]/60 text-xs mb-3 uppercase tracking-wide font-medium">
                Costo totale acquisto
              </p>
              <h2 className="text-4xl font-bold text-[#0f3549]">
                €{totalOwnershipCost.toLocaleString("it-IT")}
              </h2>
              <p className="text-[#0f3549]/70 text-sm mt-3 font-medium">
                Inclusi tutti i costi
              </p>
            </div>
          </div>

          {/* Comparison bar chart */}
          <div className="mb-8 bg-white rounded-[32px] p-8 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1 font-medium">Differenza stimata</p>
                <h2 className="text-4xl font-bold text-[#0f3549]">
                  €{(
                    totalOwnershipCost -
                    parseInt(totalRental.replace(/[^\d]/g, ""))
                  ).toLocaleString("it-IT")}
                </h2>
              </div>
              <div className="bg-[#ffdc46] text-[#0f3549] px-5 py-2.5 rounded-2xl font-semibold text-sm">
                Risparmio stimato
              </div>
            </div>

            <div className="space-y-5">
              {[
                {
                  label: "Noleggio",
                  value: totalRental,
                  amount: parseInt(totalRental.replace(/[^\d]/g, "")),
                  color: "bg-[#0f3549]",
                },
                {
                  label: "Acquisto",
                  value: `€${totalOwnershipCost.toLocaleString("it-IT")}`,
                  amount: totalOwnershipCost,
                  color: "bg-[#ffdc46]",
                },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-[#0f3549] text-sm">{bar.label}</span>
                    <span className="text-gray-400 text-sm">{bar.value}</span>
                  </div>
                  <div className="w-full h-4 bg-[#F8F9FA] rounded-full overflow-hidden border border-[#E5E7EB]">
                    <div
                      className={`h-full ${bar.color} rounded-full transition-all duration-700`}
                      style={{
                        width: `${(bar.amount / totalOwnershipCost) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-x-auto mb-10">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h2 className="text-xl font-bold text-[#0f3549]">Confronto dettagliato</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f3549] text-white text-xs uppercase tracking-[0.12em]">
                  <th className="text-left px-6 py-4 font-semibold">Parametro</th>
                  <th className="text-left px-6 py-4 font-semibold">Noleggio</th>
                  <th className="text-left px-6 py-4 font-semibold">Acquisto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F9FA]">
                {[
                  { label: "Canone mensile", noleggio: rentalPrice, acquisto: currentCar?.acquisto },
                  { label: "Costo iniziale", noleggio: "Incluso", acquisto: currentCar?.prezzoAuto },
                  { label: "Assicurazione", noleggio: "Inclusa", acquisto: insuranceCost },
                  { label: "Manutenzione", noleggio: "Inclusa", acquisto: currentCar?.manutenzione },
                  { label: "Costo totale", noleggio: totalRental, acquisto: `€${totalOwnershipCost.toLocaleString("it-IT")}` },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#0f3549] text-sm">{row.label}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={i === 4 ? "font-bold text-[#0f3549]" : "text-gray-600"}>
                        {row.noleggio}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={i === 4 ? "font-bold text-gray-400" : "text-gray-600"}>
                        {row.acquisto}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Similar cars */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-[#E5E7EB] overflow-x-auto mb-10">
            <div className="mb-8">
              <p className="text-sm text-gray-400 mb-1 font-medium">Alternative simili</p>
              <h2 className="text-2xl font-bold text-[#0f3549]">Confronta altri noleggi</h2>
            </div>

            <div className="min-w-[800px]">
              {/* 4-col grid: col1=spacer, col2=selected, col3=similar1, col4=similar2 */}
              <div className="grid grid-cols-4 gap-4 mb-5">
                <div />
                {[
                  {
                    name: selectedCar,
                    image: currentCar?.image ?? "",
                    monthly: rentalPrice,
                    isSelected: true,
                    isCheaper: false,
                  },
                  ...similarCars.map((n) => ({
                    name: n,
                    image: carData[n as keyof typeof carData]?.image ?? "",
                    monthly: carData[n as keyof typeof carData]?.noleggio ?? "€0",
                    isSelected: false,
                    isCheaper:
                      parseInt(carData[n as keyof typeof carData]?.noleggio.replace(/[^\d]/g, "") ?? "0") <
                      parseInt(rentalPrice.replace(/[^\d]/g, "")),
                  })),
                ].map((car, index) => (
                  <div
                    key={index}
                    className={`rounded-[24px] border p-5 ${
                      car.isSelected
                        ? "bg-[#0f3549] border-[#ffdc46] text-white shadow-lg"
                        : "bg-white border-[#E5E7EB]"
                    }`}
                  >
                    <div className="relative aspect-[16/10] mb-4">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        sizes="250px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3 min-h-[24px]">
                      {car.isSelected && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdc46] text-[#0f3549]">
                          ✓ Selezionata
                        </span>
                      )}
                      {car.isCheaper && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          Più economica
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold mb-1 ${car.isSelected ? "text-white" : "text-[#0A0A0A]"}`}>
                      {car.name}
                    </h3>
                    <p className={`text-sm ${car.isSelected ? "text-[#73d2d2]" : "text-gray-500"}`}>
                      {car.monthly}/mese
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  {
                    label: "Canone mensile",
                    values: [rentalPrice, ...similarCars.map((n) => carData[n as keyof typeof carData]?.noleggio ?? "-")],
                  },
                  {
                    label: "Alimentazione",
                    values: [currentCar?.alimentazione ?? "-", ...similarCars.map((n) => carData[n as keyof typeof carData]?.alimentazione ?? "-")],
                  },
                  {
                    label: "Servizi inclusi",
                    values: ["RCA • Kasko • Tagliandi", ...similarCars.map(() => "RCA • Kasko • Tagliandi")],
                  },
                  {
                    label: "Totale noleggio",
                    values: [
                      totalRental,
                      ...similarCars.map((n) => {
                        const m = parseInt(carData[n as keyof typeof carData]?.noleggio.replace(/[^\d]/g, "") ?? "0");
                        return is36Months ? `€${(m * 36).toLocaleString("it-IT")}` : `€${(m * 48).toLocaleString("it-IT")}`;
                      }),
                    ],
                  },
                ].map((row, ri) => (
                  /* 4-col grid matches header above: label | selected | similar1 | similar2 */
                  <div key={ri} className="grid grid-cols-4 gap-4">
                    <div className="flex items-center text-sm font-semibold text-[#0f3549]">
                      {row.label}
                    </div>
                    {row.values.map((val, vi) => (
                      <div
                        key={vi}
                        className={`rounded-xl px-4 py-3 text-center text-sm font-medium border ${
                          vi === 0
                            ? "bg-[#0f3549] text-white border-[#ffdc46]"
                            : "bg-white text-[#0A0A0A] border-[#E5E7EB]"
                        }`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits section */}
          <div className="relative overflow-hidden bg-[#0f3549] text-white rounded-[40px] p-10 md:p-14 shadow-[0_30px_80px_rgba(15,53,73,0.20)] mb-10">
            <div className="absolute top-[-100px] right-[-100px] w-[320px] h-[320px] bg-[#73d2d2]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#ffdc46]/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              <p className="text-[#73d2d2] text-xs font-semibold tracking-[0.25em] uppercase mb-5">
                Analisi finale
              </p>
              <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mb-6 leading-tight">
                Il vantaggio del noleggio
                <br />
                non è solo economico.
              </h2>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-12">
                Con il noleggio hai una visione più chiara dei costi nel tempo,
                elimini il rischio della svalutazione e riduci gli imprevisti.
                Il vero vantaggio è la prevedibilità.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
                  <p className="text-[#73d2d2] text-xs mb-3 font-medium uppercase tracking-wide">
                    Svalutazione evitata
                  </p>
                  <h3 className="text-4xl font-bold mb-3">Fino al 50%</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Molte auto perdono metà del valore in 4 anni. Con il noleggio
                    non gestisci rivendita né svalutazione.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
                  <p className="text-[#73d2d2] text-xs mb-4 font-medium uppercase tracking-wide">
                    Servizi inclusi
                  </p>
                  <div className="space-y-3 text-sm">
                    {["Cambio gomme", "Auto sostitutiva", "RCA / Kasko", "Manutenzione", "Assistenza stradale"].map(
                      (item) => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-gray-300">{item}</span>
                          <span className="font-semibold text-xs">Incluso</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-[#ffdc46] text-[#0f3549] rounded-3xl p-6">
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wide">
                    Costi imprevisti ridotti
                  </p>
                  <h3 className="text-3xl font-bold mb-3">Controllo totale</h3>
                  <p className="text-sm leading-relaxed">
                    Un unico canone mensile per una gestione più semplice e
                    prevedibile delle spese.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-[40px] border border-[#E5E7EB] shadow-sm overflow-hidden mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-[#0f3549] text-white p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] bg-[#73d2d2]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <p className="text-[#73d2d2] text-xs uppercase tracking-[0.2em] mb-5 font-semibold">
                    Mobilità intelligente
                  </p>
                  <h2 className="text-4xl font-bold leading-tight mb-6">
                    Auto nuova
                    <br />
                    ogni 4 anni
                  </h2>
                  <p className="text-gray-300 text-base leading-relaxed mb-10">
                    A fine contratto restituisci l&apos;auto e scegli il modello
                    successivo. Nessuna gestione della rivendita.
                  </p>
                  <div className="space-y-3">
                    {[
                      "RCA / Kasko inclusa",
                      "Manutenzione inclusa",
                      "Assistenza stradale",
                      "Cambio gomme disponibile",
                      "Costi prevedibili",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#ffdc46]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-14 bg-[#F8F9FA] flex flex-col justify-center">
                <p className="text-[#73d2d2] text-xs uppercase tracking-[0.2em] mb-5 font-semibold">
                  Preventivo personalizzato
                </p>
                <h2 className="text-4xl font-bold text-[#0f3549] leading-tight mb-5">
                  Vuoi un&apos;offerta su misura?
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Rispondiamo entro 24h con una proposta personalizzata per
                  modello, durata e chilometraggio.
                </p>
                <Link href={`/preventivo?car=${encodeURIComponent(selectedCar)}`}>
                  <button className="w-full bg-[#ffdc46] text-[#0f3549] px-8 py-4 rounded-2xl font-bold text-base hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,53,73,0.15)] transition-all duration-300 shadow-md">
                    Scopri il preventivo completo
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center pb-8">
            <button
              onClick={handleReset}
              className="bg-white border border-[#E5E7EB] px-8 py-3.5 rounded-2xl font-semibold text-sm text-[#0f3549] hover:bg-[#F8F9FA] transition-colors shadow-sm"
            >
              ← Torna alla home
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
