"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const carImages: Record<string, string> = {
  "Fiat 500 Hybrid Icon": "/cars/fiat500.jpg",
  "Peugeot 208": "/cars/peugeot208.jpg",
  "Toyota Yaris Hybrid": "/cars/yaris.jpg",
  "Volkswagen T-Cross": "/cars/tcross.jpg",
  "Volvo XC40 B3": "/cars/volvoxc40.jpg",
  "Kia Picanto": "/cars/kiapicanto.jpg",
  "Nissan Juke": "/cars/nissanjuke.jpg",
};

const pricingData: Record<string, { basePrice: number; delivery: string }> = {
  "Fiat 500 Hybrid Icon": { basePrice: 406, delivery: "14 settimane" },
  "Kia Picanto": { basePrice: 346, delivery: "9 settimane" },
  "Nissan Juke": { basePrice: 554, delivery: "20 settimane" },
  "Peugeot 208": { basePrice: 439, delivery: "12 settimane" },
  "Toyota Yaris Hybrid": { basePrice: 469, delivery: "13 settimane" },
  "Volkswagen T-Cross": { basePrice: 512, delivery: "19 settimane" },
  "Volvo XC40 B3": { basePrice: 778, delivery: "19 settimane" },
};

const services = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Assicurazione RCA",
    description: "Copertura completa inclusa nel canone mensile. Zero sorprese.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Manutenzione",
    description: "Tagliandi, filtri e ricambi coperti per tutta la durata.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Soccorso stradale",
    description: "Assistenza 24/7 in tutta Europa inclusa nel contratto.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Gestione imprevisti",
    description: "Auto sostitutiva e furto/incendio coperti senza extra.",
  },
];

