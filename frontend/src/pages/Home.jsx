import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  FlaskConical, MousePointerClick, Blocks, TrendingUp, Presentation, FileText,
  ClipboardCheck, BookOpen, Video, Cpu, Users, GraduationCap, Building2, Leaf,
  Plug, Wrench, Quote, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import { EASE, Reveal, MaskedLines, CountUp } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SoonPill, SectionHead } from "@/components/site/ui";
import Marquee from "@/components/site/Marquee";
import CtaBanner from "@/components/site/CtaBanner";
import { IMAGES, TINTS } from "@/data/content";

const PILLARS = [
  { n: "01", title: "Concrete", desc: "Grounded in real regulatory frameworks and industry data, not abstract theory." },
  { n: "02", title: "Active", desc: "Learners make decisions and see consequences — productive struggle beats passive reading." },
  { n: "03", title: "Actionable", desc: "Every module ends in a real deliverable: a draft report, an audit checklist, a mitigation plan." },
];

const WHY = [
  { icon: FlaskConical, title: "Science-Backed Content", desc: "Every module is peer-reviewed and updated monthly to reflect the latest climate data and ESG regulations.", soon: false },
  { icon: MousePointerClick, title: "Learn by Doing", desc: "Soon you'll practice real scenarios — carbon audits, ESG reports, circular-economy decisions — inside guided simulations, not just slides.", soon: true },
  { icon: Blocks, title: "Modular Framework", desc: "Plug-and-play materials that fit seamlessly into your existing curriculum or internal training programs.", soon: false },
  { icon: TrendingUp, title: "Built for Scalability", desc: "From individual trainers to global enterprises, our platform scales to your team's needs.", soon: false },
];

const AUDIENCES = [
  { icon: Users, title: "Professional Trainers", desc: "Access ready-to-use slide decks, workshop guides, and assessment tools to deliver premium sustainability training." },
  { icon: TrendingUp, title: "ESG & HR Leaders", desc: "Upskill your workforce with consistent, high-quality learning paths that align with your sustainability goals." },
  { icon: GraduationCap, title: "Education Institutions", desc: "Integrate modern climate science and circular-economy modules into your academic programs." },
  { icon: Building2, title: "Corporate Sustainability Teams", desc: "Run compliance and reporting training at scale with our growing content library." },
];

const FORMATS = [
  { icon: Presentation, label: "Slide Decks" },
  { icon: FileText, label: "Case Studies" },
  { icon: ClipboardCheck, label: "Assessments" },
  { icon: BookOpen, label: "Workbooks" },
  { icon: Video, label: "Video Guides" },
  { icon: Cpu, label: "Interactive Simulations", soon: true },
];

const HUB_TILES = [
  { title: "Climate & Energy", sub: "Net Zero, Renewables, Carbon Accounting", img: IMAGES.windTurbines },
  { title: "Circular Economy", sub: "Waste Reduction, Life Cycle Assessment", img: IMAGES.greenAerial },
  { title: "ESG Governance", sub: "Ethics, Reporting, Policy, Disclosure", img: IMAGES.paperwork },
  { title: "Biodiversity", sub: "Ecosystem Services, Nature Positive", img: IMAGES.forestSun },
];

const STEPS = [
  { n: "1", title: "Explore Hub", desc: "Discover topics and materials in our library." },
  { n: "2", title: "Preview & Select", desc: "Review materials before choosing." },
  { n: "3", title: "Trainer Prep", desc: "Use guides and templates to customize delivery." },
  { n: "4", title: "Deliver & Impact", desc: "Train your audience and track engagement." },
];

const SERVICES = [
  { icon: Presentation, title: "PPT to eLearning", desc: "Turn your slide decks into interactive, trackable courses.", to: "/solutions/services#ppt", testid: "home-service-ppt-link" },
  { icon: Wrench, title: "eLearning Troubleshooting", desc: "Fix broken courses, tracking issues, and SCORM errors.", to: "/solutions/services#troubleshooting", testid: "home-service-fix-link" },
  { icon: Plug, title: "LMS Integration", desc: "Configure your LMS to correctly capture participant data.", to: "/solutions/services#lms", testid: "home-service-lms-link" },
];

