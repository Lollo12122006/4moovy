const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Tutto incluso",
    description:
      "RCA, Kasko, manutenzione ordinaria e straordinaria. Un canone, zero sorprese.",
    accent: "#73d2d2",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
    title: "Costi prevedibili",
    description:
      "Pianifica le spese con certezza. Un canone mensile fisso per tutta la durata del contratto.",
    accent: "#ffdc46",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
    title: "Auto nuova ogni contratto",
    description:
      "A fine contratto scegli il modello successivo. Nessuna gestione della rivendita.",
    accent: "#73d2d2",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
        />
      </svg>
    ),
    title: "Zero svalutazione",
    description:
      "Non sei proprietario del veicolo. Non perdi il 40–50% del valore nei primi 4 anni.",
    accent: "#ffdc46",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-[#73d2d2] bg-[#73d2d2]/10 px-4 py-2 text-sm font-medium text-[#0f3549] mb-5">
            Perché scegliere il noleggio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-5">
            Tutto quello che ti serve.
            <br />
            <span className="text-[#0f3549]">Niente di quello che non ti serve.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Il noleggio lungo termine è la scelta di chi vuole guidare senza
            pensieri, con costi chiari e zero imprevisti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] border border-[#E5E7EB] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: feature.accent + "20",
                  color: feature.accent === "#ffdc46" ? "#0f3549" : feature.accent,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
