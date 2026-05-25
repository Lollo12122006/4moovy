"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";;
import Link from "next/link";
function PreventivoContent() {

    const searchParams = useSearchParams();
  
    const carFromUrl = searchParams.get("car");

    const selectedCar =
    carFromUrl && carFromUrl.trim() !== ""
        ? carFromUrl
        : "Volvo XC40 B3";
  
    const carImages: Record<string, string> = {
      "Fiat 500 Hybrid Icon": "/cars/fiat500.jpg",
      "Peugeot 208": "/cars/peugeot208.jpg",
      "Toyota Yaris Hybrid": "/cars/yaris.jpg",
      "Volkswagen T-Cross": "/cars/tcross.jpg",
      "Volvo XC40 B3": "/cars/volvoxc40.jpg",
      "Kia Picanto": "/cars/kiapicanto.jpg",
      "Nissan Juke": "/cars/nissanjuke.jpg",
    };
  
    const currentImage =
        carImages[selectedCar] || "/cars/volvoxc40.jpg";
    const [duration, setDuration] = useState("48 mesi");
    const [annualKm, setAnnualKm] = useState("30.000 km");
    const [upfront, setUpfront] = useState("0€");

    const pricingData: Record<
    string,
    {
        basePrice: number;
        delivery: string;
        totalKm: string;
    }
    > = {
    "Fiat 500 Hybrid Icon": {
        basePrice: 406,
        delivery: "14 settimane",
        totalKm: "120.000 km",
    },

    "Kia Picanto": {
        basePrice: 346,
        delivery: "9 settimane",
        totalKm: "120.000 km",
    },

    "Nissan Juke": {
        basePrice: 554,
        delivery: "20 settimane",
        totalKm: "120.000 km",
    },

    "Volkswagen T-Cross": {
        basePrice: 512,
        delivery: "19 settimane",
        totalKm: "120.000 km",
    },

    "Volvo XC40 B3": {
        basePrice: 778,
        delivery: "19 settimane",
        totalKm: "120.000 km",
    },
    };

    const basePrice =
    pricingData[selectedCar]?.basePrice || 500;


    let calculatedPrice = basePrice;

    if (duration === "36 mesi") {
    calculatedPrice += basePrice * 0.08;
    }

    if (duration === "60 mesi") {
    calculatedPrice -= basePrice * 0.05;
    }

    if (annualKm === "10.000 km") {
    calculatedPrice -= basePrice * 0.10;
    }

    if (annualKm === "20.000 km") {
    calculatedPrice -= basePrice * 0.05;
    }


    if (upfront === "3.000€") {
    calculatedPrice -= 25;
    }

    if (upfront === "5.000€") {
    calculatedPrice -= 45;
    }

    const finalPrice = Math.round(calculatedPrice);

    const months =
        duration === "36 mesi"
            ? 36
            : duration === "48 mesi"
            ? 48
            : 60;

    const totalContract = finalPrice * months;
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f8fbfc] to-[#edf4f5]">
  
        {/* HERO */}
        <section className="relative overflow-hidden px-6 md:px-10 pt-10 pb-24">
          
          <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#73d2d2]/20 blur-3xl rounded-full" />
  
          <div className="max-w-7xl mx-auto">
  
            {/* NAV */}
            <nav className="flex items-center justify-between mb-20">
  
              <div>
                <h1 className="text-2xl font-bold text-[#0f3549]">
                  4Moovy
                </h1>
  
                <p className="text-sm text-[#73d2d2] font-medium">
                  Preventivo premium
                </p>
              </div>
  
              <button className="
                bg-[#0f3549]
                text-white
                px-6
                py-3
                rounded-2xl
                font-medium
                transition-all
                duration-300
                hover:shadow-xl
              ">
                Contattaci
              </button>
  
            </nav>
  
            {/* HERO CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
  
              <div>
  
                <span className="inline-flex items-center rounded-full border border-[#73d2d2] bg-[#73d2d2]/10 px-4 py-2 text-sm font-medium text-[#0f3549] mb-6">
                  Noleggio lungo termine
                </span>
  
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[#0f3549]">
                    Preventivo
                    <span className="text-[#ffdc46]">
                        {" "}{selectedCar}
                    </span>
                </h1>
  
                <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                  Scopri la soluzione più adatta alle tue esigenze con un consulente dedicato e costi trasparenti.
                </p>

                <div className="mt-10">

                    <Link href="/">

                        <button
                        className="
                            border
                            border-[#0f3549]
                            text-[#0f3549]
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            hover:bg-[#0f3549]
                            hover:text-white
                            transition-all
                            duration-300
                        "
                        >
                        Torna al confronto
                        </button>

                    </Link>

                    </div>
  
                <div className="mt-10 flex flex-wrap gap-4">
  
                  <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl px-6 py-4 shadow-lg">
                    <p className="text-sm text-gray-500">
                      Anticipo
                    </p>
  
                    <p className="text-xl font-bold text-[#0f3549]">
                      Personalizzabile
                    </p>
                  </div>
  
                  <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl px-6 py-4 shadow-lg">
                    <p className="text-sm text-gray-500">
                      Servizi inclusi
                    </p>
  
                    <p className="text-xl font-bold text-[#0f3549]">
                      RCA + Assistenza
                    </p>
                  </div>
  
                </div>
  
              </div>
  
              <div className="relative flex justify-center">
  
                <div className="absolute w-[420px] h-[420px] bg-[#73d2d2]/20 blur-3xl rounded-full" />
  
                <img
                  src={currentImage}
                  alt="Auto premium"
                  className="
                    relative
                    z-10
                    w-full
                    max-w-[720px]
                    object-contain
                    drop-shadow-[0_30px_60px_rgba(15,53,73,0.20)]
                  "
                />
  
              </div>
  
            </div>
  
          </div>
  
        </section>
  
        {/* SERVIZI */}
        <section className="px-6 md:px-10 pb-24">
  
          <div className="max-w-7xl mx-auto">
  
            <div className="mb-12">
  
              <p className="text-sm uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-4">
                Servizi inclusi
              </p>
  
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f3549]">
                Tutto incluso.
                <br />
                Zero pensieri.
              </h2>
  
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  
              {[
                "Assicurazione RCA",
                "Manutenzione",
                "Soccorso stradale",
                "Gestione imprevisti",
              ].map((service) => (
                <div
                  key={service}
                  className="
                    bg-white/80
                    backdrop-blur-xl
                    border
                    border-white
                    rounded-[32px]
                    p-8
                    shadow-[0_10px_40px_rgba(15,53,73,0.08)]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
  
                <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#73d2d2]/15
                    mb-6
                    flex
                    items-center
                    justify-center
                    ">

                    <span className="text-2xl">

                        {service === "Assicurazione RCA" && "🛡️"}
                        {service === "Manutenzione" && "🔧"}
                        {service === "Soccorso stradale" && "🚘"}
                        {service === "Gestione imprevisti" && "⚡"}

                    </span>

                </div>
  
                  <h3 className="text-2xl font-bold text-[#0f3549]">
                    {service}
                  </h3>
  
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    Gestione semplice e costi prevedibili durante tutta la durata del contratto.
                  </p>
  
                </div>
              ))}
  
            </div>
  
          </div>
  
        </section>

        {/* CONFIGURATORE */}
        <section className="px-6 md:px-10 pb-24">

            <div className="max-w-7xl mx-auto">

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-8
            ">

                {/* CONFIG */}
                <div className="
                bg-white/80
                backdrop-blur-2xl
                border
                border-white
                rounded-[40px]
                p-8
                shadow-[0_20px_60px_rgba(15,53,73,0.08)]
                ">

                <p className="text-sm uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-4">
                    Configura il tuo preventivo
                </p>

                <h2 className="text-4xl font-bold text-[#0f3549] mb-10">
                    Personalizza il noleggio
                </h2>

                <div className="space-y-8">

                    {/* DURATA */}
                    <div>

                    <p className="text-sm font-medium text-gray-500 mb-4">
                        Durata contratto
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                        {["36 mesi", "48 mesi", "60 mesi"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setDuration(item)}
                            className={`
                            rounded-2xl
                            py-4
                            font-semibold
                            transition-all
                            duration-300
                            ${
                                duration === item
                                ? "bg-[#0f3549] text-white"
                                : "bg-[#f3f7f8] text-[#0f3549]"
                            }
                            `}
                        >
                            {item}
                        </button>
                        ))}

                    </div>

                    </div>

                    {/* KM */}
                    <div>

                    <p className="text-sm font-medium text-gray-500 mb-4">
                        Chilometraggio annuo
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                        {[
                        "10.000 km",
                        "20.000 km",
                        "30.000 km",
                        ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setAnnualKm(item)}
                            className={`
                            rounded-2xl
                            py-4
                            font-semibold
                            transition-all
                            duration-300
                            ${
                                annualKm === item
                                ? "bg-[#0f3549] text-white"
                                : "bg-[#f3f7f8] text-[#0f3549]"
                            }
                            `}
                        >
                            {item}
                        </button>
                        ))}

                    </div>

                    </div>

                    {/* ANTICIPO */}
                    <div>

                    <p className="text-sm font-medium text-gray-500 mb-4">
                        Anticipo
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                        {[
                        "0€",
                        "3.000€",
                        "5.000€",
                        ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setUpfront(item)}
                            className={`
                            rounded-2xl
                            py-4
                            font-semibold
                            transition-all
                            duration-300
                            ${
                                upfront === item
                                ? "bg-[#0f3549] text-white"
                                : "bg-[#f3f7f8] text-[#0f3549]"
                            }
                            `}
                        >
                            {item}
                        </button>
                        ))}

                    </div>

                    </div>

                </div>

                </div>

                {/* PREVENTIVO */}
                <div className="
                    relative
                    overflow-hidden
                    rounded-[40px]
                    bg-[#0f3549]
                    p-8
                    md:p-10
                    text-white
                    shadow-[0_30px_80px_rgba(15,53,73,0.25)]
                ">

                <div className="absolute top-[-100px] right-[-100px] w-[260px] h-[260px] bg-[#73d2d2]/20 blur-3xl rounded-full" />

                <div className="relative">

                    <p className="text-[#73d2d2] uppercase tracking-[0.2em] text-sm font-semibold mb-4">
                    Preventivo stimato
                    </p>

                    <div className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-[#ffdc46]
                        text-[#0f3549]
                        px-4
                        py-2
                        text-sm
                        font-bold
                        mb-6
                    ">
                        Offerta consigliata
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-10">
                    €{finalPrice}
                    <span className="text-2xl text-gray-300">
                        /mese
                    </span>
                    </h2>

                    <div className="space-y-5 mb-10">

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-gray-300">
                        Durata
                        </span>

                        <span className="font-semibold">
                        {duration}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-gray-300">
                        Chilometri inclusi
                        </span>

                        <span className="font-semibold">
                        {annualKm}/Anno
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-gray-300">
                        Anticipo
                        </span>

                        <span className="font-semibold">
                        {upfront}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-gray-300">
                            Totale contratto
                        </span>

                        <span className="font-semibold">
                            €{totalContract.toLocaleString("it-IT")}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-gray-300">
                        Consegna prevista
                        </span>

                        <span className="font-semibold">
                        {pricingData[selectedCar]?.delivery}
                        </span>
                    </div>

                    </div>

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                        mb-8
                    ">


                        <div className="
                            rounded-[28px]
                            bg-white/10
                            border
                            border-white/10
                            p-5
                        ">

                            <p className="text-gray-400 text-sm mb-2">
                                Formula
                            </p>

                            <p className="text-2xl font-bold">
                            {upfront === "0€"
                                ? "Senza anticipo obbligatorio"
                                : `Anticipo iniziale ${upfront}`}
                            </p>

                        </div>

                    </div>

                    <div className="
                        rounded-[32px]
                        bg-white/10
                        border
                        border-white/10
                        p-6
                        mb-8
                    ">

                    <div className="
                        rounded-[32px]
                        bg-white
                        text-[#0f3549]
                        p-6
                        mb-8
                    ">

                        <p className="text-sm uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-4">
                            Analisi convenienza
                        </p>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Gestione semplificata
                                </span>

                                <span className="font-bold">
                                    Inclusa
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Costi prevedibili
                                </span>

                                <span className="font-bold text-green-600">
                                    ✓
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Rischio svalutazione
                                </span>

                                <span className="font-bold text-[#ffdc46]">
                                    Evitato
                                </span>

                            </div>

                        </div>

                        <div className="
                            mt-6
                            rounded-2xl
                            bg-[#f5f8f9]
                            p-5
                        ">

                            <p className="text-sm text-gray-500 mb-2">
                            Considerazione 4Moovy
                            </p>

                            <p className="leading-relaxed text-[15px]">
                            Il noleggio lungo termine può offrire maggiore prevedibilità economica rispetto all’acquisto tradizionale, specialmente su veicoli con costi di gestione elevati.
                            </p>

                        </div>

                    </div>

                    <p className="text-[#73d2d2] mb-5 font-medium">
                        Servizi inclusi
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>✓ RCA</div>
                        <div>✓ Assistenza</div>
                        <div>✓ Manutenzione</div>
                        <div>✓ Furto e incendio</div>

                    </div>

                    </div>

                    <button
                    className="
                        w-full
                        bg-[#ffdc46]
                        text-[#0f3549]
                        py-5
                        rounded-2xl
                        text-lg
                        font-bold
                        hover:scale-[1.01]
                        transition-all
                        duration-300
                        shadow-xl
                    "
                    >
                    Richiedi configurazione personalizzata
                    </button>

                    <p className="
                        text-xs
                        text-gray-400
                        text-center
                        leading-relaxed
                        mt-5
                        ">
                        Il preventivo mostrato è indicativo e basato sulle configurazioni selezionate. Disponibilità, tempi di consegna e canone possono variare in base alla disponibilità del veicolo e alle condizioni contrattuali.
                    </p>

                </div>

                </div>

            </div>

            </div>

            </section>


            {/* FAQ */}
            <section className="px-6 md:px-10 pb-24">

                <div className="max-w-5xl mx-auto">

                    <div className="text-center mb-16">

                        <p className="text-sm uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-4">
                        FAQ
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#0f3549] leading-tight">
                        Domande frequenti
                        </h2>

                        <p className="text-gray-600 text-lg mt-6">
                        Tutto quello che devi sapere sul noleggio lungo termine.
                        </p>

                    </div>

                    <div className="space-y-6">

                        {[
                        {
                            question: "Cosa include il canone mensile?",
                            answer:
                            "Il canone include assicurazione RCA, manutenzione ordinaria, assistenza stradale e gestione amministrativa del veicolo.",
                        },
                        {
                            question: "È necessario un anticipo?",
                            answer:
                            "No, puoi scegliere formule con o senza anticipo in base alle tue esigenze e al budget disponibile.",
                        },
                        {
                            question: "Posso cambiare auto a fine contratto?",
                            answer:
                            "Sì, al termine del contratto puoi scegliere un nuovo modello oppure concludere il noleggio senza preoccuparti della rivendita.",
                        },
                        {
                            question: "Il noleggio conviene rispetto all’acquisto?",
                            answer:
                            "Per molti utenti sì: permette di avere costi più prevedibili, meno imprevisti e nessun rischio legato alla svalutazione.",
                        },
                        ].map((faq) => (
                            <div
                                key={faq.question}
                                className="
                                    bg-white/80
                                    backdrop-blur-xl
                                    border
                                    border-white
                                    rounded-[32px]
                                    p-8
                                    shadow-[0_10px_40px_rgba(15,53,73,0.08)]
                                "
                            >

                                <h3 className="text-2xl font-bold text-[#0f3549] mb-4">
                                {faq.question}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-lg">
                                {faq.answer}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="px-6 md:px-10 pb-10">

                <div className="
                max-w-7xl
                mx-auto
                rounded-[40px]
                bg-[#0f3549]
                overflow-hidden
                shadow-[0_30px_80px_rgba(15,53,73,0.20)]
                ">

                {/* TOP */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 p-10 md:p-14 border-b border-white/10">

                    {/* BRAND */}
                    <div className="lg:col-span-2">

                    <h2 className="text-3xl font-bold text-white mb-4">
                        4Moovy
                    </h2>

                    <p className="text-[#73d2d2] font-medium mb-6">
                        Noleggio intelligente
                    </p>

                    <p className="text-gray-300 leading-relaxed max-w-lg">
                        La piattaforma premium per confrontare noleggio lungo termine e acquisto auto con maggiore trasparenza, semplicità e controllo dei costi.
                    </p>

                    </div>

                    {/* LINK */}
                    <div>

                    <h3 className="text-white font-semibold text-lg mb-5">
                        Navigazione
                    </h3>

                    <div className="space-y-4">

                    {[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Preventivo",
                            href: "/preventivo",
                        },
                        {
                            label: "Confronto",
                            href: "/#confronto",
                        },
                        {
                            label: "FAQ",
                            href: "/preventivo#faq",
                        },
                      ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="
                            block
                            text-gray-300
                            hover:text-white
                            transition-all
                            duration-300
                            cursor-pointer
                            "
                        >
                            {item.label}
                        </Link>
                    ))}

                    </div>

                    </div>

                    {/* CONTATTI */}
                    <div>

                    <h3 className="text-white font-semibold text-lg mb-5">
                        Contatti
                    </h3>

                    <div className="space-y-4 text-gray-300">

                        <p>
                        info@4moovy.it
                        </p>

                        <p>
                        +39 02 1234 5678
                        </p>

                        <p>
                        Milano, Italia
                        </p>

                    </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-6
                    px-10
                    py-8
                ">

                    <p className="text-gray-400 text-sm text-center md:text-left">
                    © 2026 4Moovy — Tutti i diritti riservati.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">

                    <p className="hover:text-white transition cursor-pointer">
                        Privacy Policy
                    </p>

                    <p className="hover:text-white transition cursor-pointer">
                        Cookie Policy
                    </p>

                    <p className="hover:text-white transition cursor-pointer">
                        Termini e condizioni
                    </p>

                    </div>

                </div>

                </div>

                </footer>
    
      </main>
    );
  }

  export default function PreventivoPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PreventivoContent />
      </Suspense>
    );
  }