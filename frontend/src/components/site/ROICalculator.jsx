import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Motion";
import { ButtonLink, Tag, inputCls, inputDarkCls, FormSuccess } from "@/components/site/ui";

// ─── Configurable model assumptions (PLACEHOLDER constants — update in one place) ───
const WORKFORCE_MIDPOINT = {
  "Under 1,000 employees": 500,
  "1,000–5,000 employees": 3000,
  "5,000–10,000 employees": 7500,
  "10,000–20,000 employees": 15000,
  "20,000–50,000 employees": 35000,
  "50,000+ employees": 75000,
};

const ESG_EXPOSURE_SCORE = { // 1–5 scale, illustrative regulatory/reporting intensity per sector — placeholder
  "Oil & Gas / Energy": 5.0,
  "Financial Services": 4.5,
  "Utilities": 4.2,
  "Manufacturing": 4.0,
  "Construction & Real Estate": 3.8,
  "Transportation & Logistics": 3.5,
  "Agriculture & Food": 3.3,
  "Public Sector / Government": 3.0,
  "Other": 3.0,
  "Healthcare & Pharmaceuticals": 2.8,
  "Retail & Consumer Goods": 2.5,
  "Hospitality & Tourism": 2.2,
  "Technology": 2.0,
};

const CO2_INTENSITY_PER_EMPLOYEE = { // illustrative tonnes CO2e (Scope 1+2) per employee per year, by sector — placeholder
  "Oil & Gas / Energy": 45,
  "Utilities": 40,
  "Manufacturing": 18,
  "Transportation & Logistics": 15,
  "Agriculture & Food": 14,
  "Construction & Real Estate": 12,
  "Other": 8,
  "Hospitality & Tourism": 7,
  "Healthcare & Pharmaceuticals": 6,
  "Public Sector / Government": 5,
  "Retail & Consumer Goods": 5,
  "Technology": 4,
  "Financial Services": 3,
};

const INDUSTRIES = [
  "Financial Services", "Manufacturing", "Oil & Gas / Energy", "Utilities",
  "Construction & Real Estate", "Transportation & Logistics", "Agriculture & Food",
  "Public Sector / Government", "Healthcare & Pharmaceuticals", "Retail & Consumer Goods",
  "Hospitality & Tourism", "Technology", "Other",
];

const FRAMEWORKS_COVERED = {
  "Scope 1 only, single framework (e.g., just GRI or just CSRD)": 1,
  "Scope 1+2, multiple frameworks": 3,
  "Scope 1+2+3, full multi-framework + third-party assurance": 6,
};

const CO2_SCOPES_COVERED = {
  "Scope 1 only, single framework (e.g., just GRI or just CSRD)": 1,
  "Scope 1+2, multiple frameworks": 2,
  "Scope 1+2+3, full multi-framework + third-party assurance": 3,
};

const READINESS_IMPROVEMENT_PCT = { // bigger gap from current baseline = bigger modeled improvement — placeholder
  "Static Materials (PDFs / Slide Decks)": 0.35,
  "Blended (Some Interactive Elements)": 0.22,
  "Fully Interactive (Simulation-Based)": 0.12,
};

const HOURS_SAVED_PER_EMPLOYEE = { // annual training-time efficiency saved — placeholder
  "Static Materials (PDFs / Slide Decks)": 4,
  "Blended (Some Interactive Elements)": 2,
  "Fully Interactive (Simulation-Based)": 0.5,
};

const AVG_COST_PER_FINDING = 18000; // USD — placeholder: avoided remediation/rework/audit cost per finding
const LOADED_HOURLY_COST = 45; // USD — placeholder: blended fully-loaded hourly cost per employee
const COST_PER_LEARNER_PER_YEAR = 25; // USD — placeholder: assumed platform cost per learner per year
const PLATFORM_COST_FLOOR = 15000; // USD — placeholder: minimum annual platform cost
const MISREPORTING_ERROR_RATE = 0.10; // placeholder: illustrative average error/misstatement rate in unaudited carbon reporting
const TONNES_CO2E_PER_CAR_YEAR = 4.6; // placeholder: illustrative equivalency (avg passenger car, tCO2e/year)

const BANDS = Object.keys(WORKFORCE_MIDPOINT);
const METHODS = Object.keys(READINESS_IMPROVEMENT_PCT);
const SCOPES = Object.keys(FRAMEWORKS_COVERED);

