import { useState } from "react";
import { Search, BookOpen, Users, Target, Check, Mail, MapPin, Clock, Quote } from "lucide-react";
import { Reveal, MaskedLines, CountUp } from "@/components/site/Motion";
import { ButtonLink, Tag, SectionHead, FormSuccess, inputCls } from "@/components/site/ui";
import { IMAGES, TEAM } from "@/data/content";

const ECOSYSTEM = [
  { icon: Search, title: "Identify Gaps", desc: "We map where sustainability knowledge breaks down between research and the workforce.", hot: false },
  { icon: BookOpen, title: "Curate Wisdom", desc: "Peer-reviewed research and regulation, distilled into teachable, modular content.", hot: false },
  { icon: Users, title: "Empower Trainers", desc: "The people already in the room get world-class materials, guides, and delivery tools.", hot: false },
  { icon: Target, title: "Realize Change", desc: "Learning that ends in deliverables — reports, audits, plans — not just attendance.", hot: true },
];

export default function AboutContact() {
  const [form, setForm] = useState({ first: "", last: "", email: "", topic: "General Question", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submitContact = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: form.first, last_name: form.last, email: form.email, topic: form.topic, message: form.message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong sending your message — please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="about-contact-page">
      {/* HERO */}
      <section className="bg-mist px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Tag>About Green Mind Learning</Tag>
            </Reveal>
            <MaskedLines
              className="mt-5 font-display text-4xl font-black leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              lines={[
                "Bridging the gap between",
                <><span className="text-forest">Knowledge</span> and <span className="text-forest">Action.</span></>,
              ]}
            />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-body">
                Green Mind Learning was born from a simple realization: the transition to a sustainable future
                isn't limited by technology, but by the speed at which we can share expertise.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-forest px-4 py-2 text-xs font-extrabold text-white" data-testid="about-stat-badge">12+ Years of Innovation</span>
                <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-body">Global Impact</span>
                <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-body">500K+ Learners</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="clip-frame overflow-hidden">
              <img src={IMAGES.teamHands} alt="The Green Mind Learning team collaborating" className="h-[420px] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Our Ecosystem Approach"
              title={<>How knowledge becomes <span className="text-forest">change.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1} className="h-full">
                <div className={`h-full rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  e.hot
                    ? "border-forest bg-forest text-white shadow-[0_24px_50px_-20px_rgba(30,142,74,0.5)]"
                    : "border-slate-200 bg-white hover:shadow-lg"
                }`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${e.hot ? "bg-white/15 text-white" : "bg-forest-light text-forest"}`}>
                    <e.icon className="h-6 w-6" />
                  </span>
                  <h3 className={`mt-5 font-display text-lg font-bold tracking-tight ${e.hot ? "text-white" : "text-ink"}`}>{e.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${e.hot ? "text-white/85" : "text-body"}`}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DECISIVE DECADE */}
      <section className="bg-navy px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Tag dark>Why Now</Tag>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl text-balance">
              A platform built for the <span className="text-leaf">Decisive Decade.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
              The "why" is simple: we are running out of time. Traditional education cycles are too slow for
              the climate crisis. Green Mind Learning accelerates this by creating a direct link between
              research and classroom delivery.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Decentralized Intelligence", "expertise flows trainer-to-learner, not publisher-to-market."],
                ["Actionable Frameworks", "every module ends in something a professional can use on Monday."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/15 text-leaf">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">
                    <span className="font-bold text-white">{t}</span> — {d}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="clip-frame overflow-hidden">
              <img src={IMAGES.forestCanopy} alt="Dense forest canopy from above" className="h-[440px] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-10" data-testid="about-impact-strip">
        <div className="mx-auto grid max-w-[1400px] gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: 500, suffix: "K+", label: "Learners trained" },
            { to: 500, suffix: "+", label: "Trainers worldwide" },
            { to: 128, suffix: "", label: "Learning modules" },
            { to: 24, suffix: "%", label: "Average performance lift" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-body">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-mist px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHead
              center
              tag="Meet the Team"
              title={<>The people behind the <span className="text-forest">platform.</span></>}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,18,32,0.25)]" data-testid={`team-card-${i}`}>
                  <div className="h-64 overflow-hidden">
                    <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">{t.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-forest">{t.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-body">{t.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-16 max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-forest/40" />
            <p className="mt-4 font-display text-xl font-bold leading-relaxed tracking-tight text-ink md:text-2xl text-balance">
              "Engineering helps us understand systems. Design helps us make them accessible. Learning helps
              us make them usable."
            </p>
            <p className="mt-4 text-sm font-semibold text-body">
              Together, we connect sustainability knowledge with the people who need to teach it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-40px_rgba(11,18,32,0.4)] lg:grid-cols-2" data-testid="contact-panel">
              {/* LEFT */}
              <div className="relative bg-navy p-10 md:p-14">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-forest/25 blur-[100px]" />
                <div className="relative">
                  <Tag dark>Contact</Tag>
                  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">Get in touch.</h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    Have questions about our curriculum or want to partner for a custom trainer program? Our
                    team is here to support your journey.
                  </p>
                  <ul className="mt-10 space-y-6">
                    <li className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-leaf"><Mail className="h-5 w-5" /></span>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Email Support</p>
                        <p className="text-sm font-bold text-white">hello@greenmindlearning.edu</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-leaf"><MapPin className="h-5 w-5" /></span>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Global HQ</p>
                        <p className="text-sm font-bold text-white">12 Sustainability Way, Berlin, Germany</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-leaf"><Clock className="h-5 w-5" /></span>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Hours</p>
                        <p className="text-sm font-bold text-white">Mon–Fri, 08:00–19:00 CET</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* RIGHT */}
              <div className="bg-white p-10 md:p-14">
                {sent ? (
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-light text-forest">
                      <Mail className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">Message sent.</h3>
                    <div className="mt-4 w-full">
                      <FormSuccess testid="contact-success-message">
                        Thanks for reaching out — our team replies within one business day.
                      </FormSuccess>
                    </div>
                  </div>
                ) : (
                  <form
                    data-testid="contact-form"
                    onSubmit={submitContact}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ct-first" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                        <input id="ct-first" data-testid="contact-first-name-input" required value={form.first} onChange={set("first")} placeholder="Alex" className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="ct-last" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                        <input id="ct-last" data-testid="contact-last-name-input" required value={form.last} onChange={set("last")} placeholder="Green" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ct-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <input id="ct-email" data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="alex@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="ct-topic" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Topic of Interest</label>
                      <select id="ct-topic" data-testid="contact-topic-select" value={form.topic} onChange={set("topic")} className={inputCls}>
                        <option>General Question</option>
                        <option>Trainer Partnership</option>
                        <option>Enterprise &amp; Licensing</option>
                        <option>eLearning Services</option>
                        <option>Simulation Early Access</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ct-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                      <textarea id="ct-message" data-testid="contact-message-input" required rows={4} value={form.message} onChange={set("message")} placeholder="Tell us about your training goals…" className={`${inputCls} resize-none`} />
                    </div>
                    {error && (
                      <p data-testid="contact-error-message" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
                        {error}
                      </p>
                    )}
                    <ButtonLink type="submit" variant="primary" testid="contact-submit-button" disabled={sending} className="w-full py-3.5">
                      {sending ? "Sending…" : "Send Message"}
                    </ButtonLink>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
