import { motion } from "framer-motion";
import { MousePointerClick, RefreshCw, FileCheck2, Check } from "lucide-react";
import { EASE, Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SoonPill, SectionHead } from "@/components/site/ui";
import CtaBanner from "@/components/site/CtaBanner";

const SORT_CHIPS = [
  { label: "Delivery Fleet", scope: 0, d: 0.8 },
  { label: "Office Power", scope: 1, d: 1.7 },
  { label: "Steel Supply", scope: 2, d: 2.6 },
];

function ScopeSortMini() {
  return (
    <div className="rounded-2xl border border-navy-line bg-navy-card/90 p-5" data-testid="work-mock-scope-sort">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
        </span>
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Live concept motion</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {["Scope 1", "Scope 2", "Scope 3"].map((s, ci) => (
          <div key={s} className="min-h-[104px] rounded-xl border border-dashed border-white/15 bg-white/5 p-2">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-leaf/80">{s}</p>
            <div className="mt-2 space-y-1.5">
              {SORT_CHIPS.filter((c) => c.scope === ci).map((chip) => (
                <motion.div
                  key={chip.label}
                  className="rounded-md border border-forest/40 bg-forest/20 px-2 py-1.5 text-[10px] font-bold text-leaf-light"
                  animate={{ x: [-90, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.7, delay: chip.d, repeat: Infinity, repeatDelay: 2.8, ease: EASE }}
                >
                  {chip.label}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <span>Audit accuracy</span>
          <span className="text-leaf">92%</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-forest to-leaf"
            animate={{ width: ["4%", "92%"] }}
            transition={{ duration: 2.2, delay: 1, repeat: Infinity, repeatDelay: 2.8, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

const LOOP_MOVES = ["Recycled aluminum", "Repair program", "Take-back scheme"];

function LoopMini() {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex items-center gap-6 rounded-2xl border border-navy-line bg-navy-card/90 p-5" data-testid="work-mock-closing-loop">
      <div className="relative shrink-0">
        <svg viewBox="0 0 120 120" className="h-28 w-28">
          <defs>
            <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#177A3B" />
              <stop offset="1" stopColor="#9CD24B" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60" cy="60" r={R}
            stroke="url(#loopGrad)" strokeWidth="10" fill="none" strokeLinecap="round"
            strokeDasharray={C}
            animate={{ strokeDashoffset: [C, C * 0.28] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: EASE }}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-black text-white">72%</span>
          <span className="text-[8px] font-bold uppercase tracking-widest text-leaf">waste cut</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Your redesign moves</p>
        {LOOP_MOVES.map((m, i) => (
          <motion.div
            key={m}
            className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            animate={{ opacity: [0.35, 1, 0.35], borderColor: ["rgba(255,255,255,0.1)", "rgba(156,210,75,0.5)", "rgba(255,255,255,0.1)"] }}
            transition={{ duration: 1.6, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <RefreshCw className="h-3 w-3 text-leaf" />
            <span className="text-[11px] font-bold text-slate-200">{m}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const REPORT_SECTIONS = ["Governance & ethics", "E1 — Climate disclosures", "S1 — Workforce metrics", "Double materiality"];

function ReportMini() {
  return (
    <div className="rounded-2xl border border-navy-line bg-navy-card/90 p-5" data-testid="work-mock-esg-report">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Mock annual disclosure</p>
      <div className="mt-3 space-y-2">
        {REPORT_SECTIONS.map((s, i) => (
          <div key={s} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
            <motion.span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf text-navy"
              animate={{ scale: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.8, repeat: Infinity, repeatDelay: 2.4, ease: EASE }}
            >
              <Check className="h-3 w-3" strokeWidth={3.5} />
            </motion.span>
            <span className="text-[11px] font-bold text-slate-200">{s}</span>
            <motion.span
              className="ml-auto text-[9px] font-extrabold uppercase tracking-wider text-leaf"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.4, delay: 0.75 + i * 0.8, repeat: Infinity, repeatDelay: 2.4 }}
            >
              Complete
            </motion.span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <span>Compliance check</span>
          <span className="text-leaf">Passed</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-forest to-leaf"
            animate={{ width: ["6%", "100%"] }}
            transition={{ duration: 3.4, delay: 0.6, repeat: Infinity, repeatDelay: 1.8, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

const WORKS = [
  {
    id: "scope-sort", icon: MousePointerClick, Mock: ScopeSortMini,
    title: "Scope Sort", tagline: "GHG Protocol, made tactile.",
    desc: "Learners drag a real company's emissions sources into Scope 1, 2, and 3 — and watch their audit accuracy move with every decision.",
    bullets: ["Classify 12 real emissions sources", "Instant right/wrong feedback with the 'why'", "Ends in a downloadable audit checklist"],
  },
  {
    id: "closing-the-loop", icon: RefreshCw, Mock: LoopMini,
    title: "Closing the Loop", tagline: "Circular economy, playable.",
    desc: "Redesign a product's supply chain — swap materials, add repair and take-back loops — and see your waste-reduction score respond in real time.",
    bullets: ["Trade-off decisions, not quizzes", "Live waste-reduction scoring", "Ends in a mitigation plan deliverable"],
  },
  {
    id: "esg-report", icon: FileCheck2, Mock: ReportMini,
    title: "ESG Reporting Simulator", tagline: "Disclosure without the dread.",
    desc: "Complete a mock annual ESG disclosure section by section, with compliance feedback the moment each part lands.",
    bullets: ["Mapped to real CSRD/GRI structure", "Section-level compliance feedback", "Ends in a draft disclosure you could actually use"],
  },
];

export default function ConceptPreview() {
  return (
    <div data-testid="concept-preview-page">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy px-6 py-24 lg:px-10 lg:py-32">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-forest/20 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-leaf/10 blur-[130px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Tag dark>Concept Showcase — Coming Soon</Tag>
          </motion.div>
          <MaskedLines
            className="mt-5 max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            lines={[
              "See the simulations we're building —",
              <><span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">in motion.</span></>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300"
          >
            Nothing here is a finished product — these are honest, animated concept previews of the three
            simulations on our near-term roadmap, so you can see the work before it ships.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <ButtonLink to="/simulations#waitlist" variant="primary" testid="preview-waitlist-button" arrow>
              Join the Waitlist
            </ButtonLink>
            <ButtonLink to="/simulations" variant="glass" testid="preview-back-button">
              Back to Simulations
            </ButtonLink>
          </motion.div>
        </div>
      </section>

      {/* VIDEO SLOT */}
      <section className="bg-mist px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <SectionHead
              center
              tag="The Walkthrough"
              title={<>Watch the concept <span className="text-forest">in action.</span></>}
              sub="A first look at Green Mind Simulations — straight from the studio."
            />
          </Reveal>
          <Reveal delay={0.15}>
            <div
              className="relative mt-12 overflow-hidden rounded-[2rem] bg-navy shadow-[0_40px_90px_-40px_rgba(11,18,32,0.55)]"
              data-testid="demo-video-slot"
            >
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                data-testid="demo-video"
              >
                <source src="/videos/walkthrough.webm" type="video/webm" />
                <source src="/videos/walkthrough.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE WORKS */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="The Work So Far"
              title={<>Three concepts, already <span className="text-forest">moving.</span></>}
              sub="Each preview below is animated in code — a taste of how the real simulations will feel, not a static mockup."
            />
          </Reveal>
          <div className="mt-16 space-y-20">
            {WORKS.map((w, i) => (
              <div key={w.id} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20" data-testid={`work-${w.id}`}>
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-[2rem] bg-navy p-8 md:p-10">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-forest/25 blur-[100px]" />
                    <div className="relative">
                      <w.Mock />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-light text-forest">
                      <w.icon className="h-5 w-5" />
                    </span>
                    <SoonPill>Concept</SoonPill>
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{w.title}</h3>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wider text-forest">{w.tagline}</p>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-body">{w.desc}</p>
                  <ul className="mt-6 space-y-3">
                    {w.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm font-medium text-body">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-light text-forest">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <ArrowLink to="/simulations#waitlist" testid={`work-${w.id}-notify-link`}>
                      Notify me when this ships
                    </ArrowLink>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Early Access"
        title="Like what you see? It's only the beginning."
        sub="Join the waitlist and be first inside the real simulations when early access opens."
        primary={{ label: "Join the Waitlist", to: "/simulations#waitlist", testid: "preview-cta-waitlist-button" }}
        secondary={{ label: "Explore Learning Materials", to: "/learning-materials", testid: "preview-cta-materials-button" }}
        testid="preview-final-cta"
      />
    </div>
  );
}