const HERO_SLIDES = [
  {
    tag: "Redefining Sustainability Education",
    visual: "sim",
    lines: [
      <>We're taking <span className="text-leaf">sustainability</span></>,
      "learning from slides",
      <>to <span className="text-amber-300">simulations.</span></>,
    ],
    sub: "Green Mind Learning is building the first simulation-based platform for ESG and sustainability training — turning passive content into hands-on practice. Explore our current library today, and be first in line as simulations launch.",
    primary: { label: "Get Early Access to Simulations", to: "/simulations#waitlist", testid: "hero-early-access-button" },
    secondary: { label: "Explore Learning Materials", to: "/learning-materials", testid: "hero-explore-materials-button" },
  },
  {
    tag: "The Learning Materials Library",
    lines: [
      "Advanced e-learning",
      <>materials for <span className="text-leaf">sustainability</span></>,
      "professionals.",
    ],
    sub: "128+ expert-built modules — slide decks, case studies, workbooks, assessments, and video guides. Peer-reviewed, updated monthly, and ready to plug straight into your curriculum.",
    img: IMAGES.solarPanels,
    alt: "Rows of solar panels under a bright sky",
    primary: { label: "Explore Learning Materials", to: "/learning-materials", testid: "hero-materials-button" },
    secondary: { label: "View Pricing", to: "/pricing", testid: "hero-pricing-button" },
  },
  {
    tag: "Start Today",
    lines: [
      "Your team could be",
      <>training <span className="text-leaf">smarter</span></>,
      "by next week.",
    ],
    sub: "Start a 14-day free trial — full library access, no credit card required. Plans from 49€/mo, cancel anytime.",
    img: IMAGES.leafSun,
    alt: "Sunlight filtering through fresh green leaves",
    primary: { label: "Start Free Trial", to: "/pricing", testid: "hero-trial-button" },
    secondary: { label: "Talk to Sales", to: "/about-contact", testid: "hero-sales-button" },
    proof: "500+ trainers · 50,000+ learners · 24% avg. score lift",
  },
];

const SIM_CHIPS = [
  { label: "Delivery Fleet", scope: 1, delay: 1.2 },
  { label: "Office Electricity", scope: 2, delay: 2.4 },
  { label: "Purchased Steel", scope: 3, delay: 3.6 },
  { label: "Business Flights", scope: 3, delay: 4.8 },
];

