import { motion } from "framer-motion";
import { Presentation, Wrench, Plug, Check, ArrowRight } from "lucide-react";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SectionHead, scrollToId } from "@/components/site/ui";
import CtaBanner from "@/components/site/CtaBanner";
import { IMAGES } from "@/data/content";

const SERVICES = [
  {
    id: "ppt",
    icon: Presentation,
    img: IMAGES.discussion,
    eyebrow: "Service 01",
    title: "PPT to eLearning Conversion",
    headline: <>Turn your slide decks into <span className="text-forest">real eLearning.</span></>,
    desc: "Many organizations already have their training content sitting in PowerPoint. We transform static slides into interactive, trackable eLearning — with narration, knowledge checks, branching scenarios, and accessibility built in.",
    includes: ["Instructional design review", "Professional voiceover/narration", "Interactivity & knowledge checks", "SCORM/xAPI packaging", "Mobile-responsive output"],
    steps: ["Audit your existing decks", "Redesign for engagement", "Build & test", "Deliver a SCORM-ready package"],
    cta: "Convert My PPTs",
    testid: "service-ppt",
  },
  {
    id: "troubleshooting",
    icon: Wrench,
    img: IMAGES.circuit,
    eyebrow: "Service 02",
    title: "eLearning Troubleshooting & Fixes",
    headline: <>Already have eLearning that's broken? <span className="text-forest">We'll fix it.</span></>,
    desc: "Not every team has in-house instructional design or LMS expertise. If your existing courses have bugs, broken tracking, corrupted SCORM packages, or accessibility issues, our team diagnoses and repairs them.",
    includes: ["SCORM/xAPI debugging", "LMS compatibility fixes", "Content & UX audits", "Accessibility (WCAG) remediation", "Cross-browser/device testing"],
    steps: ["Submit your course files", "We run a full diagnostic audit", "We fix and retest", "You get a working, compliant course"],
    cta: "Request a Diagnostic",
    testid: "service-fix",
  },
  {
    id: "lms",
    icon: Plug,
    img: IMAGES.execMeeting,
    eyebrow: "Service 03",
    title: "LMS Integration & Implementation",
    headline: <>Make sure your LMS actually <span className="text-forest">captures the data.</span></>,
    desc: "An eLearning course only proves its value if your Learning Management System can correctly track completions, scores, and time spent. We configure and test your content's tracking so participant data flows correctly into your LMS.",
    includes: ["SCORM 1.2/2004, xAPI (Tin Can), and cmi5 packaging", "LMS configuration (Moodle, Cornerstone, Docebo, SAP SuccessFactors, TalentLMS, and similar)", "Reporting/dashboard setup", "End-to-end QA testing"],
    steps: ["Assess your current LMS setup", "Package or re-package content correctly", "Configure tracking & reporting", "Test end-to-end and hand off documentation"],
    cta: "Book an LMS Audit",
    testid: "service-lms",
  },
];

export default function Services() {
  return (
    <div data-testid="services-page">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Tag>eLearning Services</Tag>
          </motion.div>
          <MaskedLines
            className="mt-5 max-w-4xl font-display text-4xl font-black leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            lines={[
              "From PowerPoint to performance —",
              <>we <span className="text-forest">build, fix, and connect</span></>,
              "your eLearning.",
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-body"
          >
            Beyond our own sustainability content, Green Mind Learning's studio team helps organizations
            create, repair, and properly deploy their training content — sustainability-focused or not.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <ButtonLink to="/about-contact" variant="primary" testid="services-consultation-button" arrow>
              Get a Free Consultation
            </ButtonLink>
            <ButtonLink onClick={() => scrollToId("ppt")} variant="outline" testid="services-see-services-button">
              See Our Services
            </ButtonLink>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      {SERVICES.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          data-testid={s.testid}
          className={`px-6 py-20 lg:px-10 lg:py-28 ${idx % 2 === 0 ? "bg-mist" : "bg-white"}`}
        >
          <div className={`mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <Reveal className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <div className="clip-frame relative overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-[420px] w-full object-cover" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                  <s.icon className="h-4 w-4 text-leaf" />
                  {s.title}
                </div>
              </div>
            </Reveal>
            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
              <Reveal>
                <Tag>{s.eyebrow}</Tag>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink md:text-4xl text-balance">
                  {s.headline}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-body">{s.desc}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">What's included</p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm font-medium text-body">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <ol className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-3">
                  {s.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white">
                        <span className="text-leaf">{i + 1}</span> {step}
                      </span>
                      {i < s.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-slate-300" />}
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <ButtonLink to="/about-contact" variant="primary" testid={`${s.testid}-cta-button`} arrow>
                    {s.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* PRICING NOTE */}
      <section className="bg-white px-6 pb-4 lg:px-10">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-forest/25 bg-forest-light p-8 md:flex-row md:items-center md:p-10" data-testid="services-pricing-note">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">Custom-quoted, project-based pricing.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-body">
                These three services are scoped and quoted per project — they're not part of the subscription
                tiers on our Pricing page. Tell us what you're working with and we'll send a fixed quote.
              </p>
            </div>
            <ArrowLink to="/about-contact" testid="services-quote-link">Request a quote</ArrowLink>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        title="Not sure which service you need? Let's talk."
        primary={{ label: "Schedule a Free Consultation", to: "/about-contact", testid: "services-cta-consultation-button" }}
        testid="services-final-cta"
      />
    </div>
  );
}