const carDetails: Record<string, { longDescription: string; highlights: string[] }> = {
  "Fiat 500 Hybrid Icon": {
    longDescription: "La Fiat 500 è una piccola che non passa inosservata. Nata per la città, è facile da guidare, economica da gestire e semplice da parcheggiare anche negli spazi più stretti. Una scelta intelligente per chi si muove principalmente in centro o in contesti urbani affollati.",
    highlights: ["Consumi ridotti, ideale per uso urbano quotidiano", "Dimensioni compatte, parcheggio facilitato", "Costi di manutenzione tra i più bassi della categoria"],
  },
  "Toyota Yaris Hybrid": {
    longDescription: "La Toyota Yaris ibrida è una delle auto più affidabili sul mercato. Il sistema hybrid Toyota riduce i consumi in modo significativo, soprattutto in città, e la qualità costruttiva garantisce pochi problemi nel tempo. Una scelta solida per chi fa tanti chilometri e vuole spendere poco in carburante e manutenzione.",
    highlights: ["Motore ibrido con consumi reali tra i più bassi", "Affidabilità Toyota comprovata nel tempo", "Ottimo valore di rivendita a fine noleggio"],
  },
  "Nissan Juke": {
    longDescription: "Il Nissan Juke divide i gusti per il design, ma convince chi lo guida. L'abitacolo è curato, la tecnologia di bordo è aggiornata e il comportamento su strada è più dinamico di quanto le dimensioni facciano pensare. Una buona scelta per chi vuole un SUV compatto con carattere.",
    highlights: ["Tecnologia di bordo aggiornata e intuitiva", "Guida dinamica e piacevole per un SUV compatto", "Design riconoscibile e distintivo"],
  },
  "Volkswagen T-Cross": {
    longDescription: "Il Volkswagen T-Cross è uno dei SUV compatti meglio riusciti della categoria. Spazio interno sorprendente per le sue dimensioni, finiture di qualità tipicamente tedesche e una tenuta di strada sicura e prevedibile. Adatto sia all'uso quotidiano che ai viaggi più lunghi con famiglia o bagagli.",
    highlights: ["Spazio interno ampio per la categoria", "Finiture e qualità costruttiva tipicamente VW", "Tenuta di strada stabile e rassicurante"],
  },
  "Volvo XC40 B3": {
    longDescription: "La Volvo XC40 è la scelta di chi non vuole scendere a compromessi. Interni di qualità premium, tecnologie di sicurezza tra le più avanzate del mercato e una guida confortevole anche sui percorsi più lunghi. Il B3 mild hybrid bilancia bene prestazioni e consumi, mantenendo il carattere elegante tipico di Volvo.",
    highlights: ["Sistemi di sicurezza attiva tra i migliori della categoria", "Interni premium con materiali di qualità superiore", "Comfort di guida eccellente su tutti i percorsi"],
  },
  "Peugeot 208": {
    longDescription: "La Peugeot 208 è una delle city car più raffinate del segmento. Interni con finiture di qualità, un design riconoscibile e un comportamento su strada piacevole. Una buona scelta per chi vuole qualcosa di più ricercato rispetto alla media, senza aumentare troppo il canone mensile.",
    highlights: ["Design di interni originale e ben riuscito", "Guida vivace e coinvolgente per la categoria", "Buon equilibrio tra stile e praticità quotidiana"],
  },
  "Kia Picanto": {
    longDescription: "La Kia Picanto è la scelta più accessibile della selezione, ma non per questo deludente. Affidabile, semplice da guidare e con costi di gestione tra i più contenuti del mercato. Perfetta per chi cerca la soluzione essenziale per la città, senza rinunciare all'affidabilità nel tempo.",
    highlights: ["Canone mensile tra i più bassi della selezione", "Affidabilità Kia con garanzia pluriennale", "Dimensioni compatte, ideale per uso urbano"],
  },
  "Fiat 500X": {
    longDescription: "La Fiat 500X prende il carattere della 500 classica e lo mette in un formato più pratico e spazioso. Buon compromesso tra stile italiano, abitabilità reale e costi di gestione ragionevoli. Una scelta valida per chi vuole qualcosa di più grande della city car senza passare a un SUV premium.",
    highlights: ["Stile italiano riconoscibile in formato più pratico", "Abitabilità superiore rispetto alla 500 classica", "Costi di gestione contenuti per la categoria SUV"],
  },
  "Jeep Renegade": {
    longDescription: "La Jeep Renegade porta il DNA fuoristrada della casa americana in un formato compatto adatto anche all'uso quotidiano. Robusta, con una buona altezza da terra e il 4x4 disponibile per chi ne ha davvero bisogno. In città si guida bene, fuori dalla città si difende meglio di quasi tutti i suoi concorrenti.",
    highlights: ["Capacità fuoristrada reali con trazione integrale disponibile", "Robustezza e solidità costruttiva tipica Jeep", "Versatile: comoda in città, capace fuori strada"],
  },
};

const faqs = [
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
    question: "Il noleggio conviene rispetto all'acquisto?",
    answer:
      "Per molti utenti sì: permette di avere costi più prevedibili, meno imprevisti e nessun rischio legato alla svalutazione.",
  },
];