function SimVisual() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative rounded-2xl border border-forest/30 bg-navy-card/90 p-6 shadow-[0_40px_90px_-30px_rgba(30,142,74,0.45)] backdrop-blur"
      data-testid="hero-sim-visual"
    >
      <motion.div
        className="absolute -right-3 -top-3 z-10 rounded-full bg-forest px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg"
        animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -6] }}
        transition={{ duration: 2.2, delay: 2.4, repeat: Infinity, repeatDelay: 4.2 }}
      >
        +10 Correctly classified
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
          </span>
          <p className="font-display text-sm font-extrabold tracking-tight text-white">Scope Sort</p>
        </div>
        <span className="rounded-full border border-forest/40 bg-forest/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-leaf">
          Concept Preview
        </span>
      </div>
      <p className="mt-1.5 text-xs text-slate-400">Classify each emissions source into the right scope.</p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {["Scope 1", "Scope 2", "Scope 3"].map((s, ci) => (
          <div key={s} className="min-h-[132px] rounded-xl border border-dashed border-white/15 bg-white/5 p-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-leaf/80">{s}</p>
            <div className="mt-2 space-y-2">
              {SIM_CHIPS.filter((c) => c.scope === ci + 1).map((chip) => (
                <motion.div
                  key={chip.label}
                  className="rounded-lg border border-forest/40 bg-forest/20 px-2.5 py-2 text-[11px] font-bold leading-tight text-leaf-light"
                  animate={{ x: [-140, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.7, delay: chip.delay, repeat: Infinity, repeatDelay: 3.8, ease: EASE }}
                >
                  {chip.label}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Audit accuracy</span>
          <span className="text-leaf">92%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-forest to-leaf"
            animate={{ width: ["4%", "92%"] }}
            transition={{ duration: 2.4, delay: 1.4, repeat: Infinity, repeatDelay: 3.2, ease: EASE }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const count = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, index, count]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      data-testid="hero-carousel"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {slide.visual === "sim" ? (
            <div className="absolute inset-0 bg-navy">
              <img
                src="https://media.giphy.com/media/9tA6H1madRvUc/giphy.gif"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/55 to-forest-dark/50" />
              <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-forest/25 blur-[130px]" />
            </div>
          ) : (
            <motion.img
              src={slide.img}
              alt={slide.alt}
              style={{ y: bgY }}
              className="absolute inset-0 h-[120%] w-full scale-110 object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/70 to-forest/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/40" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-10" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className={slide.visual === "sim" ? "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]" : ""}
          >
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <Tag dark>{slide.tag}</Tag>
              </motion.div>
              <MaskedLines
                className="mt-6 max-w-5xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[4.4rem]"
                lines={slide.lines}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg"
              >
                {slide.sub}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <ButtonLink to={slide.primary.to} variant="primary" testid={slide.primary.testid} arrow className="px-7 py-3.5">
                  {slide.primary.label}
                </ButtonLink>
                <ButtonLink to={slide.secondary.to} variant="glass" testid={slide.secondary.testid} className="px-7 py-3.5">
                  {slide.secondary.label}
                </ButtonLink>
              </motion.div>
              {slide.proof && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-7 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-leaf-light/90"
                  data-testid="hero-proof-strip"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                  {slide.proof}
                </motion.p>
              )}
            </div>
            {slide.visual === "sim" && (
              <motion.div
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                className="hidden lg:block"
              >
                <SimVisual />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-6 flex items-center gap-2.5 lg:left-10">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${s.tag}`}
            aria-current={i === index}
            data-testid={`hero-dot-${i}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-12 bg-leaf" : "w-6 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-3 lg:right-10">
        <span className="mr-1 font-display text-xs font-bold tracking-[0.2em] text-white/60" data-testid="hero-slide-indicator">
          0{index + 1} / 0{count}
        </span>
        <button
          type="button"
          onClick={() => setIndex((index - 1 + count) % count)}
          aria-label="Previous slide"
          data-testid="hero-prev-button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:border-forest hover:bg-forest"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % count)}
          aria-label="Next slide"
          data-testid="hero-next-button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:border-forest hover:bg-forest"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="home-page">
      <HeroCarousel />

      <Marquee />

      {/* VISION — manifesto */}
      <section className="bg-navy px-6 py-24 lg:px-10 lg:py-32" data-testid="vision-section">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <Tag dark>The Future of Sustainability Training</Tag>
                <MaskedLines
                  inView
                  as="h2"
                  className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-[2.9rem]"
                  lines={[
                    <>Static content taught people</>,
                    <><span className="text-leaf">about</span> sustainability.</>,
                    <>We're teaching them to <span className="text-leaf">practice</span> it.</>,
                  ]}
                />
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                  Most ESG and sustainability training today is a slide deck or a PDF. Green Mind Learning is
                  building simulation-based modules where learners run a real carbon audit, draft an ESG
                  disclosure, or redesign a supply chain — and see the consequences of their decisions immediately.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-9">
                <div className="flex flex-wrap items-center gap-4">
                  <ButtonLink to="/simulations#waitlist" variant="primary" testid="vision-waitlist-button" arrow>
                    Join the Simulation Waitlist
                  </ButtonLink>
                  <ButtonLink to="/simulations#preview" variant="glass" testid="vision-preview-button">
                    See a Concept Preview
                  </ButtonLink>
                </div>
                <p className="mt-4 text-xs font-semibold text-slate-500">
                  Simulations are in development — join now to get early access.
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.12}>
                  <div className="group flex gap-6 rounded-2xl border border-navy-line bg-navy-card p-6 transition-colors duration-300 hover:border-forest/50 md:p-7">
                    <span className="font-display text-3xl font-black text-forest/60 transition-colors group-hover:text-leaf">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-white">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Why Choose Us"
              title={<>Built for outcomes, not <span className="text-forest">attendance.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${TINTS[i % TINTS.length].soft} ${TINTS[i % TINTS.length].text}`}>
                      <w.icon className="h-6 w-6" />
                    </span>
                    {w.soon && <SoonPill />}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNED FOR THOSE WHO LEAD CHANGE */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <SectionHead
                  tag="Who It's For"
                  title={<>Designed for those who lead <span className="text-forest">change.</span></>}
                />
              </Reveal>
              <div className="mt-10 space-y-7">
                {AUDIENCES.map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.08}>
                    <div className="group flex gap-5">
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                        <a.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold tracking-tight text-ink">{a.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-body">{a.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="clip-frame overflow-hidden">
                  <img src={IMAGES.workshop} alt="Sustainability workshop in progress" className="h-[520px] w-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-8 -left-4 max-w-md rounded-2xl bg-navy p-7 shadow-2xl md:-left-10">
                  <Quote className="h-6 w-6 text-leaf" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    "Green Mind Learning cut our curriculum development time by 70%. The quality of the case
                    studies is unparalleled."
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white">Marcus Thorne</p>
                  <p className="text-xs text-slate-400">Director of Sustainability, Global Corp</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION — before/after */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28" data-testid="before-after-section">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="See It In Action — Coming Soon"
              title={<>The same lesson. A completely different <span className="text-forest">result.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-400">The Old Way</p>
                <div className="mt-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mist text-slate-400">
                    <FileText className="h-6 w-6" />
                  </span>
                  <p className="font-display text-xl font-bold leading-snug tracking-tight text-slate-500 md:text-2xl">
                    A 40-page PDF on greenhouse gas accounting that half your trainees skim and forget.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-navy p-8 md:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-forest/25 blur-[90px]" />
                <div className="flex items-center gap-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-leaf">The Green Mind Way</p>
                  <SoonPill />
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest/15 text-leaf">
                    <Cpu className="h-6 w-6" />
                  </span>
                  <p className="font-display text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                    An interactive carbon-audit simulation where learners classify real emissions data, make
                    trade-off decisions, and see the impact in real time.
                  </p>
                </div>
                <div className="mt-8">
                  <ArrowLink to="/simulations#waitlist" dark testid="before-after-waitlist-link">
                    Join the Waitlist
                  </ArrowLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIVERSE LEARNING FORMATS */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="Diverse Learning Formats"
              title={<>One library. Every format your session <span className="text-forest">needs.</span></>}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FORMATS.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-lg">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${TINTS[i % TINTS.length].soft} ${TINTS[i % TINTS.length].text}`}>
                    <f.icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-bold text-ink">{f.label}</span>
                  {f.soon && <SoonPill />}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <ArrowLink to="/learning-materials" testid="formats-view-all-link">View All Materials</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* KNOWLEDGE HUB */}
      <section className="bg-navy px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="flex flex-col justify-center">
              <Reveal>
                <SectionHead
                  dark
                  tag="Explore the Knowledge Hub"
                  title={<>Four domains. One <span className="text-leaf">growing</span> library.</>}
                  sub="Deep, expert-built coverage across the topics that define modern sustainability work — from carbon accounting to nature-positive strategy."
                />
                <div className="mt-8">
                  <ButtonLink to="/learning-materials" variant="glass" testid="hub-topic-explorer-button" arrow>
                    Topic Explorer
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {HUB_TILES.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="group relative h-52 overflow-hidden rounded-2xl" data-testid={`hub-tile-${i}`}>
                    <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                    <div className="absolute bottom-0 p-5">
                      <h3 className="font-display text-lg font-bold tracking-tight text-white">{t.title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-300">{t.sub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT ALL CONNECTS */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="How It All Connects"
              title={<>From discovery to delivery in <span className="text-forest">four steps.</span></>}
            />
          </Reveal>
          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-9 hidden border-t-2 border-dashed border-slate-200 lg:block" />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-forest font-display text-2xl font-black text-white shadow-[0_10px_24px_-8px_rgba(30,142,74,0.6)]">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28" data-testid="services-teaser-section">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="Already have your own training content?"
              title={<>We don't just build our own learning — we help you build <span className="text-forest">yours.</span></>}
              sub="Beyond our library and simulations, our studio team helps organizations turn existing content into working eLearning."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-leaf">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.desc}</p>
                  <div className="mt-5">
                    <ArrowLink to={s.to} testid={s.testid}>Learn more</ArrowLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <ButtonLink to="/solutions/services" variant="outline" testid="services-teaser-cta" arrow>
              Explore eLearning Services
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-y border-slate-100 bg-white px-6 py-16 lg:px-10" data-testid="proof-strip">
        <div className="mx-auto grid max-w-[1400px] gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <p className="font-display text-4xl font-black tracking-tight text-forest lg:text-5xl"><CountUp to={500} suffix="+" /></p>
            <p className="mt-2 text-sm font-semibold text-body">Trainers worldwide</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-display text-4xl font-black tracking-tight text-forest lg:text-5xl"><CountUp to={50000} suffix="+" /></p>
            <p className="mt-2 text-sm font-semibold text-body">Learners trained</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-display text-4xl font-black tracking-tight text-forest lg:text-5xl"><CountUp to={24} suffix="%" /></p>
            <p className="mt-2 text-sm font-semibold text-body">Average score improvement</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex h-full flex-col items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-light text-forest">
                <Leaf className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-semibold text-body">Backed by peer-reviewed ESG research</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Ready to transform your sustainability training?"
        primary={{ label: "Get Started", to: "/pricing", testid: "home-final-cta-start-button" }}
        secondary={{ label: "View Pricing", to: "/pricing", testid: "home-final-cta-pricing-button" }}
        testid="home-final-cta"
      />
    </div>
  );
}
