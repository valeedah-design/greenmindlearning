import { Reveal } from "@/components/site/Motion";
import {
  ArrowRight,
  Target,
  Users,
  AlertTriangle,
  Database,
  Leaf,
  BookOpen,
  Monitor,
  Sparkles,
  FileEdit,
  Tag as TagIcon,
  PlayCircle,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { ButtonLink, Tag, SoonPill, SectionHead } from "@/components/site/ui";

const INPUT_ITEMS = [
  { label: "Goals", icon: Target },
  { label: "People", icon: Users },
  { label: "Challenges", icon: AlertTriangle },
  { label: "Data", icon: Database },
  { label: "Sustainability", icon: Leaf },
  { label: "Knowledge", icon: BookOpen },
];

const CUSTOMISE_CHIPS = ["Sustainability priorities", "Terminology", "Policies", "Processes", "Real-world challenges", "Target audience"];

const LOOP_STEPS = ["LEARN", "APPLY", "MEASURE", "IMPROVE"];

function VisualCard({ children }) {
  return (
    <div className="flex h-full min-h-[300px] flex-col justify-center rounded-[2rem] border border-navy-line bg-navy-card p-7 sm:p-9 lg:p-10">
      {children}
    </div>
  );
}

function UnderstandVisual() {
  return (
    <VisualCard>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">What we start with</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {INPUT_ITEMS.map(({ label, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-navy-line bg-navy px-3 py-4 text-center">
            <Icon className="h-5 w-5 text-leaf" />
            <span className="text-[11px] font-bold text-slate-300">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <ArrowRight className="h-5 w-5 rotate-90 text-leaf" />
      </div>
      <div className="mt-5 rounded-xl border border-leaf/40 bg-forest-dark px-5 py-4 text-center">
        <p className="text-xs font-extrabold uppercase tracking-wider text-white">Your Organisation's Learning Blueprint</p>
      </div>
    </VisualCard>
  );
}

function DesignVisual() {
  return (
    <VisualCard>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Two ways to learn</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-navy-line bg-navy p-5">
          <Monitor className="h-6 w-6 text-slate-300" />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-white">E-Learning</p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Structured digital modules, interactive content, activities and assessments.</p>
        </div>
        <div className="rounded-xl border border-leaf/40 bg-forest-dark p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-leaf" />
            <SoonPill />
          </div>
          <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-white">Simulation</p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">Realistic scenarios where learners make decisions and experience consequences.</p>
        </div>
      </div>
      <p className="mt-5 text-center text-xs font-bold text-leaf">Used independently or together — whatever fits your goals.</p>
    </VisualCard>
  );
}

function CustomiseVisual() {
  return (
    <VisualCard>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-leaf/40 bg-forest-dark">
        <FileEdit className="h-6 w-6 text-leaf" />
      </div>
      <p className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Stamped with your context</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {CUSTOMISE_CHIPS.map((chip) => (
          <span key={chip} className="flex items-center gap-1.5 rounded-full border border-leaf/30 bg-forest/15 px-3.5 py-1.5 text-xs font-bold text-leaf">
            <TagIcon className="h-3 w-3" />
            {chip}
          </span>
        ))}
      </div>
    </VisualCard>
  );
}

function ExperienceVisual() {
  return (
    <VisualCard>
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-navy-line bg-navy p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Module 03 · Live</span>
          <PlayCircle className="h-5 w-5 text-leaf" />
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
          <div className="h-2.5 w-full rounded-full bg-white/10" />
          <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
        </div>
        <p className="mt-5 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">Scenario · Decide · Practise</p>
        <div className="mt-3 h-2 w-full rounded-full bg-white/10">
          <div className="h-2 w-2/3 rounded-full bg-leaf" />
        </div>
      </div>
      <p className="mt-6 text-center text-xs font-bold text-leaf">This is where content becomes an experience.</p>
    </VisualCard>
  );
}

function MeasureVisual() {
  return (
    <VisualCard>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-leaf/40 bg-forest-dark">
        <BarChart3 className="h-6 w-6 text-leaf" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {LOOP_STEPS.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-full bg-forest px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white">{s}</span>
            {i < LOOP_STEPS.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-leaf" />}
          </span>
        ))}
        <RefreshCw className="ml-1 h-4 w-4 text-slate-500" />
      </div>
      <p className="mt-6 text-center text-xs font-bold text-slate-300">A continuous cycle that keeps improving the learning experience.</p>
    </VisualCard>
  );
}

const STAGES = [
  {
    key: "understand",
    tag: "Stage 01 — Understand",
    title: "Start with your organisation.",
    body: [
      "We understand your sustainability goals, people, challenges, existing knowledge and organisational context.",
      "We identify what your learners need to know, understand and apply.",
    ],
    Visual: UnderstandVisual,
  },
  {
    key: "design",
    tag: "Stage 02 — Design",
    title: "Choose the right way to learn.",
    body: ["We translate your needs into clear learning objectives and select the most effective learning approach."],
    Visual: DesignVisual,
  },
  {
    key: "customise",
    tag: "Stage 03 — Customise",
    title: "Make learning relevant to your reality.",
    body: ["We adapt the experience around your organisation's priorities, terminology, policies, processes and real-world challenges."],
    footer: (
      <p className="mt-5 text-sm font-bold text-white">
        No generic training. <span className="text-leaf">Learning designed around your organisation.</span>
      </p>
    ),
    Visual: CustomiseVisual,
  },
  {
    key: "experience",
    tag: "Stage 04 — Experience",
    title: "Turn learning into action.",
    body: [
      "We build and deliver an engaging digital learning experience where people don't simply consume information — they interact, explore, practise and apply what they learn.",
    ],
    footer: <p className="mt-5 text-sm font-bold text-leaf">This is where content becomes an experience.</p>,
    Visual: ExperienceVisual,
  },
  {
    key: "measure",
    tag: "Stage 05 — Measure",
    title: "Learn from the learning.",
    body: [
      "We measure engagement, learning progress, assessment results and simulation performance where applicable.",
      "The insights help improve the learning experience and create a continuous cycle.",
    ],
    Visual: MeasureVisual,
  },
];

const stageTitle = "font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl text-balance";
const stageBody = "mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base";

export default function CustomizeJourney() {
  return (
    <section className="bg-navy" data-testid="customize-section">
      <div className="mx-auto max-w-[1400px] px-6 pb-4 pt-24 lg:px-10 lg:pt-32">
        <SectionHead
          center
          dark
          tag="Our Approach"
          title={<>Learning designed around <span className="text-leaf">you.</span></>}
          sub="From understanding your challenges to creating measurable learning experiences, we customise every stage around your organisation."
        />
      </div>

      <div className="mx-auto max-w-[1400px] space-y-16 px-6 py-16 lg:space-y-24 lg:px-10 lg:py-24">
        {STAGES.map((stage, i) => {
          const Visual = stage.Visual;
          return (
            <Reveal key={stage.key}>
              <div
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                data-testid={`customize-stage-${i + 1}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Tag dark>{stage.tag}</Tag>
                  <h3 className={`mt-4 ${stageTitle}`}>{stage.title}</h3>
                  {stage.body.map((para) => (
                    <p key={para} className={stageBody}>
                      {para}
                    </p>
                  ))}
                  {stage.footer}
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <Visual />
                </div>
              </div>
            </Reveal>
          );
        })}
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
