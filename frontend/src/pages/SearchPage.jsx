import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Leaf, Cpu, FileText, BookOpen, PenLine } from "lucide-react";
import { Reveal } from "@/components/site/Motion";
import { ButtonLink, ArrowLink, Tag, SoonPill, inputCls } from "@/components/site/ui";
import { MATERIALS, GUIDES, INSIGHTS, BLOG_POSTS, TOPICS, LEVELS } from "@/data/content";

export default function SearchPage() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "carbon accounting");
  const [topics, setTopics] = useState([]);
  const [levels, setLevels] = useState([]);

  const query = q.trim().toLowerCase();
  const match = (t) => t.toLowerCase().includes(query);

  const materials = useMemo(
    () =>
      MATERIALS.filter(
        (m) =>
          (query === "" || match(m.title) || match(m.type) || match(m.topic) || match(m.desc)) &&
          (topics.length === 0 || topics.includes(m.topic)) &&
          (levels.length === 0 || levels.includes(m.level))
      ),
    [query, topics, levels]
  );

  const articles = useMemo(
    () => [...GUIDES.map((g) => ({ ...g, kind: "Guide" })), ...INSIGHTS.map((a) => ({ ...a, kind: "Insight" }))].filter(
      (a) => query === "" || match(a.title) || match(a.desc) || match(a.tag)
    ),
    [query]
  );

  const posts = useMemo(
    () => BLOG_POSTS.filter((p) => query === "" || match(p.title) || match(p.desc) || match(p.author)),
    [query]
  );

  const showSim = query !== "" && ("simulation".includes(query) || query.includes("simul"));
  const empty = materials.length === 0 && articles.length === 0 && posts.length === 0 && !showSim;

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  return (
    <div data-testid="search-page">
      <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <Tag>Search</Tag>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-ink md:text-5xl">
              What do you want to <span className="text-forest">learn?</span>
            </h1>
            <div className="relative mt-8">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                data-testid="search-query-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search materials, articles, blog posts…"
                className={`${inputCls} py-4 pl-13 text-base`}
                style={{ paddingLeft: "3.25rem" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[240px_1fr]">
          {/* FILTERS */}
          <aside className="space-y-5" data-testid="search-filters">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Topic</h3>
              <div className="mt-4 space-y-2.5">
                {TOPICS.map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                    <input type="checkbox" checked={topics.includes(t)} onChange={() => toggle(topics, setTopics, t)} className="h-4 w-4 accent-[#1E8E4A]" data-testid={`search-filter-topic-${t.toLowerCase().replace(/ & | /g, "-")}`} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Level</h3>
              <div className="mt-4 space-y-2.5">
                {LEVELS.map((l) => (
                  <label key={l} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                    <input type="checkbox" checked={levels.includes(l)} onChange={() => toggle(levels, setLevels, l)} className="h-4 w-4 accent-[#1E8E4A]" data-testid={`search-filter-level-${l.toLowerCase()}`} />
                    {l}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RESULTS */}
          <div className="space-y-12">
            {showSim && (
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-navy p-8" data-testid="search-simulation-result">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-forest/25 blur-[80px]" />
                  <div className="relative flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest/15 text-emerald-400">
                        <Cpu className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-xl font-extrabold tracking-tight text-white">Green Mind Simulations</h3>
                          <SoonPill />
                        </div>
                        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate-400">
                          Simulation-based ESG training is on our near-term roadmap — not live yet. Join the
                          waitlist to get early access when it opens.
                        </p>
                      </div>
                    </div>
                    <ButtonLink to="/simulations" variant="primary" testid="search-simulation-cta" arrow>
                      Join the Waitlist
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            )}

            {empty ? (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center" data-testid="search-empty-state">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-light text-forest">
                  <Leaf className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">No results for "{q}".</h3>
                <p className="mt-2 max-w-sm text-sm text-body">Try a broader term like "carbon", "ESG", or "circular" — or browse the full library.</p>
                <div className="mt-6">
                  <ButtonLink to="/learning-materials" variant="primary" testid="search-empty-browse-button" arrow>
                    Browse Learning Materials
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <>
                {materials.length > 0 && (
                  <ResultGroup
                    icon={FileText}
                    title="Learning Materials"
                    items={materials.slice(0, 3).map((m) => ({ title: m.title, meta: `${m.type} · ${m.topic} · ${m.level} · ${m.minutes}m` }))}
                    linkLabel="See all in Learning Materials"
                    linkTo="/learning-materials"
                    testid="search-group-materials"
                  />
                )}
                {articles.length > 0 && (
                  <ResultGroup
                    icon={BookOpen}
                    title="Resources Hub Articles"
                    items={articles.slice(0, 3).map((a) => ({ title: a.title, meta: `${a.kind} · ${a.tag}` }))}
                    linkLabel="See all in Resources Hub"
                    linkTo="/resources"
                    testid="search-group-articles"
                  />
                )}
                {posts.length > 0 && (
                  <ResultGroup
                    icon={PenLine}
                    title="Blog Posts"
                    items={posts.slice(0, 3).map((p) => ({ title: p.title, meta: `By ${p.author}` }))}
                    linkLabel="See all in Trainer Blog"
                    linkTo="/resources"
                    testid="search-group-blog"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultGroup({ icon: Icon, title, items, linkLabel, linkTo, testid }) {
  return (
    <Reveal>
      <section data-testid={testid}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-light text-forest">
            <Icon className="h-4.5 w-4.5" />
          </span>
          <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">{title}</h2>
        </div>
        <div className="mt-5 space-y-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="font-display text-base font-bold tracking-tight text-ink">{it.title}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-500">{it.meta}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ArrowLink to={linkTo} testid={`${testid}-see-all-link`}>{linkLabel}</ArrowLink>
        </div>
      </section>
    </Reveal>
  );
}
