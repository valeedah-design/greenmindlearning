import { useRef } from "react";
import { EASE, Reveal } from "@/components/site/Motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Tag, SoonPill, SectionHead } from "@/components/site/ui";

const C = 300;

const TOKENS = [
  { label: "Goals", s1: [120, 120], s2: [300, 170], s4: [160, 244], s5: [300, 185] },
  { label: "People", s1: [470, 100], s2: [413, 235], s4: [160, 272], s5: [400, 242] },
  { label: "Challenges", s1: [90, 320], s2: [413, 365], s4: [160, 300], s5: [400, 358] },
  { label: "Data", s1: [500, 300], s2: [300, 430], s4: [330, 350], s5: [300, 415], deco: "play" },
  { label: "Sustainability", s1: [180, 480], s2: [187, 365], s4: [460, 240], s5: [200, 358], deco: "pulse" },
  { label: "Knowledge", s1: [430, 470], s2: [187, 235], s4: [460, 300], s5: [200, 242], deco: "pulse" },
];

const CUSTOMS = [
  { label: "Policies", from: [70, 70] },
  { label: "Terminology", from: [530, 90] },
  { label: "Priorities", from: [80, 530] },
  { label: "Processes", from: [520, 510] },
];

const LOOP_LABELS = ["UNDERSTAND", "DESIGN", "CUSTOMISE", "EXPERIENCE", "MEASURE", "IMPROVE"];

const KP = [0, 0.22, 0.6, 0.68, 0.8, 0.88, 1];

