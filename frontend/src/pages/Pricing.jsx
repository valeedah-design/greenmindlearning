import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Compass, Users, CreditCard, TrendingUp, Minus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SectionHead } from "@/components/site/ui";
import { TIERS, FAQS, COMPARE_ROWS } from "@/data/content";

const CONNECTS = [
  { icon: Compass, label: "Home", sub: "Explore" },
  { icon: Users, label: "Trainer Hub", sub: "Enable" },
  { icon: CreditCard, label: "Pricing", sub: "Conversion" },
  { icon: TrendingUp, label: "Upgrade", sub: "Impact" },
];

function CellValue({ v }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-forest" />;
  if (v === null) return <Minus className="mx-auto h-4 w-4 text-slate-300" />;
  return <span className="text-sm font-semibold text-body">{v}</span>;
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div data-testid="pricing-page">
      {/* HEADER */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 text-center lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Tag className="justify-center">Pricing</Tag>
          </Reveal>
          <MaskedLines
            className="mt-4 font-display text-4xl font-black leading-[1.06] tracking-tight text-ink md:text-5xl"
            lines={[<>Simple, Transparent</>, <><span className="text-forest">Plans.</span></>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-body">
              Empower your sustainability journey with tools designed for every scale, from individual
              educators to global enterprises.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-mist p-1.5" data-testid="billing-toggle">
              <button
                type="button"
                data-testid="billing-toggle-monthly"
                onClick={() => setYearly(false)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${!yearly ? "bg-navy text-white shadow" : "text-slate-500 hover:text-ink"}`}
              >
                Monthly
              </button>
              <button
                type="button"
                data-testid="billing-toggle-yearly"
                onClick={() => setYearly(true)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${yearly ? "bg-forest text-white shadow" : "text-slate-500 hover:text-ink"}`}
              >
                Yearly
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${yearly ? "bg-white/20 text-white" : "bg-forest-light text-forest-dark"}`}>
                  Save 20%
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIERS */}
      <section className="bg-mist px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => {
            const price = yearly ? t.yearly : t.monthly;
            const dark = t.popular;
            return (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <div
                  data-testid={`pricing-tier-${t.name.toLowerCase()}`}
                  className={`relative flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                    dark
                      ? "bg-navy text-white shadow-[0_40px_80px_-30px_rgba(11,18,32,0.5)] lg:-my-4 lg:py-12"
                      : "border border-slate-200 bg-white hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]"
                  }`}
                >
                  {dark && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`font-display text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{t.name}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-body"}`}>{t.blurb}</p>
                  <div className="mt-7 flex h-16 items-end">
                    {price ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${t.name}-${yearly}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span className={`font-display text-5xl font-black tracking-tight ${dark ? "text-white" : "text-ink"}`}>
                            {price}€
                          </span>
                          <span className={`ml-1 text-sm font-semibold ${dark ? "text-slate-400" : "text-slate-500"}`}>
                            /mo {yearly ? "billed annually" : "billed monthly"}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <span className={`font-display text-5xl font-black tracking-tight ${dark ? "text-white" : "text-ink"}`}>Custom</span>
                    )}
                  </div>
                  <ul className="mt-7 flex-1 space-y-3.5">
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm font-medium ${dark ? "text-slate-300" : "text-body"}`}>
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dark ? "bg-forest/20 text-leaf" : "bg-forest-light text-forest"}`}>
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink
                      to={t.to}
                      variant={dark ? "primary" : "outline"}
                      testid={`pricing-cta-${t.name.toLowerCase()}`}
                      className="w-full"
                    >
                      {t.cta}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* HOW IT ALL CONNECTS */}
      <section className="bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4" data-testid="pricing-connects-strip">
              {CONNECTS.map((c, i) => (
                <div key={c.label} className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-light text-forest">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-3 text-sm font-extrabold text-ink">{c.label}</span>
                  <span className="text-xs font-semibold text-slate-400">{c.sub}</span>
                  {i < 3 && <span className="absolute -right-3 top-1/2 hidden h-[2px] w-6 -translate-y-1/2 bg-slate-200 md:block" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="bg-white px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <SectionHead center tag="Compare Plans" title={<>Every feature, <span className="text-forest">side by side.</span></>} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200" data-testid="compare-table">
              <table className="w-full min-w-[640px] border-collapse bg-white text-left">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider">Trainer</th>
                    <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-leaf">Professional</th>
                    <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r, i) => (
                    <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-mist/60"}>
                      <td className="px-6 py-4 text-sm font-bold text-ink">{r.label}</td>
                      {r.values.map((v, j) => (
                        <td key={j} className="px-6 py-4 text-center">
                          <CellValue v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHead
              tag="FAQ"
              title={<>Questions, <span className="text-forest">answered.</span></>}
              sub="Everything trainers and L&D teams usually ask before choosing a plan."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3" data-testid="pricing-faq-accordion">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="rounded-2xl border border-slate-200 bg-white px-6">
                  <AccordionTrigger data-testid={`faq-trigger-${i}`} className="py-5 text-left font-display text-base font-bold tracking-tight text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-body">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CUSTOM SERVICES CALLOUT */}
      <section className="bg-white px-6 py-20 lg:px-10">
        <Reveal className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy p-8 md:flex-row md:items-center md:p-10" data-testid="pricing-services-callout">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-white">Need custom services instead?</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                Need your own PowerPoint content converted, an existing course fixed, or your LMS properly
                configured? That's a separate, custom-quoted service.
              </p>
            </div>
            <ArrowLink to="/solutions/services" dark testid="pricing-services-link">See eLearning Services</ArrowLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
