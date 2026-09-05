import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Search, ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";
import { SoonPill } from "@/components/site/ui";

const LINKS = [
  { to: "/", label: "Home", testid: "nav-home-link" },
  { to: "/learning-materials", label: "Learning Materials", testid: "nav-materials-link" },
  { to: "/simulations", label: "Simulations", soon: true, testid: "nav-simulations-link" },
  { to: "/resources", label: "Resources Hub", testid: "nav-resources-link" },
];

const SOLUTIONS = [
  { to: "/solutions/trainers", label: "For Trainers", desc: "Toolkits, guides & delivery workflows", testid: "nav-solutions-trainers-link" },
  { to: "/solutions/enterprise", label: "For Enterprise", desc: "Scaled ESG training for every team", testid: "nav-solutions-enterprise-link" },
  { to: "/solutions/services", label: "eLearning Services", desc: "We build, fix & connect your content", testid: "nav-solutions-services-link" },
];

const linkCls = (isActive) =>
  `relative text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
    isActive ? "text-ink" : "text-slate-500 hover:text-ink"
  } after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:rounded-full after:bg-forest after:transition-all after:duration-300 ${
    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mobileSol, setMobileSol] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [location.pathname]);

  const solutionsActive = location.pathname.startsWith("/solutions");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md" data-testid="main-nav">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <Link to="/" data-testid="nav-logo-link" aria-label="Green Mind Learning home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} data-testid={l.testid} className={({ isActive }) => linkCls(isActive)}>
              <span className="inline-flex items-center gap-1.5">
                {l.label}
                {l.soon && <SoonPill />}
              </span>
            </NavLink>
          ))}

          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button
              type="button"
              data-testid="nav-solutions-dropdown"
              onClick={() => setDrop((v) => !v)}
              className={`flex items-center gap-1 text-[13px] font-semibold tracking-wide transition-colors ${
                solutionsActive ? "text-ink" : "text-slate-500 hover:text-ink"
              }`}
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${drop ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-4 transition-all duration-300 ${
                drop ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(11,18,32,0.25)]">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    data-testid={s.testid}
                    className="group flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-mist"
                  >
                    <span>
                      <span className="block text-sm font-bold text-ink">{s.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{s.desc}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-4 w-4 text-slate-300 transition-all group-hover:text-forest" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/pricing" data-testid="nav-pricing-link" className={({ isActive }) => linkCls(isActive)}>
            Pricing
          </NavLink>
          <NavLink to="/about-contact" data-testid="nav-about-link" className={({ isActive }) => linkCls(isActive)}>
            About &amp; Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            data-testid="nav-search-link"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-forest hover:text-forest sm:flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/pricing"
            data-testid="nav-get-started-button"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-forest to-forest-mid px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(30,142,74,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:from-forest-dark hover:to-forest sm:inline-flex"
          >
            Get Started
          </Link>
          <button
            type="button"
            data-testid="nav-mobile-menu-button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-400 xl:hidden ${
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`mobile-${l.testid}`}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-forest-light text-forest-dark" : "text-slate-600"}`
              }
            >
              {l.label}
              {l.soon && <SoonPill />}
            </NavLink>
          ))}
          <button
            type="button"
            data-testid="mobile-nav-solutions-dropdown"
            onClick={() => setMobileSol((v) => !v)}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600"
          >
            Solutions
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileSol ? "rotate-180" : ""}`} />
          </button>
          {mobileSol &&
            SOLUTIONS.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                data-testid={`mobile-${s.testid}`}
                className="ml-4 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:text-forest"
              >
                {s.label}
              </NavLink>
            ))}
          <NavLink to="/pricing" data-testid="mobile-nav-pricing-link" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600">
            Pricing
          </NavLink>
          <NavLink to="/about-contact" data-testid="mobile-nav-about-link" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600">
            About &amp; Contact
          </NavLink>
          <Link
            to="/pricing"
            data-testid="mobile-nav-get-started-button"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-forest to-forest-mid px-5 py-3 text-sm font-bold text-white"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
