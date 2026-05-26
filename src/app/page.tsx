"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [selectedCar, setSelectedCar] = useState("")
  const [driverProfile, setDriverProfile] = useState("");
  const isNewDriver = driverProfile === "Neopatentato";
  const [contractDuration, setContractDuration] = useState("");
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
      simili: [
        "Kia Picanto",
        "Toyota Yaris",
      ],
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
      simili: [
        "Toyota Yaris",
        "Fiat 500 Hybrid Icon",
      ],
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
      simili: [
        "Kia Picanto",
        "Fiat 500 Hybrid Icon",
      ],
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
      simili: [
        "Volvo XC40 B3",
        "Nissan Juke",
      ],
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
      simili: [
        "Volkswagen T-Cross",
        "Nissan Juke",
      ],
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
      simili: [
        "Fiat 500 Hybrid Icon",
        "Toyota Yaris",
      ],
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
      simili: [
        "Volkswagen T-Cross",
        "Volvo XC40 B3",
      ],
    },
  };
  const currentCar =
  carData[selectedCar as keyof typeof carData] || null;
  const similarCars =
  currentCar?.simili || ["Fiat 500", "Toyota Yaris"]
  const is36Months = contractDuration === "36 mesi";
  const insuranceCost = isNewDriver
    ? "€1.400/anno"
    : currentCar?.assicurazione;
    
  const rentalPrice = is36Months
    ? `€${parseInt(currentCar?.noleggio.replace("€", "")) + 40}`
    : currentCar?.noleggio;
  
  const totalRental = is36Months
    ? `€${(
        (parseInt(currentCar?.noleggio.replace("€", "")) + 40) * 36
      ).toLocaleString("it-IT")}`
    : currentCar?.totaleNoleggio;

    const durationYears = is36Months ? 3 : 4;

    const insuranceTotal = isNewDriver
      ? 1400 * durationYears
      : (currentCar?.assicurazioneAnnua || 0) * durationYears;
    
    const maintenanceTotal =
      (currentCar?.manutenzioneAnnua || 0) * durationYears;
    
    const totalOwnershipCost =
      (parseInt(
        currentCar?.prezzoAuto.replace(/[^\d]/g, "") || "0"
      )) +
      insuranceTotal +
      maintenanceTotal;
  

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8fbfc] to-[#edf4f5]">

      <div className="fixed top-0 left-0 w-full z-[9999] px-4 pt-4">

      <nav
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          px-8
          py-5
          rounded-[28px]
          border
          border-white/40
          bg-white/80
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(15,53,73,0.08)]
        "
      >

        {/* LOGO */}
        <div>

          <h1 className="text-2xl font-bold text-[#0f3549] tracking-tight">
            4Moovy
          </h1>

          <p className="text-sm text-[#73d2d2] font-medium">
            Noleggio intelligente
          </p>

        </div>

        {/* NAV */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-12
            text-sm
            font-medium
            text-[#0f3549]
            ml-auto
            mr-10
          "
        >

          <a
            href="/"
            className="hover:text-[#73d2d2] transition-all duration-300"
          >
            Home
          </a>

          <a
            href="/#confronto"
            className="hover:text-[#73d2d2] transition-all duration-300"
          >
            Confronto
          </a>

          <a
            href="/preventivo"
            className="hover:text-[#73d2d2] transition-all duration-300"
          >
            Preventivo
          </a>

        </div>

        {/* CTA */}
        <button
          className="
            bg-[#0f3549]
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-300
            hover:bg-[#133f57]
            hover:shadow-[0_10px_30px_rgba(15,53,73,0.25)]
            hover:scale-[1.02]
          "
        >
          Contattaci
        </button>

      </nav>
      </div>

      <div className="pt-32 px-5 md:px-10">

        {!showResults && ( 
          <div>
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f8fbfc] to-[#eef7f7] border border-gray-200 mb-14">

              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] border border-gray-300 rounded-full"></div>
                <div className="absolute top-[-180px] right-[-180px] w-[520px] h-[520px] border border-gray-200 rounded-full"></div>
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-8 md:px-14 py-16">

                <div>

                  <span className="inline-flex items-center rounded-full border border-[#73d2d2] bg-[#73d2d2]/10 px-4 py-2 text-sm font-medium text-[#0f3549] mb-6">
                    Confronto intelligente
                  </span>

                  <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[#0f3549]">
                    Trova l’auto perfetta
                    <br />
                    e confronta
                    <span className="text-[#ffdc46]">
                      {" "}con l’acquisto.
                    </span>
                  </h1>

                  <p className="mt-8 text-xl text-gray-600 max-w-xl leading-relaxed">
                    Configura il tuo noleggio lungo termine e scopri
                    il reale costo di possesso di un’auto confrontando:
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">

                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="font-medium text-[#0f3549]">
                        RCA / Kasko
                      </span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="font-medium text-[#0f3549]">
                        Manutenzione
                      </span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="font-medium text-[#0f3549]">
                        Svalutazione
                      </span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="font-medium text-[#0f3549]">
                        Costi reali
                      </span>
                    </div>

                  </div>

                </div>

                <div className="relative flex justify-center">
                <div className="absolute w-[420px] h-[420px] bg-[#73d2d2]/20 blur-3xl rounded-full"></div>
                  <img
                    src="/cars/volvoxc40.jpg"
                    alt="Auto premium"
                    className="
                      relative
                      z-10
                      w-full
                      max-w-[720px]
                      object-contain
                      drop-shadow-[0_30px_60px_rgba(15,53,73,0.20)]
                      transition-all
                      duration-700
                      hover:scale-[1.02]
                    "
                  />

                </div>

              </div>
              </div>
            {!showConfigurator && (
            <div className="relative overflow-hidden bg-white/75 backdrop-blur-2xl rounded-[40px] shadow-[0_25px_80px_rgba(15,53,73,0.12)] p-8 md:p-12 border border-white/60 mt-14">
              <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#73d2d2]/10 blur-3xl rounded-full"></div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#ffdc46] text-[#0f3549] flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>

                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-[#0f3549]">
                     Seleziona i prametri per il confronto
                  </h2>

                  <p className="text-[#4f6b78] mt-1 text-[17px]">
                    Seleziona auto, profilo e durata del noleggio per scoprire quale soluzione si adatta meglio alle tue esigenze.
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-3">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    Scegli il veicolo
                  </p>

                  <div id="confronto" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                  {Object.entries(carData).map(([name, car]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        if (selectedCar === name) {
                          setSelectedCar("")
                        } else {
                          setSelectedCar(name)
                        }
                      }}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[32px]
                        border
                        p-6
                        text-left
                        transition-all
                        duration-700 ease-out
                        hover:-translate-y-3
                        hover:shadow-[0_30px_80px_rgba(15,53,73,0.18)]
                        ${
                          selectedCar === name
                            ? "border-[#ffdc46] bg-[#0f3549] shadow-[0_25px_80px_rgba(15,53,73,0.28)] scale-[1.02]"
                            : "border-gray-200 bg-[#0f3549]"
                        }
                      `}
                    >

                      <div className="relative aspect-[16/9] flex items-center justify-center mb-6 rounded-3xl bg-gradient-to-br from-white to-[#eef7f7] overflow-hidden border border-gray-100">

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,210,210,0.10),transparent_70%)]"></div>

                        <img
                          src={car.image}
                          alt={name}
                          className="
                            relative
                            z-10
                            w-full
                            h-full
                            object-contain
                            transition-all
                            duration-700
                            group-hover:scale-110
                            group-hover:-translate-y-1
                            drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]
                          "
                        />

                      </div>

                      <div className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700 mb-4">
                        Disponibile
                      </div>

                      <h3 className="text-xl font-bold text-white">
                        {name}
                      </h3>

                      <p className="text-[#73d2d2] mt-2">
                        Noleggio lungo termine
                      </p>

                      <div className="mt-5 flex items-end gap-1">
                        <span className="text-4xl font-bold text-white">
                          {car.noleggio}
                        </span>

                        <span className="text-gray-300 mb-1">
                          /mese
                        </span>
                      </div>
                        
                      {selectedCar === name && (
                        <div className="absolute top-5 right-5 z-20">

                          <div className="w-10 h-10 rounded-full bg-[#ffdc46] flex items-center justify-center shadow-lg">

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-[#0f3549]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>

                          </div>

                        </div>
                      )}

                      <div
                        className={`
                          mt-6
                          w-full
                          rounded-2xl
                          py-4
                          text-center
                          font-semibold
                          transition-all
                          duration-500
                          ease-out
                          ${
                            selectedCar === name
                              ? "border-[#ffdc46] bg-[#0f3549]"
                              : "bg-white text-black group-hover:bg-gray-100"
                          }
                        `}
                      >
                        {selectedCar === name ? (

                        <div className="mt-6 space-y-4">

                          <div className="flex justify-center">

                            <div
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-[#ffdc46]
                                text-[#0f3549]
                                px-4
                                py-2
                                text-sm
                                font-bold
                                shadow-md
                              "
                            >
                              ✓ Selezionata
                            </div>

                          </div>

                            {!showConfigurator && (
                              

                                <div
                                  

                                  onClick={(e) => {
                                    e.stopPropagation()
                                
                                    setShowConfigurator(true)
                                
                                    setTimeout(() => {
                                      window.scrollTo({
                                        top: 1100,
                                        behavior: "smooth",
                                      })
                                    }, 100)
                                  }}
                                  className="
                                    w-full
                                    shadow-md
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    py-3
                                    text-center
                                    font-bold
                                    bg-white
                                    text-[#0f3549]
                                    hover:bg-gray-100
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                  "
                                >
                                  Vai al confronto
                              </div>
                              
                                
                            )}

                          </div>

                          ) : (

                          <div
                            className="
                              mt-3
                              w-full
                              rounded-2xl
                              py-2
                              text-center
                              font-semibold
                              bg-white
                              text-black
                            "
                          >
                            Confronta
                          </div>

                          )}
                      </div>

                    </button>
                  ))}

                  </div>
                  </div>
                  </div>

                  </div>
                  )}
                  


                  {showConfigurator && (
                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">


                    <button
                      type="button"
                      onClick={() => {
                        setShowConfigurator(false)

                        setTimeout(() => {
                          window.scrollTo({
                            top: 900,
                            behavior: "smooth",
                          })
                        }, 100)
                      }}
                      className="
                        mb-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-[#0f3549]
                        shadow-sm
                        transition-all
                        duration-300
                        hover:bg-gray-100
                      "
                      >
                      ← Torna alla selezione auto
                    </button>

                      <h3 className="text-2xl font-bold text-[#0f3549] mb-8">
                        Configura il noleggio
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="rounded-3xl border border-gray-200 p-6">
                          <p className="text-sm text-gray-500 mb-3">
                            Durata
                          </p>

                          <div className="grid grid-cols-2 gap-3">

                            {["36 mesi", "48 mesi"].map((duration) => (
                              <button
                                key={duration}
                                type="button"
                                onClick={() => setContractDuration(duration)}
                                className={`
                                  rounded-2xl
                                  border
                                  p-4
                                  font-semibold
                                  transition-all
                                  duration-300
                                  ${
                                    contractDuration === duration
                                      ? "bg-[#0f3549] text-white border-[#0f3549]"
                                      : "bg-white text-[#0f3549] border-gray-200"
                                  }
                                `}
                              >
                                {duration}
                              </button>
                            ))}

                          </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 p-6">
                          <p className="text-sm text-gray-500 mb-3">
                            Profilo conducente
                          </p>

                          <div className="grid grid-cols-1 gap-3">

                            {["Neopatentato", "Guidatore esperto"].map((profile) => (
                              <button
                                key={profile}
                                type="button"
                                onClick={() => setDriverProfile(profile)}
                                className={`
                                  rounded-2xl
                                  border
                                  p-4
                                  font-semibold
                                  transition-all
                                  duration-300
                                  ${
                                    driverProfile === profile
                                      ? "bg-[#0f3549] text-white border-[#0f3549]"
                                      : "bg-white text-[#0f3549] border-gray-200"
                                  }
                                `}
                              >
                                {profile}
                              </button>
                            ))}

                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="rounded-[32px] bg-[#0f3549] text-white p-8 shadow-2xl flex flex-col justify-between">

                      <div>

                        <p className="text-[#73d2d2] mb-2">
                          Canone mensile
                        </p>

                        <h3 className="text-5xl font-bold mb-4">
                          {currentCar?.noleggio}
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                          Tutto incluso, zero pensieri.
                        </p>

                      </div>

                      <button
                        disabled={!selectedCar || !contractDuration}
                        onClick={() => {
                          if (!selectedCar || !contractDuration) {
                            alert("Compila tutti i campi.")
                            return
                          }

                          setShowResults(true)

                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          })
                        }}
                        className="
                          mt-8
                          w-full
                          relative
                          overflow-hidden
                          bg-[#ffdc46]
                          text-[#0f3549]
                          py-5
                          rounded-[24px]
                          text-lg
                          font-bold
                          transition-all
                          duration-500
                          ease-out
                          hover:-translate-y-1
                          hover:shadow-[0_20px_50px_rgba(255,220,70,0.35)]
                          active:scale-[0.98]
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          disabled:hover:translate-y-0
                          disabled:hover:shadow-none
                          "
                      >
                        <span className="relative z-10">
                          Scopri il confronto
                        </span>

                        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      </button>

                    </div>

                  
                  </div>

                  )}
                  
                </div>
              
              
        )}
        
        {showResults && (
        <>

          {isNewDriver && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-2">
                Informazione per neopatentati
              </h3>

              <p>
                I costi assicurativi per un neopatentato possono essere
                significativamente più elevati rispetto a quelli di un guidatore
                esperto. Nel noleggio lungo termine parte di questi costi risulta
                spesso più prevedibile e integrata nel canone.
              </p>
            </div>
          )}

            <div className="mb-14">

              <p className="text-gray-500 mb-3">
                Analisi personalizzata
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {selectedCar}
              </h1>

              <p className="text-xl text-gray-600 mb-10">
                Confronto tra noleggio lungo termine e acquisto tradizionale.
              </p>

              <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-gray-100 to-white border border-gray-200 p-10 md:p-14 shadow-xl">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.04),transparent_40%)]" />

                <div className="relative flex justify-center">
                  <img
                    src={currentCar?.image}
                    alt={selectedCar}
                    className="w-full max-w-4xl object-contain"
                  />
                </div>

              </div>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              Durata simulazione: {contractDuration}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">

              <div className="rounded-[30px] bg-[#0f3549] text-white p-7 shadow-[0_20px_50px_rgba(15,53,73,0.20)] md:col-span-2">

                <p className="text-[#73d2d2] text-sm uppercase tracking-[0.15em] mb-4">
                  Canone mensile
                </p>

                <div className="flex items-end gap-3">
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                    {rentalPrice}
                  </h2>

                  <span className="text-gray-300 mb-2">
                    / mese
                  </span>
                </div>

                <div className="mt-6 flex gap-3 flex-wrap">

                  <div className="bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    RCA inclusa
                  </div>

                  <div className="bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    Manutenzione inclusa
                  </div>

                  <div className="bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    Assistenza inclusa
                  </div>

                </div>
              </div>

              <div className="bg-white rounded-[30px] p-7 border border-gray-200 shadow-sm">

                <p className="text-gray-500 text-sm mb-3">
                  Costo totale noleggio
                </p>

                <h2 className="text-4xl font-bold text-[#0f3549]">
                  {totalRental}
                </h2>

                <p className="text-green-600 text-sm mt-3 font-medium">
                  Costi prevedibili
                </p>

              </div>

              <div className="bg-[#ffdc46] rounded-[30px] p-7 shadow-sm">

                <p className="text-[#0f3549]/70 text-sm mb-3">
                  Costo totale acquisto
                </p>

                <h2 className="text-4xl font-bold text-[#0f3549]">
                  €{totalOwnershipCost.toLocaleString("it-IT")}
                </h2>

                <p className="text-[#0f3549] text-sm mt-3 font-medium">
                  Inclusi costi accessori
                </p>

              </div>

            </div>

            <div className="mb-10 bg-white rounded-[32px] p-8 shadow-lg border border-gray-100">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Differenza stimata
                  </p>

                  <h2 className="text-4xl font-bold text-[#0f3549]">
                    €{(
                      totalOwnershipCost -
                      parseInt(totalRental.replace(/[^\d]/g, ""))
                    ).toLocaleString("it-IT")}
                  </h2>
                </div>

                <div className="bg-[#ffdc46] text-[#0f3549] px-5 py-3 rounded-2xl font-semibold">
                  Risparmio stimato
                </div>

              </div>

              <div className="space-y-6">

                <div>
                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-[#0f3549]">
                      Noleggio
                    </span>

                    <span className="text-gray-500">
                      {totalRental}
                    </span>

                  </div>

                  <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-[#0f3549] rounded-full"
                      style={{
                        width: `${(
                          (parseInt(totalRental.replace(/[^\d]/g, "")) /
                            totalOwnershipCost) *
                          100
                        )}%`,
                      }}
                    />

                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-[#0f3549]">
                      Acquisto
                    </span>

                    <span className="text-gray-500">
                      €{totalOwnershipCost.toLocaleString("it-IT")}
                    </span>

                  </div>

                  <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-[#ffdc46] rounded-full"
                      style={{
                        width: "100%",
                      }}
                    />

                  </div>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 overflow-x-auto">
              <h2 className="text-2xl font-semibold mb-6">
                Confronto Costi
              </h2>

              <table className="w-full overflow-hidden rounded-[28px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#0f3549] text-white text-sm uppercase tracking-[0.15em]">
                    <th className="text-left px-6 py-5">Parametro</th>
                    <th className="text-left px-6 py-5">Noleggio</th>
                    <th className="text-left px-6 py-5">Acquisto</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-[#f8fbfc] transition-all duration-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-semibold text-gray-900">Canone mensile</td>
                    <td className="px-6 py-5 font-semibold text-gray-900">{rentalPrice}</td>
                    <td className="px-6 py-5 font-semibold text-gray-900">{currentCar?.acquisto}</td>
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-[#f8fbfc] transition-all duration-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-medium">
                      Costo iniziale
                    </td>

                    <td className="px-6 py-5">
                    <span className="font-medium text-gray-700">
                      Incluso
                    </span>
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {currentCar?.prezzoAuto}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-[#f8fbfc] transition-all duration-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-semibold text-gray-900">
                      Assicurazione
                    </td>

                    <td className="px-6 py-5">
                    <span className="font-medium text-gray-700">
                      Inclusa
                    </span>
                    </td>

                    <td className="px-6 py-5">
                      {insuranceCost}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-[#f8fbfc] transition-all duration-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-semibold text-gray-900">
                      Manutenzione
                    </td>

                    <td className="px-6 py-5">
                    <span className="font-medium text-gray-700">
                      Inclusa
                    </span>
                    </td>

                    <td className="px-6 py-5">
                      {currentCar?.manutenzione}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-[#f8fbfc] transition-all duration-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-5 font-semibold">
                      Costo Totale
                    </td>

                    <td className="px-6 py-5 font-semibold text-[#ffdc46]">
                      {totalRental}
                    </td>

                    <td className="px-6 py-5 font-semibold text-gray-500 ">
                      €{totalOwnershipCost.toLocaleString("it-IT")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-14 bg-white rounded-[32px] p-6 md:p-8 shadow-lg border border-gray-100 overflow-x-auto">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Alternative simili
                  </p>

                  <h2 className="text-3xl font-bold text-[#0f3549]">
                    Confronta altri noleggi
                  </h2>
                </div>

              </div>

              <div className="min-w-[900px]">

                <div className="grid grid-cols-4 gap-4">

                  <div></div>

                  {[
                    {
                      name: selectedCar,
                      image: currentCar?.image,
                      monthly: rentalPrice,
                      fuel: currentCar?.alimentazione || "Hybrid",
                      delivery: "45 giorni",
                      total: totalRental,
                      selected: true,
                    },

                    ...similarCars.map((similarName) => ({
                      name: similarName,

                      image:
                        carData[
                          similarName as keyof typeof carData
                        ]?.image || "",

                      monthly:
                        carData[
                          similarName as keyof typeof carData
                        ]?.noleggio || "€0",

                      fuel:
                        carData[
                          similarName as keyof typeof carData
                        ]?.alimentazione || "Benzina",

                      delivery: "45 giorni",

                      total:
                        contractDuration === "48 mesi"
                          ? `€${(
                              parseInt(
                                carData[
                                  similarName as keyof typeof carData
                                ]?.noleggio.replace(/[^\d]/g, "") || "0"
                              ) * 48
                            ).toLocaleString("it-IT")}`
                          : `€${(
                              parseInt(
                                carData[
                                  similarName as keyof typeof carData
                                ]?.noleggio.replace(/[^\d]/g, "") || "0"
                              ) * 36
                            ).toLocaleString("it-IT")}`,

                      selected: false,

                      cheapest:
                        parseInt(
                          (
                            carData[
                              similarName as keyof typeof carData
                            ]?.noleggio || "€0"
                          ).replace(/[^\d]/g, "")
                        ) <
                        parseInt(
                          rentalPrice.replace(/[^\d]/g, "")
                        ),
                    })),
                  ].map((car: any, index) => (

                    <div
                      key={index}
                      className={`
                        rounded-[28px]
                        border
                        p-5
                        transition-all
                        duration-300
                        ${
                          car.selected
                            ? "bg-[#0f3549] border-[#ffdc46] text-white shadow-[0_20px_50px_rgba(15,53,73,0.25)]"
                            : "bg-[#f8fbfc] border-gray-200"
                        }
                      `}
                    >

                      <div className="aspect-[16/10] flex items-center justify-center mb-4">
                    
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">

                        {car.selected && (
                          <div
                            className="
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                              bg-[#ffdc46]
                              text-[#0f3549]
                            "
                          >
                            ✓ Consigliata
                          </div>
                        )}

                        {car.cheapest && (
                          <div
                            className="
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                              bg-green-100
                              text-green-700
                            "
                          >
                            Più economica
                          </div>
                        )}

                      </div>

                      <h3 className={`text-xl font-bold ${car.selected ? "text-white" : "text-[#0f3549]"}`}>
                        {car.name}
                      </h3>

                      <p className={`${car.selected ? "text-[#73d2d2]" : "text-gray-500"} mt-1`}>
                        {car.monthly}/mese
                      </p>

                    </div>
                  ))}

                </div>

                <div className="mt-5 space-y-4">

                {[
                  {
                    label: "Canone mensile",
                    values: [
                      rentalPrice,

                      ...similarCars.map(
                        (similarName) =>
                          carData[
                            similarName as keyof typeof carData
                          ]?.noleggio || "-"
                      ),
                    ],
                  },

                  {
                    label: "Alimentazione",
                    values: [
                      currentCar?.alimentazione || "-",

                      ...similarCars.map(
                        (similarName) =>
                          carData[
                            similarName as keyof typeof carData
                          ]?.alimentazione || "-"
                      ),
                    ],
                  },

                  {
                    label: "Consegna prevista",
                    values: [
                      "45 giorni",

                      ...similarCars.map(() => "45 giorni"),
                    ],
                  },

                  {
                    label: "Servizi inclusi",
                    values: [
                      "RCA • Kasko • Tagliandi",

                      ...similarCars.map(
                        () => "RCA • Kasko • Tagliandi"
                      ),
                    ],
                  },

                  {
                    label: "Totale noleggio",
                    values: [
                      totalRental,

                      ...similarCars.map((similarName) => {

                        const monthly =
                          carData[
                            similarName as keyof typeof carData
                          ]?.noleggio || "€0"

                        const parsed =
                          parseInt(
                            monthly.replace(/[^\d]/g, "")
                          ) || 0

                        return contractDuration === "48 mesi"
                          ? `€${(parsed * 48).toLocaleString("it-IT")}`
                          : `€${(parsed * 36).toLocaleString("it-IT")}`
                      }),
                    ],
                  },
                ].map((row, index) => (

                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4"
                    >

                      <div className="flex items-center font-semibold text-[#0f3549]">
                        {row.label}
                      </div>

                      {row.values.map((value, i) => (

                        <div
                          key={i}
                          className={`
                            rounded-2xl
                            px-4
                            py-4
                            text-center
                            font-medium
                            ${
                              i === 0
                                ? "bg-[#0f3549] text-white border border-[#ffdc46]"
                                : "bg-[#f8fbfc] text-[#0f3549] border border-gray-200"
                            }
                          `}
                        >
                          {value}
                        </div>

                      ))}

                    </div>
                  ))}

                </div>

              </div>

            </div>

            <div className="mt-20 relative overflow-hidden bg-[#0f3549] text-white rounded-[40px] p-10 md:p-14 shadow-[0_30px_80px_rgba(15,53,73,0.25)]">

              <div className="absolute top-[-120px] right-[-120px] w-[340px] h-[340px] bg-[#73d2d2]/10 rounded-full blur-3xl"></div>

              <div className="absolute bottom-[-140px] left-[-140px] w-[320px] h-[320px] bg-[#ffdc46]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <p className="text-[#73d2d2] text-sm font-semibold tracking-[0.25em] uppercase mb-6">
                  Analisi finale
                </p>

                <h2 className="text-4xl md:text-5xl leading-tight font-bold max-w-4xl mb-8">
                  Il vantaggio del noleggio
                  <br />
                  non è solo economico.
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  Con il noleggio hai una visione più chiara dei costi nel tempo,
                  elimini il rischio della svalutazione e riduci gli imprevisti
                  legati alla gestione dell’auto. Il vero vantaggio è la prevedibilità.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">

                  <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                    <p className="text-[#73d2d2] text-sm mb-3">
                      Svalutazione evitata
                    </p>

                    <h3 className="text-4xl font-bold mb-3">
                      Fino al 50%
                    </h3>

                    <p className="text-gray-300 leading-relaxed text-sm">
                      Dopo alcuni anni molte auto perdono gran parte del loro valore.
                      Con il noleggio non devi gestire rivendita o svalutazione.
                    </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                    <p className="text-[#73d2d2] text-sm mb-3">
                      Servizi inclusi
                    </p>

                    <div className="space-y-3">

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Cambio gomme
                        </span>

                        <span className="font-semibold">
                          Incluso
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Auto sostitutiva
                        </span>

                        <span className="font-semibold">
                          Inclusa
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          RCA / Kasko
                        </span>

                        <span className="font-semibold">
                          Inclusa
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Manutenzione
                        </span>

                        <span className="font-semibold">
                          Inclusa
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          Assistenza stradale
                        </span>

                        <span className="font-semibold">
                          Inclusa
                        </span>
                      </div>

                    </div>

                    </div>

                    <div className="bg-[#ffdc46] text-[#0f3549] rounded-3xl p-6">

                    <p className="text-sm font-semibold mb-3">
                      Costi imprevisti ridotti
                    </p>

                    <h3 className="text-4xl font-bold mb-3">
                      Maggiore controllo
                    </h3>

                    <p className="leading-relaxed text-sm">
                      Un unico canone mensile permette una gestione più prevedibile
                      delle spese legate all’auto.
                    </p>

                    </div>

                </div>

              </div>

            </div>

            <div className="mt-10 bg-white rounded-[32px] p-10 shadow-lg border border-gray-100">
              <p className="text-gray-500 mb-3">
                Profilo consigliato
              </p>

              <h2 className="text-3xl font-bold mb-4">
                Ideale per chi cerca costi prevedibili nel tempo.
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Il noleggio lungo termine può essere una soluzione particolarmente
                interessante per chi desidera ridurre gli imprevisti economici,
                avere una gestione più semplice del veicolo e mantenere maggiore
                controllo sulle spese mensili.
              </p>
            </div>

            <div className="mt-10 text-center">

            <div className="mt-24">

              <div className="bg-white rounded-[40px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2">

                  <div className="bg-[#0f3549] text-white p-10 md:p-14 relative overflow-hidden">

                    <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#73d2d2]/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">

                      <p className="text-[#73d2d2] text-sm uppercase tracking-[0.2em] mb-5">
                        Mobilità intelligente
                      </p>

                      <h2 className="text-4xl font-bold leading-tight mb-8">
                        Auto nuova
                        <br />
                        ogni 4 anni
                      </h2>

                      <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
                        A fine contratto restituisci l’auto e scegli il modello successivo.
                        Nessuna gestione della rivendita o svalutazione.
                      </p>

                      <div className="space-y-4">

                        {[
                          "RCA / Kasko inclusa",
                          "Manutenzione inclusa",
                          "Assistenza stradale",
                          "Cambio gomme disponibile",
                          "Costi prevedibili",
                        ].map((item) => (

                          <div
                            key={item}
                            className="flex items-center gap-4"
                          >

                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-[#ffdc46]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>

                            </div>

                            <span className="text-lg">
                              {item}
                            </span>

                          </div>

                        ))}

                      </div>

                    </div>

                  </div>

                  <div className="p-10 md:p-14 bg-[#f8fbfc]">

                    <p className="text-[#73d2d2] text-sm uppercase tracking-[0.2em] mb-5">
                      Preventivo personalizzato
                    </p>

                    <h2 className="text-4xl font-bold text-[#0f3549] leading-tight mb-6">
                      Vuoi un’offerta su misura?
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-10">
                      Rispondiamo entro 24h con una proposta personalizzata:
                      modello, durata e chilometraggio.
                    </p>

                  </div>

                </div>

              </div>

              </div>

              <div className="mb-5">
                <Link
                  href={`/preventivo?car=${encodeURIComponent(selectedCar)}`}
                >

                  <button
                    className="
                      bg-[#ffdc46]
                      text-[#0f3549]
                      px-8
                      py-4
                      rounded-2xl
                      font-bold
                      hover:scale-[1.02]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-[0_25px_60px_rgba(15,53,73,0.18)]
                      shadow-xl
                    "
                  >
                    Scopri il preventivo completo
                  </button>

                </Link>
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setSelectedCar("");
                  setDriverProfile("");
                  setContractDuration("");
                }}
                className="bg-white border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
              >
                Torna alla home
              </button>
            </div>

          </>
        )}

      </div>

    </main>
  );
}