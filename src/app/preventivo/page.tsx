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
    emoji: "🛡️",
    title: "Assicurazione RCA",
    description: "Copertura completa inclusa nel canone mensile. Zero sorprese.",
  },
  {
    emoji: "🔧",
    title: "Manutenzione",
    description: "Tagliandi, filtri e ricambi coperti per tutta la durata.",
  },
  {
    emoji: "🚘",
    title: "Soccorso stradale",
    description: "Assistenza 24/7 in tutta Europa inclusa nel contratto.",
  },
  {
    emoji: "⚡",
    title: "Gestione imprevisti",
    description: "Auto sostitutiva e furto/incendio coperti senza extra.",
  },
];

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
      <section className="relative overflow-hidden px-5 md:px-10 pt-36 pb-20">
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#73d2d2]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#73d2d2] bg-[#73d2d2]/10 px-4 py-2 text-sm font-medium text-[#0f3549] mb-6">
                Noleggio lungo termine
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#0f3549]">
                Preventivo
                <span className="text-[#ffdc46]"> {selectedCar}</span>
              </h1>

              <p className="mt-7 text-lg text-gray-500 leading-relaxed max-w-xl">
                Scopri la soluzione più adatta alle tue esigenze con costi
                trasparenti e un preventivo personalizzato in 60 secondi.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/">
                  <button className="border border-[#0f3549] text-[#0f3549] px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-[#0f3549] hover:text-white transition-all duration-300">
                    ← Torna al confronto
                  </button>
                </Link>
                <button
                  onClick={scrollToForm}
                  className="bg-[#ffdc46] text-[#0f3549] px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Richiedi preventivo
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl px-5 py-4 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium mb-1">Anticipo</p>
                  <p className="text-base font-bold text-[#0f3549]">Personalizzabile</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl px-5 py-4 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium mb-1">Consegna</p>
                  <p className="text-base font-bold text-[#0f3549]">{delivery}</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl px-5 py-4 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium mb-1">Servizi inclusi</p>
                  <p className="text-base font-bold text-[#0f3549]">RCA + Assistenza</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute w-[380px] h-[380px] bg-[#73d2d2]/15 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10 w-full max-w-[600px] aspect-[4/3]">
                <Image
                  src={currentImage}
                  alt={`${selectedCar} — Preventivo noleggio`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(15,53,73,0.18)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 md:px-10 py-20" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-3">
              Servizi inclusi
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f3549]">
              Tutto incluso.
              <br />
              Zero pensieri.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-[28px] border border-[#E5E7EB] p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#73d2d2]/10 mb-6 flex items-center justify-center w-12 h-12">
                  <span className="text-2xl">{service.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f3549] mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="px-5 md:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-3">
              Configura il tuo preventivo
            </p>
            <h2 className="text-4xl font-bold text-[#0f3549]">
              Personalizza il noleggio
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Config options */}
            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-[40px] p-8 shadow-sm">
              <div className="space-y-8">
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
                    <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {group.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => group.setter(opt)}
                          className={`rounded-2xl py-4 font-semibold text-sm transition-all duration-300 border ${
                            group.value === opt
                              ? "bg-[#0f3549] text-white border-[#0f3549] shadow-md"
                              : "bg-white text-[#0f3549] border-[#E5E7EB] hover:border-[#0f3549]/30"
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
            <div className="sticky top-28 relative overflow-hidden rounded-[40px] bg-[#0f3549] p-8 md:p-10 text-white shadow-[0_30px_80px_rgba(15,53,73,0.25)]">
              <div className="absolute top-[-100px] right-[-100px] w-[260px] h-[260px] bg-[#73d2d2]/20 blur-3xl rounded-full pointer-events-none" />

              <div className="relative">
                <p className="text-[#73d2d2] text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Preventivo stimato
                </p>
                <div className="inline-flex items-center rounded-full bg-[#ffdc46] text-[#0f3549] px-4 py-1.5 text-xs font-bold mb-6">
                  Offerta consigliata
                </div>

                <div className="mb-8">
                  <h2 className="text-5xl font-bold tracking-tight">
                    €{finalPrice}
                    <span className="text-xl text-gray-400 font-normal">/mese</span>
                  </h2>
                </div>

                <div className="space-y-4 mb-8 border-t border-white/10 pt-6">
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
                      className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-400 text-sm">{row.label}</span>
                      <span className="font-semibold text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[24px] text-[#0f3549] p-5 mb-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#73d2d2] font-semibold mb-4">
                    Analisi convenienza
                  </p>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Gestione semplificata", value: "Inclusa" },
                      { label: "Costi prevedibili", value: "✓", green: true },
                      { label: "Rischio svalutazione", value: "Evitato", yellow: true },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span className="text-gray-500">{row.label}</span>
                        <span
                          className={`font-bold ${
                            row.green ? "text-green-600" : row.yellow ? "text-[#0f3549]" : ""
                          }`}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-[#F8F9FA] rounded-2xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Servizi inclusi</p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-medium text-[#0f3549]">
                      {["✓ RCA", "✓ Assistenza", "✓ Manutenzione", "✓ Furto e incendio"].map(
                        (s) => <span key={s}>{s}</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={scrollToForm}
                  className="w-full bg-[#ffdc46] text-[#0f3549] py-4 rounded-2xl text-base font-bold hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(255,220,70,0.4)] transition-all duration-300"
                >
                  Richiedi questa offerta →
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed mt-4">
                  Il preventivo è indicativo. Disponibilità, tempi e canone possono
                  variare in base alle condizioni contrattuali.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 md:px-10 py-20" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#73d2d2] font-semibold mb-4">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f3549] mb-5">
              Domande frequenti
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Tutto quello che devi sapere sul noleggio lungo termine.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-[24px] border border-[#E5E7EB] p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#0f3549] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contatti" className="px-5 md:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-[#0f3549] rounded-[40px] p-10 md:p-14 text-white shadow-[0_30px_80px_rgba(15,53,73,0.20)]">
            <div className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] bg-[#73d2d2]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-[-120px] left-[-100px] w-[240px] h-[240px] bg-[#ffdc46]/8 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#ffdc46] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#0f3549]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Richiesta inviata!</h2>
                  <p className="text-gray-300 text-base leading-relaxed max-w-md mx-auto">
                    Abbiamo ricevuto la tua richiesta. Ti risponderemo entro 24 ore
                    con un&apos;offerta personalizzata.
                  </p>
                  <div className="mt-8 bg-white/10 rounded-2xl p-5 text-left space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Veicolo:</span> {selectedCar}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Canone stimato:</span> €{finalPrice}/mese
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Durata:</span> {duration}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[#73d2d2] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                    Blocca l&apos;offerta
                  </p>
                  <h2 className="text-4xl font-bold leading-tight mb-3">
                    Vuoi questa offerta?
                  </h2>
                  <p className="text-gray-300 text-base mb-8">
                    Lascia i tuoi dati e ti ricontatteremo entro 24 ore con la
                    proposta definitiva per{" "}
                    <span className="text-[#ffdc46] font-semibold">{selectedCar}</span>.
                  </p>

                  <div className="bg-white/10 rounded-2xl p-4 mb-8 flex flex-wrap gap-4 text-sm">
                    <span>
                      <span className="text-gray-400">Canone: </span>
                      <span className="font-bold">€{finalPrice}/mese</span>
                    </span>
                    <span>
                      <span className="text-gray-400">Durata: </span>
                      <span className="font-bold">{duration}</span>
                    </span>
                    <span>
                      <span className="text-gray-400">Km: </span>
                      <span className="font-bold">{annualKm}/anno</span>
                    </span>
                    <span>
                      <span className="text-gray-400">Totale: </span>
                      <span className="font-bold">€{totalContract.toLocaleString("it-IT")}</span>
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                          Nome e cognome *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Mario Rossi"
                          className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#73d2d2] focus:bg-white/15 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                          Telefono *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+39 333 1234567"
                          className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#73d2d2] focus:bg-white/15 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mario@email.it"
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#73d2d2] focus:bg-white/15 transition-all duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ffdc46] text-[#0f3549] py-4 rounded-2xl text-base font-bold hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(255,220,70,0.4)] transition-all duration-300 mt-2"
                    >
                      Invia richiesta preventivo
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      I tuoi dati non saranno condivisi con terze parti. Risposta garantita entro 24h.
                    </p>
                  </form>
                </>
              )}
            </div>
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
          <div className="w-8 h-8 border-4 border-[#0f3549] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PreventivoContent />
    </Suspense>
  );
}
