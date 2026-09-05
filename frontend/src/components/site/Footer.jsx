import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import Logo from "@/components/site/Logo";

const COLS = [
  {
    title: "Platform",
    links: [
      { label: "Learning Materials", to: "/learning-materials", testid: "footer-materials-link" },
      { label: "Simulations (Coming Soon)", to: "/simulations", testid: "footer-simulations-link" },
      { label: "Resources Hub", to: "/resources", testid: "footer-resources-link" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Trainers", to: "/solutions/trainers", testid: "footer-trainers-link" },
      { label: "For Enterprise", to: "/solutions/enterprise", testid: "footer-enterprise-link" },
      { label: "eLearning Services", to: "/solutions/services", testid: "footer-services-link" },
      { label: "Pricing", to: "/pricing", testid: "footer-pricing-link" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about-contact", testid: "footer-about-link" },
      { label: "Our Partners", to: "/about-contact", testid: "footer-partners-link" },
      { label: "Sustainability Report", to: "/about-contact", testid: "footer-report-link" },
      { label: "Contact Support", to: "/about-contact", testid: "footer-support-link" },
      { label: "Careers", to: "/about-contact", testid: "footer-careers-link" },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", testid: "footer-linkedin-link" },
  { icon: Twitter, label: "Twitter / X", testid: "footer-twitter-link" },
  { icon: Youtube, label: "YouTube", testid: "footer-youtube-link" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400" data-testid="main-footer">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Green Mind Learning is redefining sustainability education — expert-built materials today,
              simulation-based learning coming soon.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  data-testid={s.testid}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 hover:border-forest hover:bg-forest hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      data-testid={l.testid}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-leaf"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-navy-line pt-7 text-xs text-slate-500 sm:flex-row">
          <p data-testid="footer-copyright">© 2026 Green Mind Learning. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" data-testid="footer-privacy-link" className="transition-colors hover:text-leaf">Privacy Policy</a>
            <a href="#" data-testid="footer-terms-link" className="transition-colors hover:text-leaf">Terms of Service</a>
            <a href="#" data-testid="footer-cookies-link" className="transition-colors hover:text-leaf">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
