import { Reveal } from "@/components/site/Motion";
import { ButtonLink } from "@/components/site/ui";

export default function CtaBanner({ eyebrow, title, sub, primary, secondary, testid = "cta-banner" }) {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
      <Reveal className="mx-auto max-w-[1400px]">
        <div
          data-testid={testid}
          className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-center md:px-16 lg:py-20"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-forest/25 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-leaf/15 blur-[110px]" />
          <div className="relative">
            {eyebrow && (
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-leaf">{eyebrow}</p>
            )}
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
            {sub && <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">{sub}</p>}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {primary && (
                <ButtonLink to={primary.to} onClick={primary.onClick} variant="primary" testid={primary.testid} arrow>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink to={secondary.to} onClick={secondary.onClick} variant="glass" testid={secondary.testid}>
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
