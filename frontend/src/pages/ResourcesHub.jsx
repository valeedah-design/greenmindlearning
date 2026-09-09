import { useState } from "react";
import { BookOpen, Check, CalendarDays } from "lucide-react";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, Tag, SectionHead, scrollToId } from "@/components/site/ui";
import { GUIDES, INSIGHTS, TINTS } from "@/data/content";

const TABS = [
  { label: "Trainer Guides", target: "guides", testid: "resources-tab-guides" },
  { label: "Templates & Kits", target: "guides", testid: "resources-tab-templates" },
  { label: "Industry Insights", target: "insights", testid: "resources-tab-insights" },
];

export default function ResourcesHub() {
  const [active, setActive] = useState("Trainer Guides");

  return (
    <div data-testid="resources-page">
      {/* HEADER */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <Tag>Resources Hub</Tag>
          </Reveal>
          <MaskedLines
            className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.06] tracking-tight text-ink md:text-5xl"
            lines={[<>Trainer Excellence &amp;</>, <><span className="text-forest">Industry Insights.</span></>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-body">
              Empowering trainers with the tools, templates, and high-level insights needed to deliver
              world-class sustainability education.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink onClick={() => scrollToId("guides")} variant="primary" testid="resources-explore-tools-button" arrow>
                Explore Trainer Tools
              </ButtonLink>
              <ButtonLink onClick={() => scrollToId("insights")} variant="outline" testid="resources-read-insights-button">
                Read Industry Insights
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <div className="flex flex-wrap gap-2.5">
              {TABS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  data-testid={t.testid}
                  onClick={() => { setActive(t.label); scrollToId(t.target); }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    active === t.label
                      ? "bg-forest text-white shadow-[0_8px_20px_-8px_rgba(30,142,74,0.6)]"
                      : "bg-mist text-slate-500 hover:bg-forest-light hover:text-forest-dark"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURE PANEL */}
      <section className="bg-white px-6 py-16 lg:px-10">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-14 md:px-14" data-testid="resources-feature-panel">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-forest/20 blur-[100px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <Tag dark>Why It Works</Tag>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl text-balance">
                  How our resources bridge the gap between material and delivery.
                </h2>
              </div>
              <ul className="flex flex-col justify-center space-y-5">
                {[
                  ["Deep Integration", "every guide is mapped directly to a Learning Material module."],
                  ["Action-Ready", "templates are pre-filled with industry data from our Topic Explorer."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/15 text-leaf">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-300">
                      <span className="font-bold text-white">{t}:</span> {d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PEDAGOGICAL GUIDES */}
      <section id="guides" className="bg-mist px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="Pedagogical Guides"
              title={<>Teach it so it <span className="text-forest">sticks.</span></>}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GUIDES.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]" data-testid={`guide-card-${i}`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${TINTS[i % TINTS.length].soft} ${TINTS[i % TINTS.length].text} transition-transform duration-300 group-hover:scale-110`}>
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{g.desc}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{g.tag}</span>
                    <span className="text-xs font-semibold text-slate-400">{g.meta}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div id="insights">
            <Reveal>
              <SectionHead tag="Industry Insights" title={<>What's shifting in <span className="text-forest">ESG.</span></>} />
            </Reveal>
            <div className="mt-10 space-y-6">
              {INSIGHTS.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.1}>
                  <article className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)] sm:flex-row" data-testid={`insight-card-${i}`}>
                    <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
                      <img src={a.img} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="py-1">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-forest-light px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-dark">{a.tag}</span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <CalendarDays className="h-3.5 w-3.5" /> {a.date}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-ink">{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">{a.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
