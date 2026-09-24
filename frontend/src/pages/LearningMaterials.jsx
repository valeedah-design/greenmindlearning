import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, RotateCcw, Leaf } from "lucide-react";
import { Reveal } from "@/components/site/Motion";
import { ButtonLink, Tag, inputCls } from "@/components/site/ui";
import MaterialCard from "@/components/site/MaterialCard";
import MaterialDetailModal from "@/components/site/MaterialDetailModal";

const SORTS = ["Latest Arrivals", "Title A–Z"];
const LEVELS = ["Foundational", "Intermediate", "Advanced"];

function FilterGroup({ title, children, testid }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6" data-testid={testid}>
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
      <div className="mt-4 space-y-2.5">{children}</div>
    </div>
  );
}

export default function LearningMaterials() {
  const [materials, setMaterials] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [topics, setTopicsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Latest Arrivals");
  const [types, setTypes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [levels, setLevels] = useState([]);
  const [maxMinutes, setMaxMinutes] = useState(240);
  const [openMaterial, setOpenMaterial] = useState(null);

  useEffect(() => {
    const base = process.env.REACT_APP_BACKEND_URL;
    // Uploaded images are stored in Vercel Blob and already come back as full
    // https:// URLs — only prepend the backend's own origin for older/relative
    // paths (e.g. "/uploads/xxx.png"). Without this check, an already-absolute
    // Blob URL gets `base` glued onto the front, producing a broken URL like
    // "https://backend.vercel.apphttps://...blob.vercel-storage.com/...".
    const withBase = (u) => (!u ? null : /^https?:\/\//i.test(u) ? u : `${base}${u}`);
    Promise.all([
      fetch(`${base}/api/materials`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${base}/api/materials/taxonomy/types`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${base}/api/materials/taxonomy/topics`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([m, t, tp]) => {
        setMaterials(
          m.map((item) => ({
            ...item,
            thumbnail: withBase(item.thumbnail),
            images: (item.images || []).map(withBase),
          }))
        );
        setMaterialTypes(t);
        setTopicsList(tp);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const typeColorMap = useMemo(() => Object.fromEntries(materialTypes.map((t) => [t.name, t.color])), [materialTypes]);
  const topicColorMap = useMemo(() => Object.fromEntries(topics.map((t) => [t.name, t.color])), [topics]);

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  const reset = () => {
    setQuery(""); setSort("Latest Arrivals"); setTypes([]); setSelectedTopics([]); setLevels([]); setMaxMinutes(240);
  };

  const results = useMemo(() => {
    let r = materials.filter(
      (m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) &&
        (types.length === 0 || types.includes(m.type)) &&
        (selectedTopics.length === 0 || selectedTopics.includes(m.topic)) &&
        (levels.length === 0 || levels.includes(m.level)) &&
        m.minutes <= maxMinutes
    );
    if (sort === "Title A–Z") r = [...r].sort((a, b) => a.title.localeCompare(b.title));
    else r = [...r].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return r;
  }, [materials, query, sort, types, selectedTopics, levels, maxMinutes]);

  const filtered = query || types.length || selectedTopics.length || levels.length || maxMinutes < 240;

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
              {materialTypes.map((t) => (
                <label key={t.id} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="checkbox"
                    data-testid={`filter-type-${t.name.toLowerCase().replace(/ /g, "-")}`}
                    checked={types.includes(t.name)}
                    onChange={() => toggle(types, setTypes, t.name)}
                    className={checkCls}
                  />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Topic" testid="filter-topic">
              {topics.map((t) => (
                <label key={t.id} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-body">
                  <input
                    type="checkbox"
                    data-testid={`filter-topic-${t.name.toLowerCase().replace(/ & | /g, "-")}`}
                    checked={selectedTopics.includes(t.name)}
                    onChange={() => toggle(selectedTopics, setSelectedTopics, t.name)}
                    className={checkCls}
                  />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
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
              {loading ? "Loading…" : filtered ? `Showing ${results.length} of ${materials.length} results` : `Showing ${materials.length} results`}
            </p>
            {!loading && results.length === 0 ? (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center" data-testid="materials-empty-state">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-light text-forest">
                  <Leaf className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {materials.length === 0 ? "Materials are on the way." : "Nothing matches those filters yet."}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-body">
                  {materials.length === 0
                    ? "Our team is adding the library through the admin — check back soon."
                    : "Try widening the duration or clearing a topic — new materials are added every month."}
                </p>
                {materials.length > 0 && (
                  <div className="mt-6">
                    <ButtonLink onClick={reset} variant="outline" testid="materials-empty-reset-button">Clear Filters</ButtonLink>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((m, i) => (
                  <MaterialCard
                    key={m.id}
                    m={m}
                    delay={i * 0.05}
                    onOpen={setOpenMaterial}
                    typeColor={typeColorMap[m.type]}
                    topicColor={topicColorMap[m.topic]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <MaterialDetailModal
        material={openMaterial}
        onClose={() => setOpenMaterial(null)}
        typeColor={openMaterial && typeColorMap[openMaterial.type]}
        topicColor={openMaterial && topicColorMap[openMaterial.topic]}
      />

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
