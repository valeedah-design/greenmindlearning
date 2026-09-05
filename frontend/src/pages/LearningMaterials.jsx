import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, RotateCcw, Leaf } from "lucide-react";
import { Reveal } from "@/components/site/Motion";
import { ButtonLink, Tag, inputCls } from "@/components/site/ui";
import MaterialCard from "@/components/site/MaterialCard";
import { MATERIALS, TOPICS, MATERIAL_TYPES, LEVELS, TOPIC_DOTS } from "@/data/content";

const SORTS = ["Latest Arrivals", "Most Popular", "Highest Rated"];

function FilterGroup({ title, children, testid }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6" data-testid={testid}>
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
      <div className="mt-4 space-y-2.5">{children}</div>
    </div>
  );
}

export default function LearningMaterials() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Latest Arrivals");
  const [types, setTypes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [levels, setLevels] = useState([]);
  const [maxMinutes, setMaxMinutes] = useState(240);

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  const reset = () => {
    setQuery(""); setSort("Latest Arrivals"); setTypes([]); setTopics([]); setLevels([]); setMaxMinutes(240);
  };

  const results = useMemo(() => {
    let r = MATERIALS.filter(
      (m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) &&
        (types.length === 0 || types.includes(m.type)) &&
        (topics.length === 0 || topics.includes(m.topic)) &&
        (levels.length === 0 || levels.includes(m.level)) &&
        m.minutes <= maxMinutes
    );
    if (sort === "Most Popular") r = [...r].sort((a, b) => b.popularity - a.popularity);
    if (sort === "Highest Rated") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [query, sort, types, topics, levels, maxMinutes]);

  const filtered = query || types.length || topics.length || levels.length || maxMinutes < 240;

  const checkCls = "h-4 w-4 rounded border-slate-300 text-forest accent-[#1E8E4A]";

  return (
    <div data-testid="learning-materials-page">
      {/* HEADER */}
      <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Tag>The Library</Tag>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-black tracking-tight text-ink md:text-5xl">
              Learning <span className="text-forest">Materials.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-body">
              Access our comprehensive collection of ESG modules, trainer guides, and interactive tools
              designed to accelerate the green transition.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                data-testid="materials-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search materials, topics, formats…"
                className={`${inputCls} pl-11`}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-mist px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[260px_1fr]">
          {/* FILTERS */}
          <aside className="space-y-5" data-testid="materials-filters">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-extrabold text-ink">
                <SlidersHorizontal className="h-4 w-4 text-forest" /> Filters
              </span>
              <button
                type="button"
                data-testid="materials-reset-filters-button"
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-forest"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            <FilterGroup title="Sort By" testid="filter-sort">
              {SORTS.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="radio"
                    name="sort"
                    data-testid={`filter-sort-${s.toLowerCase().replace(/ /g, "-")}`}
                    checked={sort === s}
                    onChange={() => setSort(s)}
                    className={checkCls}
                  />
                  {s}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Material Type" testid="filter-type">
              {MATERIAL_TYPES.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="checkbox"
                    data-testid={`filter-type-${t.toLowerCase().replace(/ /g, "-")}`}
                    checked={types.includes(t)}
                    onChange={() => toggle(types, setTypes, t)}
                    className={checkCls}
                  />
                  {t}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Topic" testid="filter-topic">
              {TOPICS.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="checkbox"
                    data-testid={`filter-topic-${t.toLowerCase().replace(/ & | /g, "-")}`}
                    checked={topics.includes(t)}
                    onChange={() => toggle(topics, setTopics, t)}
                    className={checkCls}
                  />
                  <span className={`h-2.5 w-2.5 rounded-full ${TOPIC_DOTS[t] || "bg-forest"}`} />
                  {t}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Level" testid="filter-level">
              {LEVELS.map((l) => (
                <label key={l} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="checkbox"
                    data-testid={`filter-level-${l.toLowerCase()}`}
                    checked={levels.includes(l)}
                    onChange={() => toggle(levels, setLevels, l)}
                    className={checkCls}
                  />
                  {l}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Duration" testid="filter-duration">
              <input
                type="range"
                min="15"
                max="240"
                step="15"
                value={maxMinutes}
                data-testid="filter-duration-slider"
                onChange={(e) => setMaxMinutes(Number(e.target.value))}
                className="w-full accent-[#1E8E4A]"
              />
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>15 min</span>
                <span className="text-forest">{maxMinutes >= 240 ? "4+ hours" : `≤ ${maxMinutes} min`}</span>
              </div>
            </FilterGroup>
          </aside>

          {/* GRID */}
          <div>
            <p className="mb-6 text-sm font-semibold text-slate-500" data-testid="materials-result-count">
              {filtered ? `Showing ${results.length} of 128 results` : "Showing 128 results"}
            </p>
            {results.length === 0 ? (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center" data-testid="materials-empty-state">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-light text-forest">
                  <Leaf className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">Nothing matches those filters yet.</h3>
                <p className="mt-2 max-w-sm text-sm text-body">Try widening the duration or clearing a topic — new materials are added every month.</p>
                <div className="mt-6">
                  <ButtonLink onClick={reset} variant="outline" testid="materials-empty-reset-button">Clear Filters</ButtonLink>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((m, i) => (
                  <MaterialCard key={m.id} m={m} delay={i * 0.05} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="mt-12 flex items-center justify-center gap-2" data-testid="materials-pagination">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  data-testid={`pagination-page-${p}`}
                  className={`h-10 w-10 rounded-full text-sm font-bold transition-all ${
                    p === 1 ? "bg-forest text-white" : "border border-slate-200 bg-white text-slate-500 hover:border-forest hover:text-forest"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-1 text-slate-400">…</span>
              <button type="button" data-testid="pagination-page-12" className="h-10 w-10 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-500 transition-all hover:border-forest hover:text-forest">
                12
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER — green */}
      <section className="bg-mist px-6 pb-24 lg:px-10">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-14 text-center md:px-16" data-testid="materials-cta-banner">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl text-balance">
              Need these materials for a larger team?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
              Our trainer-led solutions offer enterprise-grade licensing and white-label options for corporate
              institutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink to="/solutions/enterprise" variant="white" testid="materials-cta-enterprise-button" arrow>
                For Enterprise Solutions
              </ButtonLink>
              <ButtonLink to="/pricing" variant="glass" testid="materials-cta-pricing-button">
                View Pricing Plans
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
