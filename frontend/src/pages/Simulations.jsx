import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowDown, MousePointerClick, RefreshCw, FileCheck2, Bell, Wind, Recycle, Scale, Sprout } from "lucide-react";
import { Reveal, MaskedLines } from "@/components/site/Motion";
import { ButtonLink, Tag, SoonPill, SectionHead, FormSuccess, inputDarkCls, scrollToId } from "@/components/site/ui";
import { IMAGES } from "@/data/content";

const APPROACH = [
  { n: "01", title: "Concrete", desc: "Every simulation will be grounded in a real regulatory framework, dataset, or industry case — not an abstract quiz." },
  { n: "02", title: "Active", desc: "Learners will make decisions, see consequences, and retry — productive struggle beats passive reading." },
  { n: "03", title: "Actionable", desc: "Every module will end with a real deliverable learners could use at work: a draft report, an audit checklist, a mitigation plan." },
];

const CONCEPTS = [
  {
    icon: MousePointerClick, img: IMAGES.circuit,
    from: "Reading about GHG Protocol scopes",
    title: "Scope Sort",
    desc: "A drag-and-drop simulation classifying a real company's emissions into Scope 1, 2, and 3.",
  },
  {
    icon: RefreshCw, img: IMAGES.greenAerial,
    from: "A slide on circular economy theory",
    title: "Closing the Loop",
    desc: "Redesign a product's supply chain and see your waste-reduction score change in real time.",
  },
  {
    icon: FileCheck2, img: IMAGES.paperwork,
    from: "A PDF checklist for ESG disclosure",
    title: "ESG Reporting Simulator",
    desc: "Complete a mock annual disclosure with instant compliance feedback on every section.",
  },
];

const CATEGORIES = [
  { icon: Wind, label: "Climate & Energy" },
  { icon: Recycle, label: "Circular Economy" },
  { icon: Scale, label: "ESG Governance" },
  { icon: Sprout, label: "Biodiversity" },
];

export default function Simulations() {
  const [form, setForm] = useState({ name: "", email: "", org: "", role: "Trainer" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div data-testid="simulations-page">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy">
        <img src={IMAGES.circuit} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="hero-vignette absolute inset-0" />
        <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-forest/20 blur-[130px]" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Tag dark>Coming Soon — The Future of Green Mind Learning</Tag>
          </motion.div>
          <MaskedLines
            className="mt-6 max-w-5xl font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4.2rem]"
            lines={[
              "We're rebuilding sustainability",
              <>training around <span className="text-leaf">simulation,</span></>,
              "not slides.",
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            We're building Green Mind Simulations — guided, no-code ESG scenarios your trainees can practice
            inside, not just read about. Join the waitlist to be first to try it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink onClick={() => scrollToId("waitlist")} variant="primary" testid="sim-hero-waitlist-button" arrow className="px-7 py-3.5">
              Join the Waitlist
            </ButtonLink>
            <ButtonLink onClick={() => scrollToId("preview")} variant="glass" testid="sim-hero-preview-button" className="px-7 py-3.5">
              See a Concept Preview
            </ButtonLink>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-400"
            data-testid="sim-no-demo-note"
          >
            No live demo yet — concept previews only. Honest by design.
          </motion.p>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Our Approach"
              title={<>How we're designing every <span className="text-forest">simulation.</span></>}
              sub="Three principles guide the roadmap — this is the plan we're building toward, not a shipped feature set."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {APPROACH.map((a, i) => (
              <Reveal key={a.n} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.2)]">
                  <span className="font-display text-4xl font-black text-forest/30">{a.n}</span>
                  <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SNEAK PEEK */}
      <section id="preview" className="bg-white px-6 py-24 lg:px-10 lg:py-32" data-testid="sim-preview-section">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              tag="Sneak Peek — Concept Previews"
              title={<>From passive pages to <span className="text-forest">practice.</span></>}
              sub="Early concepts from the simulation roadmap. Labeled honestly: these are previews of what we're building, not live tools."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {CONCEPTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.25)]">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-leaf backdrop-blur">
                      Concept
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                      <FileText className="h-4 w-4 shrink-0" />
                      <span className="line-through decoration-slate-300">{c.from}</span>
                    </div>
                    <div className="my-3 flex justify-start pl-1.5">
                      <ArrowDown className="h-4 w-4 text-forest" />
                    </div>
                    <div className="rounded-xl bg-forest-light p-5">
                      <div className="flex items-center gap-2.5">
                        <c.icon className="h-5 w-5 text-forest" />
                        <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
                          {c.title} <span className="text-xs font-bold text-forest">(concept)</span>
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-body">{c.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNED CATEGORIES */}
      <section className="bg-mist px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Planned Categories"
              title={<>The first wave of <span className="text-forest">simulations.</span></>}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <button
                  type="button"
                  data-testid={`sim-category-notify-${i}`}
                  onClick={() => scrollToId("waitlist")}
                  className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-light text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-bold text-ink">{c.label}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:bg-forest-light group-hover:text-forest-dark">
                    <Bell className="h-3 w-3" /> Notify Me
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="relative overflow-hidden bg-navy px-6 py-24 lg:px-10 lg:py-32" data-testid="sim-waitlist-section">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-forest/20 blur-[130px]" />
        <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col justify-center">
            <Reveal>
              <Tag dark>Early Access</Tag>
              <MaskedLines
                inView
                as="h2"
                className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl"
                lines={["Be first", <>in <span className="text-leaf">line.</span></>]}
              />
              <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
                Simulations are in active development. Join the waitlist and you'll be the first to know when
                early access opens — with priority onboarding for trainers and teams.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                {["First access to the Scope Sort pilot", "Founding-member pricing when we launch", "A say in which simulations we build next"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-navy-line bg-navy-card p-8 md:p-10">
              {sent ? (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/15 text-leaf">
                    <FileCheck2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-white">You're on the list.</h3>
                  <div className="mt-4 w-full">
                    <FormSuccess testid="waitlist-success-message">
                      We'll email you as soon as early access opens.
                    </FormSuccess>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} data-testid="waitlist-form" className="space-y-5">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-white">Join the Waitlist</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="wl-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Name</label>
                      <input id="wl-name" data-testid="waitlist-name-input" required value={form.name} onChange={set("name")} placeholder="Alex Green" className={inputDarkCls} />
                    </div>
                    <div>
                      <label htmlFor="wl-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                      <input id="wl-email" data-testid="waitlist-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="alex@company.com" className={inputDarkCls} />
                    </div>
                    <div>
                      <label htmlFor="wl-org" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Organization</label>
                      <input id="wl-org" data-testid="waitlist-org-input" value={form.org} onChange={set("org")} placeholder="Company or institution" className={inputDarkCls} />
                    </div>
                    <div>
                      <label htmlFor="wl-role" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Role</label>
                      <select id="wl-role" data-testid="waitlist-role-select" value={form.role} onChange={set("role")} className={inputDarkCls}>
                        <option>Trainer</option>
                        <option>L&amp;D Leader</option>
                        <option>Educator</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <ButtonLink type="submit" variant="primary" testid="waitlist-submit-button" className="w-full py-3.5">
                    Join the Waitlist
                  </ButtonLink>
                  <p className="text-center text-xs text-slate-500">No spam. One email when early access opens.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
