import Image from "next/image";

interface CarCardProps {
  name: string;
  image: string;
  price: string;
  alimentazione: string;
  isSelected: boolean;
  showConfigurator: boolean;
  onSelect: () => void;
  onConfigure: (e: React.MouseEvent) => void;
}

export default function CarCard({
  name,
  image,
  price,
  alimentazione,
  isSelected,
  showConfigurator,
  onSelect,
  onConfigure,
}: CarCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[32px] border p-6 text-left transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(15,53,73,0.18)] ${
        isSelected
          ? "border-[#ffdc46] bg-[#0f3549] shadow-[0_20px_60px_rgba(15,53,73,0.28)] scale-[1.01]"
          : "border-[#E5E7EB] bg-[#0f3549] hover:border-[#73d2d2]/40"
      }`}
    >
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-white to-[#eef7f7] border border-white/20 mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,210,210,0.08),transparent_70%)]" />
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.08]"
        />
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50/90 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Disponibile
      </div>

      <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
      <p className="text-[#73d2d2] text-sm mt-1">
        {alimentazione} · Noleggio lungo termine
      </p>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400 mb-1 text-sm">/mese</span>
      </div>

      {isSelected && (
        <div className="absolute top-5 right-5 z-20">
          <div className="w-9 h-9 rounded-full bg-[#ffdc46] flex items-center justify-center shadow-lg">
            <svg
              className="w-4 h-4 text-[#0f3549]"
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

      <div className="mt-5">
        {isSelected ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 rounded-full bg-[#ffdc46] text-[#0f3549] px-4 py-2 text-sm font-bold">
              ✓ Selezionata
            </div>
            {!showConfigurator && (
              <div
                onClick={onConfigure}
                className="w-full rounded-2xl py-3 text-center font-semibold bg-white text-[#0f3549] hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              >
                Vai al confronto →
              </div>
            )}
          </div>
        ) : (
          <div className="w-full rounded-2xl py-3 text-center font-semibold bg-white/10 text-white text-sm border border-white/10 group-hover:bg-white group-hover:text-[#0f3549] transition-all duration-300">
            Seleziona e confronta
          </div>
        )}
      </div>
    </button>
  );
}
