import { GraduationCap } from "lucide-react";

export default function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-forest shadow-[0_6px_16px_-6px_rgba(30,142,74,0.6)]">
        <GraduationCap className="h-5 w-5 text-white" strokeWidth={2.2} />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300 border-2 border-white" />
      </span>
      <span className={`font-display font-black tracking-tight text-[15px] leading-none uppercase ${dark ? "text-white" : "text-ink"}`}>
        Green Mind
        <span className={`block text-[9px] font-bold tracking-[0.42em] ${dark ? "text-emerald-400" : "text-forest"}`}>
          Learning
        </span>
      </span>
    </span>
  );
}
