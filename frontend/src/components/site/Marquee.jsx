import { Leaf } from "lucide-react";
import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee({ dark = false }) {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className={`overflow-hidden border-y py-6 ${dark ? "border-navy-line bg-navy" : "border-slate-100 bg-white"}`}
      data-testid="editorial-marquee"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl ${
                dark ? "text-white/12" : i % 3 === 1 ? "text-forest/40" : "text-slate-200"
              }`}
            >
              {item}
            </span>
            <Leaf className="h-5 w-5 shrink-0 text-forest/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
