export default function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <defs>
          <linearGradient id="gml-cap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0C4A28" />
            <stop offset="1" stopColor="#2E8540" />
          </linearGradient>
        </defs>
        {/* leaves */}
        <path d="M32 58 C 18 48, 12 36, 13 22 C 22 30, 28 44, 32 58 Z" fill="#177A3B" />
        <path d="M30 52 C 25 44, 20 34, 16 26" fill="none" stroke="#0C4A28" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M32 58 C 46 48, 52 36, 51 22 C 42 30, 36 44, 32 58 Z" fill="#8CC63E" />
        <path d="M34 52 C 39 44, 44 34, 48 26" fill="none" stroke="#6DA32C" strokeWidth="1.6" strokeLinecap="round" />
        {/* cap */}
        <polygon points="32,4 60,19 32,34 4,19" fill="url(#gml-cap)" strokeLinejoin="round" />
        <polygon points="4,19 32,34 60,19 60,22.5 32,37.5 4,22.5" fill="#093B20" />
        {/* tassel */}
        <rect x="57.2" y="21" width="1.8" height="12" rx="0.9" fill="#0C4A28" />
        <circle cx="58.1" cy="35" r="2.1" fill="#0C4A28" />
        <path d="M55.6 37.2 h5 l-1.2 7.2 h-2.6 z" fill="#0C4A28" />
      </svg>
      <span className={`font-display font-black tracking-tight text-[15px] leading-none uppercase ${dark ? "text-white" : "text-[#0C4A28]"}`}>
        Green Mind
        <span className="mt-1 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.42em] text-[#8CC63E]">
          <span className="inline-block h-px w-2.5 bg-[#8CC63E]" />
          Learning
          <span className="inline-block h-px w-2.5 bg-[#8CC63E]" />
        </span>
      </span>
    </span>
  );
}
