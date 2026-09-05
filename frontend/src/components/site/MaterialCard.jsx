import { Clock, Star } from "lucide-react";
import { Reveal } from "@/components/site/Motion";

export default function MaterialCard({ m, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        data-testid={`material-card-${m.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.25)]"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={m.img}
            alt={m.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
            {m.type}
          </span>
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {m.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink">{m.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{m.desc}</p>
          <div className="mt-auto flex items-center gap-3 pt-5 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-forest-light px-2.5 py-1 text-forest-dark">{m.topic}</span>
            <span>{m.level}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {m.minutes}m
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
