import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-ink placeholder:text-slate-400 text-sm transition-all";

export const inputDarkCls =
  "w-full px-4 py-3 rounded-xl border border-navy-line bg-navy-card text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-sm transition-all";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all duration-300 px-6 py-3";

const variants = {
  primary:
    "bg-gradient-to-r from-forest to-forest-mid text-white hover:from-forest-dark hover:to-forest shadow-[0_10px_28px_-10px_rgba(30,142,74,0.6)] hover:-translate-y-0.5",
  outline:
    "border border-slate-300 text-ink bg-white hover:border-forest hover:text-forest hover:-translate-y-0.5",
  glass:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:-translate-y-0.5",
  white:
    "bg-white text-ink hover:bg-forest-light hover:-translate-y-0.5",
};

export function ButtonLink({ to, onClick, variant = "primary", children, testid, arrow = false, className = "", type = "button" }) {
  const cls = `${btnBase} ${variants[variant]} ${className} group`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} data-testid={testid} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} data-testid={testid} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

export function ArrowLink({ to, onClick, children, dark = false, testid }) {
  const cls = `inline-flex items-center gap-1.5 text-sm font-bold group ${dark ? "text-leaf hover:text-leaf-light" : "text-forest hover:text-forest-dark"} transition-colors`;
  const icon = <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />;
  if (to) {
    return (
      <Link to={to} data-testid={testid} className={cls}>
        {children} {icon}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} data-testid={testid} className={cls}>
      {children} {icon}
    </button>
  );
}

export function Tag({ children, dark = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-extrabold tracking-[0.24em] uppercase ${
        dark ? "text-leaf" : "text-forest"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-leaf" : "bg-forest"}`} />
      {children}
    </span>
  );
}

export function SoonPill({ children = "Coming Soon", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest/10 text-forest border border-forest/25 ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHead({ tag, title, sub, dark = false, center = false, className = "" }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {tag && <Tag dark={dark}>{tag}</Tag>}
      <h2
        className={`mt-4 font-display text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.08] text-balance ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-base leading-relaxed ${dark ? "text-slate-400" : "text-body"}`}>{sub}</p>
      )}
    </div>
  );
}

export function FormSuccess({ children, testid }) {
  return (
    <div
      data-testid={testid}
      className="bg-forest-light border border-forest/30 text-forest-dark px-5 py-4 rounded-xl font-semibold text-sm text-center"
    >
      {children}
    </div>
  );
}