const fmt$ = (n) =>
  n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `$${Math.round(n / 1e3)}K` : `$${Math.round(n)}`;
const fmtT = (n) => `${n.toLocaleString()} tCO2e/year`;

const STEPS = ["Your Company", "Your Training", "Your Results"];

function Stepper({ step }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3" data-testid="roi-stepper">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <span key={label} className="flex items-center gap-2 sm:gap-3">
            {i > 0 && <span className="hidden h-px w-6 bg-slate-200 sm:block" />}
            <span
              data-testid={`roi-stepper-${n}`}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                done ? "bg-forest text-white" : active ? "bg-navy text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              {done ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
              ) : (
                <span className={`font-display ${active ? "text-leaf" : ""}`}>{n}</span>
              )}
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function MetricTile({ label, value, testid, big = false, accent = false }) {
  return (
    <div className={`rounded-xl bg-white p-5 ${big ? "sm:col-span-2" : ""}`} data-testid={testid}>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p
        className={`mt-2 font-display font-black tracking-tight ${accent ? "text-forest" : "text-ink"} ${
          big ? "text-3xl md:text-4xl" : "text-2xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function LivePanel({ children, testid }) {
  return (
    <div className="mt-8 rounded-2xl bg-forest-light p-5" data-testid={testid}>
      <div className="flex items-center gap-2 px-1 pb-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
        </span>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-forest-dark">
          Calculated From Your Inputs — Live
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, options, testid }) {
  return (
    <div>
      <label htmlFor={testid} className="mb-2 block text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <select id={testid} data-testid={testid} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function ROICalculator() {
  const [step, setStep] = useState(1);
  const [band, setBand] = useState(BANDS[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [method, setMethod] = useState(METHODS[0]);
  const [scope, setScope] = useState(SCOPES[0]);
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const m = useMemo(() => {
    const modeledWorkforce = WORKFORCE_MIDPOINT[band];
    const businessUnits = Math.max(1, Math.round(modeledWorkforce / 750));
    const annualComplianceFindings = Math.round((ESG_EXPOSURE_SCORE[industry] * modeledWorkforce) / 1000);
    const footprintTonnes = Math.round(CO2_INTENSITY_PER_EMPLOYEE[industry] * modeledWorkforce);
    const frameworksCovered = FRAMEWORKS_COVERED[scope];
    const co2ScopesCovered = CO2_SCOPES_COVERED[scope];
    const readinessImprovement = READINESS_IMPROVEMENT_PCT[method];
    const findingsAvoided = Math.round(annualComplianceFindings * readinessImprovement);
    const findingCostSavings = findingsAvoided * AVG_COST_PER_FINDING;
    const efficiencySavings = modeledWorkforce * HOURS_SAVED_PER_EMPLOYEE[method] * LOADED_HOURLY_COST;
    const mid = findingCostSavings + efficiencySavings;
    const cost = Math.max(PLATFORM_COST_FLOOR, modeledWorkforce * COST_PER_LEARNER_PER_YEAR);
    const roiMultiple = mid / cost;
    const paybackMonths = Math.max(1, Math.round(12 / roiMultiple));
    // "Corrected" = tonnes of CO2e that better-trained reporting could catch and fix in the
    // org's own disclosures — NOT a claim of reducing the org's physical emissions.
    const corrected = Math.round(footprintTonnes * MISREPORTING_ERROR_RATE * readinessImprovement);
    const cars = Math.round(corrected / TONNES_CO2E_PER_CAR_YEAR);
    return {
      modeledWorkforce, businessUnits, annualComplianceFindings, footprintTonnes,
      frameworksCovered, co2ScopesCovered, readinessImprovement, findingsAvoided,
      findingCostSavings, low: mid * 0.85, high: mid * 1.15, roiMultiple, paybackMonths,
      corrected, cars,
    };
  }, [band, industry, method, scope]);

  const sendReport = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: lead.name,
          last_name: "-",
          email: lead.email,
          topic: "ESG & CO2 Report Request",
          message: `ESG & CO2 impact report request for ${lead.company}. Inputs — workforce: ${band}; industry: ${industry}; method: ${method}; scope: ${scope}. Model: savings ${fmt$(m.low)}–${fmt$(m.high)}, ROI ${m.roiMultiple.toFixed(1)}x, payback ${m.paybackMonths}mo, footprint ${fmtT(m.footprintTonnes)}, CO2e reporting corrected ${fmtT(m.corrected)}.`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSending(false);
    }
  };

  const stepHead = "font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl";
  const stepSub = "mt-2 text-sm leading-relaxed text-body";

  return (
    <section id="esg-co2-calculator" className="bg-forest-light px-6 py-24 lg:px-10 lg:py-28" data-testid="esg-co2-section">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Tag className="justify-center">ESG &amp; CO2 Impact Calculator</Tag>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl text-balance">
            The business case for <span className="text-forest">accurate carbon</span> and ESG reporting.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body">
            Answer a few questions about your organization and see the potential CO2 reporting and compliance
            impact of switching to Green Mind Learning.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_40px_90px_-40px_rgba(11,18,32,0.25)] sm:p-9 md:p-12">
            <Stepper step={step} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35 }}
                className="mt-10"
              >
                {step === 1 && (
                  <div data-testid="roi-step-1">
                    <h3 className={stepHead}>Tell us about your company</h3>
                    <p className={stepSub}>
                      Select your workforce size and industry so we can model your compliance exposure and
                      training scope.
                    </p>
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <Field label="Workforce size" value={band} onChange={setBand} options={BANDS} testid="roi-field-workforce" />
                      <Field label="Industry" value={industry} onChange={setIndustry} options={INDUSTRIES} testid="roi-field-industry" />
                    </div>
                    <LivePanel testid="roi-live-panel-1">
                      <MetricTile label="Modeled Workforce" value={`${m.modeledWorkforce.toLocaleString()} people`} testid="roi-tile-workforce" />
                      <MetricTile label="Business Units To Train" value={m.businessUnits.toLocaleString()} testid="roi-tile-units" />
                      <MetricTile label="Est. Annual Compliance Findings" value={m.annualComplianceFindings.toLocaleString()} testid="roi-tile-findings" />
                      <MetricTile label="Est. Annual Carbon Footprint" value={fmtT(m.footprintTonnes)} testid="roi-tile-footprint-live" accent />
                    </LivePanel>
                  </div>
                )}

                {step === 2 && (
                  <div data-testid="roi-step-2">
                    <h3 className={stepHead}>How do you train today?</h3>
                    <p className={stepSub}>
                      Your current training approach and reporting scope determine your savings potential and
                      expected compliance improvement.
                    </p>
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <Field label="Current training method" value={method} onChange={setMethod} options={METHODS} testid="roi-field-method" />
                      <Field label="Emissions &amp; reporting scope covered today" value={scope} onChange={setScope} options={SCOPES} testid="roi-field-scope" />
                    </div>
                    <LivePanel testid="roi-live-panel-2">
                      <MetricTile label="Frameworks Covered" value={m.frameworksCovered} testid="roi-tile-frameworks" />
                      <MetricTile label="CO2e Scopes Covered" value={m.co2ScopesCovered} testid="roi-tile-scopes" />
                      <MetricTile label="Compliance Readiness Improvement" value={`+${Math.round(m.readinessImprovement * 100)}%`} testid="roi-tile-readiness" />
                      <MetricTile label="ROI Per $1 Spent" value={`${m.roiMultiple.toFixed(1)}x`} testid="roi-tile-roi" />
                    </LivePanel>
                  </div>
                )}

                {step === 3 && (
                  <div data-testid="roi-step-3">
                    <h3 className={stepHead}>Your estimated impact</h3>
                    <p className={stepSub}>
                      Based on your inputs, here's the projected annual impact of switching to Green Mind
                      Learning.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <MetricTile big label="Projected Annual Savings" value={`${fmt$(m.low)} – ${fmt$(m.high)}`} testid="roi-result-savings" />
                      <div className="rounded-xl bg-white p-5 sm:col-span-2" data-testid="roi-result-co2">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                          Estimated CO2e Reporting Corrected
                        </p>
                        <p className="mt-2 font-display text-3xl font-black tracking-tight text-forest md:text-4xl">
                          {fmtT(m.corrected)}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-slate-500">
                          ≈ equivalent to {m.cars.toLocaleString()} passenger cars off the road for a year
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          Illustrative equivalency — reporting accuracy corrected, not physical emissions reduced.
                        </p>
                      </div>
                      <MetricTile label="Compliance Findings Avoided" value={m.findingsAvoided.toLocaleString()} testid="roi-result-avoided" />
                      <MetricTile label="Finding-Related Cost Savings" value={fmt$(m.findingCostSavings)} testid="roi-result-finding-savings" />
                      <MetricTile label="Payback Period" value={`${m.paybackMonths} month${m.paybackMonths === 1 ? "" : "s"}`} testid="roi-result-payback" />
                      <MetricTile label="ROI Multiple" value={`${m.roiMultiple.toFixed(1)}x`} testid="roi-result-multiple" />
                      <div className="rounded-xl bg-white p-5 sm:col-span-2 lg:col-span-4" data-testid="roi-result-footprint">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                          Carbon Footprint Modeled — baseline context
                        </p>
                        <p className="mt-2 font-display text-xl font-black tracking-tight text-ink">
                          {fmtT(m.footprintTonnes)} <span className="text-sm font-bold text-slate-400">(Scope 1+2)</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2" data-testid="roi-recap-chips">
                      {[band, industry, method.split(" (")[0], scope.split(",")[0]].map((c) => (
                        <span key={c} className="rounded-full border border-slate-200 bg-mist px-3.5 py-1.5 text-xs font-bold text-body">
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 text-xs leading-relaxed text-slate-400" data-testid="roi-disclaimer">
                      Financial and CO2e estimates are illustrative, based on industry benchmark emissions
                      intensities and the inputs provided — not a substitute for a verified carbon footprint or
                      financial audit.
                    </p>

                    <div className="mt-8 rounded-2xl bg-navy p-7 md:p-9" data-testid="roi-lead-card">
                      {sent ? (
                        <div className="text-center">
                          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/20 text-leaf">
                            <Check className="h-7 w-7" />
                          </span>
                          <h4 className="mt-5 font-display text-xl font-extrabold text-white">Your report request is in.</h4>
                          <div className="mx-auto mt-4 max-w-md">
                            <FormSuccess testid="roi-report-success">
                              We'll send the comprehensive breakdown to {lead.email} shortly.
                            </FormSuccess>
                          </div>
                          <p className="mt-6 text-sm font-semibold text-slate-300">Want to move faster?</p>
                          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                            <ButtonLink to="/about-contact" variant="primary" testid="roi-talk-to-sales-button" arrow>
                              Talk to Our Team
                            </ButtonLink>
                            <ButtonLink to="/pricing" variant="glass" testid="roi-view-pricing-button">
                              View Pricing
                            </ButtonLink>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-display text-xl font-extrabold text-white">Get your detailed report</h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            Leave your details and we'll send a comprehensive breakdown tailored to your
                            organization.
                          </p>
                          <form onSubmit={sendReport} data-testid="roi-lead-form" className="mt-6 grid gap-4 sm:grid-cols-3">
                            <input
                              required value={lead.name} placeholder="Full Name" aria-label="Full Name"
                              onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                              className={inputDarkCls} data-testid="roi-lead-name-input"
                            />
                            <input
                              required type="email" value={lead.email} placeholder="Work Email" aria-label="Work Email"
                              onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                              className={inputDarkCls} data-testid="roi-lead-email-input"
                            />
                            <input
                              required value={lead.company} placeholder="Company Name" aria-label="Company Name"
                              onChange={(e) => setLead((l) => ({ ...l, company: e.target.value }))}
                              className={inputDarkCls} data-testid="roi-lead-company-input"
                            />
                            <div className="sm:col-span-3">
                              {error && (
                                <p className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300" data-testid="roi-lead-error">
                                  {error}
                                </p>
                              )}
                              <ButtonLink type="submit" variant="primary" testid="roi-send-report-button" disabled={sending} className="w-full py-3.5">
                                {sending ? "Sending…" : "Send My Report"}
                              </ButtonLink>
                            </div>
                          </form>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      data-testid="roi-adjust-inputs-button"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-400 transition-colors hover:text-forest"
                    >
                      <ArrowLeft className="h-4 w-4" /> Adjust inputs
                    </button>
                  </div>
                )}

                {step < 3 && (
                  <div className="mt-9 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        data-testid="roi-back-button"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-400 transition-colors hover:text-forest"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      data-testid="roi-next-button"
                      className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-dark"
                    >
                      {step === 2 ? "See your results" : "Next"}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
