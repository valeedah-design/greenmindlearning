import { motion } from "framer-motion";
import { Users, UserCheck, PenTool, ShieldCheck, Palette, Plug, Headphones, TrendingUp, ClipboardCheck, GraduationCap } from "lucide-react";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, Tag, SectionHead } from "@/components/site/ui";
import CtaBanner from "@/components/site/CtaBanner";
import { IMAGES, TINTS } from "@/data/content";

const CAPABILITIES = [
  { icon: Users, title: "Unlimited Students & Trainers", desc: "No seat ceilings — grow the program as fast as the organization does." },
  { icon: UserCheck, title: "Dedicated Account Manager", desc: "A named contact who knows your rollout plan and owns its success." },
  { icon: PenTool, title: "Custom Material Development", desc: "Modules built around your policies, data, and industry context." },
  { icon: ShieldCheck, title: "Advanced Security (SSO/SAML)", desc: "Enterprise-grade identity, access control, and audit trails." },
  { icon: Palette, title: "White-Label Branding", desc: "Your logo, your colors, your domain — our engine underneath." },
  { icon: Plug, title: "API Access for LMS Integration", desc: "Pipe completions and scores straight into your existing stack." },
  { icon: Headphones, title: "24/7 Premium Support", desc: "Round-the-clock help across every region you operate in." },
];

const USE_CASES = [
  { icon: TrendingUp, title: "Workforce Upskilling at Scale", desc: "Roll out consistent ESG fundamentals to thousands of employees across regions — one curriculum, every timezone." },
  { icon: ClipboardCheck, title: "ESG Compliance & Audit-Readiness", desc: "Train teams on CSRD, GRI, and disclosure workflows before the auditors arrive, with completion data to prove it." },
  { icon: GraduationCap, title: "Onboarding Sustainability Hires", desc: "Get new ESG team members productive in weeks with structured, role-based learning paths." },
];

const LOGOS = ["NORDWERK", "HELIOS ENERGY", "ATLAS GROUP", "VERDANT CO", "MERIDIAN", "OSTMANN"];

export default function ForEnterprise() {
  return (
    <div data-testid="for-enterprise-page">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy">
        <img src={IMAGES.execMeeting} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="hero-vignette absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-forest/20 blur-[130px]" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Tag dark>For Enterprise</Tag>
          </motion.div>
          <MaskedLines
            className="mt-5 max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            lines={[
              "Sustainability training that",
              <><span className="text-emerald-400">scales</span> with your</>,
              "organization.",
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300"
          >
            Deploy consistent ESG education across every team, region, and business unit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <ButtonLink to="/about-contact" variant="primary" testid="enterprise-contact-sales-button" arrow>
              Contact Sales
            </ButtonLink>
            <ButtonLink to="/pricing" variant="glass" testid="enterprise-overview-button">
              Download Enterprise Overview
            </ButtonLink>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="Enterprise Capabilities"
              title={<>Everything the Enterprise tier <span className="text-forest">includes.</span></>}
              sub="The full ecosystem, mirrored exactly in our Enterprise plan — no hidden add-ons."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.slice(0, 4).map((c, i) => (
              <CapabilityCard key={c.title} c={c} i={i} />
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.slice(4).map((c, i) => (
              <CapabilityCard key={c.title} c={c} i={i + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Use Cases"
              title={<>Where enterprise teams <span className="text-forest">deploy us.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-emerald-400">
                    <u.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-slate-100 bg-white px-6 py-16 lg:px-10" data-testid="enterprise-logos-strip">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.24em] text-slate-400">
              Trusted by sustainability teams at
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {LOGOS.map((l) => (
                <div key={l} className="flex h-16 items-center justify-center rounded-xl bg-mist font-display text-sm font-extrabold tracking-widest text-slate-400 transition-colors hover:text-forest">
                  {l}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Talk to our enterprise team."
        sub="Tell us about your rollout — we'll scope a pilot with you inside a week."
        primary={{ label: "Contact Sales", to: "/about-contact", testid: "enterprise-cta-contact-button" }}
        testid="enterprise-final-cta"
      />
    </div>
  );
}

function CapabilityCard({ c, i }) {
  return (
    <Reveal delay={i * 0.07} className="h-full">
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${TINTS[i % TINTS.length].soft} ${TINTS[i % TINTS.length].text}`}>
          <c.icon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-base font-bold tracking-tight text-ink">{c.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{c.desc}</p>
      </div>
    </Reveal>
  );
}
