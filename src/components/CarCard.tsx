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
      className={`group relative text-left rounded-2xl border bg-white transition-all duration-200 overflow-hidden ${
        isSelected
          ? "border-[#0f3549] shadow-md ring-1 ring-[#0f3549]"
          : "border-[#E5E7EB] hover:border-[#0f3549] hover:shadow-md"
      }`}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-[#F7F8FA] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0f3549] text-white px-2.5 py-1 rounded-md text-xs font-semibold">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Selezionata
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Fuel badge */}
        <span className="inline-block text-xs font-medium text-[#6B7280] bg-[#F7F8FA] border border-[#E5E7EB] px-2 py-0.5 rounded-md mb-3">
          {alimentazione}
        </span>

        <h3 className="font-semibold text-[#0A0A0A] text-[15px] leading-tight mb-3">
          {name}
        </h3>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold text-[#0f3549] price">{price}</span>
          <span className="text-sm text-[#6B7280]">/mese</span>
        </div>

        {/* CTA row */}
        {isSelected ? (
          <div className="space-y-2">
            {!showConfigurator && (
              <div
                onClick={onConfigure}
                className="w-full text-center bg-[#0f3549] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#1a4d66] transition-colors duration-200 cursor-pointer"
              >
                Vai al confronto →
              </div>
            )}
          </div>
        ) : (
          <div className="w-full text-center border border-[#E5E7EB] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg group-hover:border-[#0f3549] group-hover:text-[#0f3549] transition-colors duration-200">
            Seleziona
          </div>
        )}
      </div>

      {/* Selected left border accent */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f3549]" />
      )}
    </button>
  );
}