function Token({ t, p, i, frameVis }) {
  const x = useTransform(p, KP, [t.s1[0], t.s2[0], t.s2[0], t.s4[0], t.s4[0], t.s5[0], t.s5[0]]);
  const y = useTransform(p, KP, [t.s1[1], t.s2[1], t.s2[1], t.s4[1], t.s4[1], t.s5[1], t.s5[1]]);
  const fill = useTransform(p, [0.45, 0.56], ["#1F293D", "#177A3B"]);
  const stroke = useTransform(p, [0.45, 0.56], ["rgba(255,255,255,0.14)", "rgba(156,210,75,0.6)"]);
  return (
    <motion.g style={{ x, y }}>
      <motion.g
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
      >
        <motion.circle r="26" style={{ fill, stroke }} strokeWidth="1.5" />
        {t.deco === "play" && (
          <motion.g style={{ opacity: frameVis }}>
            <polygon points="-7,-9 -7,9 11,0" fill="#9CD24B" />
          </motion.g>
        )}
        {t.deco === "pulse" && (
          <motion.g style={{ opacity: frameVis }}>
            <motion.circle
              r="30"
              fill="none"
              stroke="#9CD24B"
              strokeWidth="1.5"
              animate={{ r: [30, 48], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
            />
          </motion.g>
        )}
        <text y="46" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.5" className="fill-slate-400">
          {t.label}
        </text>
      </motion.g>
    </motion.g>
  );
}

function CustomToken({ c, p }) {
  const x = useTransform(p, [0.44, 0.58], [c.from[0], C]);
  const y = useTransform(p, [0.44, 0.58], [c.from[1], C]);
  const opacity = useTransform(p, [0.42, 0.48, 0.55, 0.62], [0, 1, 1, 0]);
  const scale = useTransform(p, [0.44, 0.58], [1, 0.25]);
  return (
    <motion.g style={{ x, y, opacity, scale }}>
      <rect x="-54" y="-16" width="108" height="32" rx="16" fill="#177A3B" stroke="rgba(156,210,75,0.55)" />
      <text y="4" textAnchor="middle" fontSize="11" fontWeight="800" className="fill-white">
        {c.label}
      </text>
    </motion.g>
  );
}

function HubLabel({ l, p }) {
  const [a, b] = l.range;
  const opacity = useTransform(p, [a, a + 0.03, b - 0.03, b], [0, 1, 1, b >= 1 ? 1 : 0]);
  return (
    <motion.text y="64" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="2.5" fill="#9CD24B" style={{ opacity }}>
      {l.t}
    </motion.text>
  );
}

const HUB_LABELS = [
  { t: "YOUR CHALLENGE", range: [0.2, 0.43] },
  { t: "YOUR CONTEXT", range: [0.47, 0.63] },
  { t: "YOUR EXPERIENCE", range: [0.67, 0.83] },
  { t: "YOUR INSIGHTS", range: [0.87, 1.01] },
];

function SystemVisual({ p }) {
  const hubOp = useTransform(p, [0.16, 0.25], [0, 1]);
  const hubScale = useTransform(p, [0.16, 0.28], [0.4, 1]);
  const lineOp = useTransform(p, [0.2, 0.28, 0.56, 0.64, 0.88, 0.94], [0, 1, 1, 0, 0, 1]);
  const branchOp = useTransform(p, [0.3, 0.37, 0.45, 0.52], [0, 1, 1, 0]);
  const spread = useTransform(p, [0.3, 0.4], [0, 1]);
  const learnX = useTransform(spread, (v) => C + (140 - C) * v);
  const expX = useTransform(spread, (v) => C + (460 - C) * v);
  const frameVis = useTransform(p, [0.64, 0.72, 0.8, 0.86], [0, 1, 1, 0]);
  const dotsOp = useTransform(p, [0.86, 0.93], [0, 1]);
  const ringOp = useTransform(p, [0.89, 0.96], [0, 1]);

  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" data-testid="customize-visual" aria-hidden="true">
      {TOKENS.map((t, i) => (
        <motion.line
          key={`ln-${i}`}
          x1={C} y1={C} x2={t.s2[0]} y2={t.s2[1]}
          stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="3 7"
          style={{ opacity: lineOp }}
        />
      ))}

      <motion.line x1="178" y1={C} x2="258" y2={C} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 6" style={{ opacity: branchOp }} />
      <motion.line x1="342" y1={C} x2="422" y2={C} stroke="rgba(156,210,75,0.5)" strokeDasharray="4 6" style={{ opacity: branchOp }} />
      <motion.g style={{ x: learnX, y: C, opacity: branchOp }}>
        <rect x="-70" y="-30" width="140" height="60" rx="14" fill="#111C30" stroke="rgba(255,255,255,0.16)" />
        <text y="-2" textAnchor="middle" fontSize="13" fontWeight="800" className="fill-white">LEARN</text>
        <text y="16" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" className="fill-slate-400">E-LEARNING</text>
      </motion.g>
      <motion.g style={{ x: expX, y: C, opacity: branchOp }}>
        <rect x="-70" y="-30" width="140" height="60" rx="14" fill="#0C4A28" stroke="#9CD24B" strokeOpacity="0.7" />
        <text y="-2" textAnchor="middle" fontSize="13" fontWeight="800" className="fill-white">EXPERIENCE</text>
        <text y="16" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#9CD24B">SIMULATION</text>
      </motion.g>

      {CUSTOMS.map((c) => (
        <CustomToken key={c.label} c={c} p={p} />
      ))}

      <motion.g style={{ opacity: frameVis }}>
        <rect x="90" y="180" width="420" height="240" rx="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
        <rect x="120" y="206" width="140" height="12" rx="6" fill="#9CD24B" opacity="0.7" />
        <rect x="200" y="240" width="230" height="9" rx="4.5" fill="rgba(255,255,255,0.1)" />
        <rect x="200" y="268" width="180" height="9" rx="4.5" fill="rgba(255,255,255,0.1)" />
        <rect x="200" y="296" width="205" height="9" rx="4.5" fill="rgba(255,255,255,0.1)" />
        <text x="330" y="396" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="2" className="fill-slate-500">SCENARIO · DECIDE · PRACTISE</text>
        <rect x="120" y="404" width="360" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        <motion.rect
          x="120" y="404" height="8" rx="4" fill="#9CD24B"
          animate={{ width: [0, 360] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      <motion.g style={{ opacity: dotsOp }}>
        {TOKENS.map((t, i) => (
          <motion.g key={`dot-${i}`} style={{ x: t.s5[0], y: t.s5[1] }}>
            <motion.circle
              r="4.5" fill="#9CD24B"
              animate={{ x: [0, C - t.s5[0]], y: [0, C - t.s5[1]], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.28, ease: "easeIn" }}
            />
          </motion.g>
        ))}
      </motion.g>

      <motion.g style={{ opacity: ringOp }}>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle cx={C} cy={C} r="205" fill="none" stroke="rgba(156,210,75,0.25)" strokeWidth="1" strokeDasharray="2 8" />
          {LOOP_LABELS.map((l, i) => {
            const a = (i / LOOP_LABELS.length) * Math.PI * 2 - Math.PI / 2;
            const lx = C + Math.cos(a) * 205;
            const ly = C + Math.sin(a) * 205;
            return (
              <motion.g
                key={l}
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                style={{ transform: `translate(${lx}px, ${ly}px)`, transformOrigin: "0px 0px" }}
              >
                <circle r="4.5" fill="#177A3B" stroke="#9CD24B" strokeWidth="1" />
                <text y="-13" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="2" className="fill-slate-400">
                  {l}
                </text>
              </motion.g>
            );
          })}
        </motion.g>
      </motion.g>

      {TOKENS.map((t, i) => (
        <Token key={t.label} t={t} p={p} i={i} frameVis={frameVis} />
      ))}

      <motion.g style={{ x: C, y: C, opacity: hubOp, scale: hubScale }}>
        <motion.circle
          r="40" fill="none" stroke="#9CD24B" strokeWidth="1"
          animate={{ r: [40, 56], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle r="38" fill="#0C4A28" stroke="#177A3B" strokeWidth="2" />
        <path d="M0 15 C -9 6, -11 -5, -7 -16 C 0 -9, 3 3, 0 15 Z" fill="#9CD24B" />
        <path d="M2 15 C 11 6, 13 -5, 9 -16 C 2 -9, -1 3, 2 15 Z" fill="#2E8540" />
        {HUB_LABELS.map((l) => (
          <HubLabel key={l.t} l={l} p={p} />
        ))}
      </motion.g>
    </svg>
  );
}

function StageCopy({ p, range, testid, children }) {
  const [a, b] = range;
  const first = a === 0;
  const last = b >= 1;
  const opacity = useTransform(
    p,
    [a, a + 0.05, last ? 1 : b - 0.05, last ? 1 : b - 0.005],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );
  const y = useTransform(p, [a, a + 0.05], [first ? 0 : 26, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center" data-testid={testid}>
      {children}
    </motion.div>
  );
}

const stageTitle = "font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl text-balance";
const stageBody = "mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base";

export default function CustomizeJourney() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const railFill = useTransform(p, [0, 1], [0, 1]);

  return (
    <section className="bg-navy" data-testid="customize-section">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-32">
        <SectionHead
          center
          dark
          tag="Our Approach"
          title={<>Learning designed around <span className="text-leaf">you.</span></>}
          sub="From understanding your challenges to creating measurable learning experiences, we customise every stage around your organisation."
        />
        <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
          Scroll — watch a challenge become a learning experience
        </p>
      </div>

      <div ref={ref} className="relative" style={{ height: "520vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:px-10">
            {/* STAGE COPY */}
            <div className="relative order-2 h-[44vh] lg:order-1 lg:h-[68vh]">
              <div className="absolute -left-1 top-1/2 hidden h-56 -translate-y-1/2 lg:block">
                <div className="relative h-full w-px bg-white/10">
                  <motion.div className="absolute left-0 top-0 w-px origin-top bg-leaf" style={{ height: "100%", scaleY: railFill }} />
                </div>
              </div>

              <StageCopy p={p} range={[0, 0.2]} testid="customize-stage-1">
                <Tag dark>Stage 01 — Understand</Tag>
                <h3 className={`mt-4 ${stageTitle}`}>Start with your organisation.</h3>
                <p className={stageBody}>We understand your sustainability goals, people, challenges, existing knowledge and organisational context.</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">We identify what your learners need to know, understand and apply.</p>
              </StageCopy>

              <StageCopy p={p} range={[0.2, 0.4]} testid="customize-stage-2">
                <Tag dark>Stage 02 — Design</Tag>
                <h3 className={`mt-4 ${stageTitle}`}>Choose the right way to learn.</h3>
                <p className={stageBody}>We translate your needs into clear learning objectives and select the most effective learning approach.</p>
                <div className="mt-5 grid max-w-md gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-navy-line bg-navy-card p-4">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-white">E-Learning</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Structured digital modules, interactive content, activities and assessments.</p>
                  </div>
                  <div className="rounded-xl border border-leaf/40 bg-forest-dark p-4">
                    <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white">Simulation <SoonPill /></p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">Realistic scenarios where learners make decisions, solve problems and experience consequences.</p>
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold text-leaf">These approaches can work independently or together.</p>
              </StageCopy>

              <StageCopy p={p} range={[0.4, 0.6]} testid="customize-stage-3">
                <Tag dark>Stage 03 — Customise</Tag>
                <h3 className={`mt-4 ${stageTitle}`}>Make learning relevant to your reality.</h3>
                <p className={stageBody}>We adapt the experience around your organisation's:</p>
                <div className="mt-4 flex max-w-md flex-wrap gap-2">
                  {["Sustainability priorities", "Terminology", "Policies", "Processes", "Real-world challenges", "Target audience"].map((chip) => (
                    <span key={chip} className="rounded-full border border-leaf/30 bg-forest/15 px-3.5 py-1.5 text-xs font-bold text-leaf">
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm font-bold text-white">No generic training. <span className="text-leaf">Learning designed around your organisation.</span></p>
              </StageCopy>

              <StageCopy p={p} range={[0.6, 0.8]} testid="customize-stage-4">
                <Tag dark>Stage 04 — Experience</Tag>
                <h3 className={`mt-4 ${stageTitle}`}>Turn learning into action.</h3>
                <p className={stageBody}>We build and deliver an engaging digital learning experience where people don't simply consume information — they interact, explore, practise and apply what they learn.</p>
                <p className="mt-5 text-sm font-bold text-leaf">This is where content becomes an experience.</p>
              </StageCopy>

              <StageCopy p={p} range={[0.8, 1]} testid="customize-stage-5">
                <Tag dark>Stage 05 — Measure</Tag>
                <h3 className={`mt-4 ${stageTitle}`}>Learn from the learning.</h3>
                <p className={stageBody}>We measure engagement, learning progress, assessment results and simulation performance where applicable.</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">The insights help improve the learning experience and create a continuous cycle:</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {["LEARN", "APPLY", "MEASURE", "IMPROVE"].map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="rounded-full bg-forest px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white">{s}</span>
                      {i < 3 && <ArrowRight className="h-3.5 w-3.5 text-leaf" />}
                    </span>
                  ))}
                </div>
              </StageCopy>
            </div>

            {/* EVOLVING SYSTEM */}
            <div className="relative order-1 h-[38vh] lg:order-2 lg:h-[76vh]">
              <SystemVisual p={p} />
            </div>
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-8 text-center lg:px-10 lg:pb-32">
        <Reveal>
          <h3 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl text-balance">
            Your sustainability goals are unique.
            <span className="block text-leaf">Your learning experience should be too.</span>
          </h3>
          <div className="mt-9">
            <ButtonLink to="/about-contact" variant="primary" testid="customize-cta-button" arrow className="px-8 py-4">
              Build your learning experience
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
