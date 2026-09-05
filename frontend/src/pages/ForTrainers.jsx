import { motion } from "framer-motion";
import { Clock, TrendingUp, ShieldCheck, Users, Check, Quote } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SectionHead } from "@/components/site/ui";
import CtaBanner from "@/components/site/CtaBanner";
import { IMAGES, TESTIMONIALS, TINTS } from "@/data/content";

const CHART = [
  { x: "W1", y: 58 }, { x: "W2", y: 61 }, { x: "W3", y: 66 }, { x: "W4", y: 64 },
  { x: "W5", y: 71 }, { x: "W6", y: 75 }, { x: "W7", y: 79 }, { x: "W8", y: 84 },
];

const WORKFLOW = [
  { n: "1", title: "Discovery", desc: "Use Topic Explorer to find the latest industry trends and case studies.", link: "Explore Topics", to: "/learning-materials", testid: "trainers-workflow-explore-link", hot: false },
  { n: "2", title: "Curriculum", desc: "Select Learning Materials and customize modules for your class.", link: "Browse Library", to: "/learning-materials", testid: "trainers-workflow-browse-link", hot: false },
  { n: "3", title: "Preparation", desc: "Download slides and guides from the Resources Hub.", link: "Get Resources", to: "/resources", testid: "trainers-workflow-resources-link", hot: false },
  { n: "4", title: "Delivery", desc: "Launch your session and track student progress via Trainer Insights.", link: "Go Live", to: "/pricing", testid: "trainers-workflow-golive-link", hot: true },
];

const FEATURES = [
  { icon: Clock, title: "Save 40+ Hours", desc: "Per course, on average — materials arrive classroom-ready, not half-built." },
  { icon: TrendingUp, title: "Rich Analytics", desc: "See exactly where each cohort struggles and which modules land." },
  { icon: ShieldCheck, title: "Verified Content", desc: "Peer-reviewed by sustainability researchers and updated monthly." },
  { icon: Users, title: "Community Access", desc: "A private network of 500+ sustainability trainers trading what works." },
];

const SEGMENTS = ["Independent Consultants", "Sustainability Officers", "Academic Instructors"];

export default function ForTrainers() {
  return (
    <div data-testid="for-trainers-page">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy">
        <img src={IMAGES.workshop} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 lg:grid-cols-[1.3fr_1fr] lg:px-10 lg:py-32">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <Tag dark>Designed for Educators</Tag>
            </motion.div>
            <MaskedLines
              className="mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
              lines={["Elevate Your Training.", <><span className="text-leaf">Scale Your Impact.</span></>]}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300"
            >
              Green Mind Learning provides the ultimate ecosystem for sustainability trainers — from curriculum
              design to live delivery and student performance tracking.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <ButtonLink to="/about-contact" variant="primary" testid="trainers-become-partner-button" arrow>
                Become a Partner
              </ButtonLink>
              <ButtonLink onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })} variant="glass" testid="trainers-watch-demo-button">
                Watch Demo
              </ButtonLink>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <div className="rounded-2xl bg-white p-7 shadow-2xl" data-testid="trainers-stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Class Performance</p>
                  <p className="mt-2 font-display text-4xl font-black tracking-tight text-forest">+24%</p>
                  <p className="text-xs font-semibold text-slate-500">Avg. Score</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-light text-forest">
                  <TrendingUp className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5">
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={CHART}>
                    <Line type="monotone" dataKey="y" stroke="#1E8E4A" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Integrated Trainer Workflow"
              title={<>One flow from first search to <span className="text-forest">live session.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="h-full">
                <div className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  s.hot ? "border-forest/40 bg-forest-light" : "border-slate-200 bg-white"
                }`}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-black ${
                    s.hot ? "bg-forest text-white" : "bg-navy text-leaf"
                  }`}>
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{s.desc}</p>
                  <div className="mt-5">
                    <ArrowLink to={s.to} testid={s.testid}>{s.link}</ArrowLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR EVERY EDUCATOR */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHead
                tag="Built for Every Type of Educator"
                title={<>Serious tools, zero <span className="text-forest">busywork.</span></>}
              />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${TINTS[i % TINTS.length].soft} ${TINTS[i % TINTS.length].text}`}>
                      <f.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold tracking-tight text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="flex items-center">
            <div className="w-full rounded-[2rem] bg-navy p-9 md:p-12">
              <Tag dark>Who Trains With Us</Tag>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                From solo consultants to university faculties.
              </h3>
              <ul className="mt-8 space-y-4">
                {SEGMENTS.map((s) => (
                  <li key={s} className="flex items-center gap-4 rounded-xl border border-navy-line bg-navy-card px-5 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/15 text-leaf">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-bold text-white">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Testimonials"
              title={<>Trainers who made the <span className="text-forest">switch.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" data-testid={`testimonial-card-${i}`}>
                  <Quote className="h-7 w-7 text-forest/40" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-leaf">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink">{t.name}</span>
                      <span className="block text-xs text-slate-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to transform your sustainability training?"
        primary={{ label: "Get Trainer Access", to: "/pricing", testid: "trainers-cta-access-button" }}
        secondary={{ label: "View Trainer Pricing", to: "/pricing", testid: "trainers-cta-pricing-button" }}
        testid="trainers-final-cta"
      />
    </div>
  );
}
