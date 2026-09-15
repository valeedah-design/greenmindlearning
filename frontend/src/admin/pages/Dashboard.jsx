import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../AuthContext";
import { NAV_SECTIONS } from "../navConfig";

export default function Dashboard() {
  const { name } = useAuth();

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
        Welcome{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-2 text-body text-sm max-w-xl">
        Each card below is named after the public page it controls — pick a section to manage that
        page's content.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {NAV_SECTIONS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-forest hover:shadow-lg transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-forest-light text-forest flex items-center justify-center mb-4">
              <s.icon className="h-5 w-5" />
            </div>
            <h2 className="font-display font-bold text-ink text-base leading-snug">{s.cardTitle}</h2>
            <p className="mt-1.5 text-sm text-body">{s.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Manage
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