function PreventivoContent() {
  const searchParams = useSearchParams();
  const carFromUrl = searchParams.get("car");
  const selectedCar =
    carFromUrl && carFromUrl.trim() !== "" ? carFromUrl : "Volvo XC40 B3";

  const currentImage = carImages[selectedCar] ?? "/cars/volvoxc40.jpg";
  const basePrice = pricingData[selectedCar]?.basePrice ?? 500;
  const delivery = pricingData[selectedCar]?.delivery ?? "15 settimane";

  const [duration, setDuration] = useState("48 mesi");
  const [annualKm, setAnnualKm] = useState("30.000 km");
  const [upfront, setUpfront] = useState("0€");

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formSent, setFormSent] = useState(false);

  let calculatedPrice = basePrice;
  if (duration === "36 mesi") calculatedPrice += basePrice * 0.08;
  if (duration === "60 mesi") calculatedPrice -= basePrice * 0.05;
  if (annualKm === "10.000 km") calculatedPrice -= basePrice * 0.1;
  if (annualKm === "20.000 km") calculatedPrice -= basePrice * 0.05;
  if (upfront === "3.000€") calculatedPrice -= 25;
  if (upfront === "5.000€") calculatedPrice -= 45;

  const finalPrice = Math.round(calculatedPrice);
  const months = duration === "36 mesi" ? 36 : duration === "48 mesi" ? 48 : 60;
  const totalContract = finalPrice * months;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Preventivo ${selectedCar} — ${formData.name}`
    );
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefono: ${formData.phone}\n\nConfigurazione richiesta:\n- Veicolo: ${selectedCar}\n- Durata: ${duration}\n- Km annui: ${annualKm}\n- Anticipo: ${upfront}\n- Canone calcolato: €${finalPrice}/mese\n- Totale contratto: €${totalContract.toLocaleString("it-IT")}\n- Consegna prevista: ${delivery}`
    );
    window.location.href = `mailto:info@4moovy.it?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  const scrollToForm = () => {
    document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="px-5 md:px-10 pt-32 pb-20 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3549] mb-4">
                Noleggio lungo termine
              </p>

              <h1
                className="font-semibold text-[#0A0A0A] leading-tight mb-5"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)" }}
              >
                Preventivo{" "}
                <span className="text-[#0f3549]">{selectedCar}</span>
              </h1>

              <p className="text-sm text-[#6B7280] leading-relaxed max-w-lg mb-5">
                {carDetails[selectedCar]?.longDescription ?? "Scopri la soluzione più adatta alle tue esigenze con costi trasparenti e un preventivo personalizzato in 60 secondi."}
              </p>

              {carDetails[selectedCar]?.highlights && (
                <ul className="space-y-2 mb-8">
                  {carDetails[selectedCar].highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-[#0f3549] mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[#6B7280]">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 border border-[#E5E7EB] text-[#6B7280] px-5 py-2.5 rounded-lg text-sm font-medium hover:border-[#0f3549] hover:text-[#0f3549] transition-all duration-200"
                >
                  ← Torna al confronto
                </Link>
                <button
                  onClick={scrollToForm}
                  className="bg-[#0f3549] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1a4d66] transition-all duration-200"
                >
                  Richiedi preventivo
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Anticipo", value: "Personalizzabile" },
                  { label: "Consegna", value: delivery },
                  { label: "Servizi inclusi", value: "RCA + Assistenza" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3"
                  >
                    <p className="text-xs text-[#6B7280] mb-1">{stat.label}</p>
                    <p className="text-sm font-semibold text-[#0A0A0A]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-[560px] mx-auto aspect-[4/3]">
              <Image
                src={currentImage}
                alt={`${selectedCar} — Preventivo noleggio`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 md:px-10 py-20 border-b border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3549] mb-3">
              Servizi inclusi
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] max-w-md leading-tight">
              Tutto incluso. Zero pensieri.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#0f3549] hover:shadow-sm transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0f3549]/8 flex items-center justify-center text-[#0f3549] mb-5">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[#0A0A0A] mb-2 text-[15px]">{service.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="px-5 md:px-10 py-20 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3549] mb-3">
              Configura
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] leading-tight">
              Personalizza il noleggio
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Config options */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-7">
              <div className="space-y-7">
                {[
                  {
                    label: "Durata contratto",
                    options: ["36 mesi", "48 mesi", "60 mesi"],
                    value: duration,
                    setter: setDuration,
                  },
                  {
                    label: "Chilometraggio annuo",
                    options: ["10.000 km", "20.000 km", "30.000 km"],
                    value: annualKm,
                    setter: setAnnualKm,
                  },
                  {
                    label: "Anticipo",
                    options: ["0€", "3.000€", "5.000€"],
                    value: upfront,
                    setter: setUpfront,
                  },
                ].map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {group.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => group.setter(opt)}
                          className={`rounded-lg py-3 font-medium text-sm transition-all duration-200 border ${
                            group.value === opt
                              ? "bg-[#0f3549] text-white border-[#0f3549]"
                              : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0f3549] hover:text-[#0f3549]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote summary */}
            <div className="sticky top-28 rounded-xl bg-[#0f3549] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Preventivo stimato
              </p>
              <span className="inline-flex items-center bg-[#ffdc46] text-[#0f3549] px-2.5 py-0.5 rounded-md text-xs font-semibold mb-6">
                Offerta consigliata
              </span>

              <div className="mb-7">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold price">€{finalPrice}</span>
                  <span className="text-base text-white/50 font-normal">/mese</span>
                </div>
              </div>

              <div className="space-y-3 mb-7 border-t border-white/10 pt-6">
                {[
                  { label: "Durata", value: duration },
                  { label: "Chilometri inclusi", value: `${annualKm}/Anno` },
                  { label: "Anticipo", value: upfront },
                  {
                    label: "Totale contratto",
                    value: `€${totalContract.toLocaleString("it-IT")}`,
                  },
                  { label: "Consegna prevista", value: delivery },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <span className="text-white/50 text-sm">{row.label}</span>
                    <span className="font-semibold text-sm price">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl text-[#0A0A0A] p-5 mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
                  Servizi inclusi
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-medium text-[#0f3549]">
                  {["✓ RCA", "✓ Assistenza", "✓ Manutenzione", "✓ Furto/Incendio"].map(
                    (s) => <span key={s}>{s}</span>
                  )}
                </div>
              </div>

              <button
                onClick={scrollToForm}
                className="w-full bg-[#ffdc46] text-[#0f3549] py-3 rounded-lg text-sm font-semibold hover:bg-[#ffe870] transition-all duration-200"
              >
                Richiedi questa offerta →
              </button>

              <p className="text-xs text-white/40 text-center leading-relaxed mt-4">
                Il preventivo è indicativo. Disponibilità e canone possono variare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 md:px-10 py-20 border-b border-[#E5E7EB]" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3549] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] leading-tight">
              Domande frequenti
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#0f3549] transition-all duration-200"
              >
                <h3 className="font-semibold text-[#0A0A0A] mb-2 text-[15px]">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contatti" className="px-5 md:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl bg-[#0f3549] p-8 md:p-12 text-white">
            {formSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#ffdc46] flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-[#0f3549]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-3">Richiesta inviata!</h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-7">
                  Abbiamo ricevuto la tua richiesta. Ti risponderemo entro 24 ore
                  con un&apos;offerta personalizzata.
                </p>
                <div className="bg-white/10 rounded-xl p-5 text-left space-y-2 text-sm">
                  <p className="text-white/60">
                    <span className="font-semibold text-white">Veicolo:</span> {selectedCar}
                  </p>
                  <p className="text-white/60">
                    <span className="font-semibold text-white">Canone stimato:</span> €{finalPrice}/mese
                  </p>
                  <p className="text-white/60">
                    <span className="font-semibold text-white">Durata:</span> {duration}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                  Blocca l&apos;offerta
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
                  Vuoi questa offerta?
                </h2>
                <p className="text-white/60 text-sm mb-7">
                  Lascia i tuoi dati e ti ricontatteremo entro 24 ore con la
                  proposta definitiva per{" "}
                  <span className="text-[#ffdc46] font-semibold">{selectedCar}</span>.
                </p>

                <div className="bg-white/10 rounded-xl p-4 mb-7 flex flex-wrap gap-4 text-sm">
                  <span>
                    <span className="text-white/50">Canone: </span>
                    <span className="font-semibold price">€{finalPrice}/mese</span>
                  </span>
                  <span>
                    <span className="text-white/50">Durata: </span>
                    <span className="font-semibold">{duration}</span>
                  </span>
                  <span>
                    <span className="text-white/50">Km: </span>
                    <span className="font-semibold">{annualKm}/anno</span>
                  </span>
                  <span>
                    <span className="text-white/50">Totale: </span>
                    <span className="font-semibold price">€{totalContract.toLocaleString("it-IT")}</span>
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                        Nome e cognome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mario Rossi"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+39 333 1234567"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="mario@email.it"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ffdc46] text-[#0f3549] py-3 rounded-lg text-sm font-semibold hover:bg-[#ffe870] transition-all duration-200 mt-1"
                  >
                    Invia richiesta preventivo
                  </button>
                  <p className="text-xs text-white/30 text-center">
                    I tuoi dati non saranno condivisi con terze parti. Risposta garantita entro 24h.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PreventivoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#0f3549] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PreventivoContent />
    </Suspense>
  );
}
