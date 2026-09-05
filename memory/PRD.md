# Green Mind Learning — PRD

## Original Problem Statement
Full marketing website for Green Mind Learning, an e-learning platform teaching sustainability/ESG skills to corporate trainers, HR/L&D leaders, and educational institutions. Core pitch: moving sustainability e-learning from static content to simulation-based learning — the simulation product is NOT live and must always be framed "Coming Soon" with waitlist CTAs (no working simulation player). Also a separate B2B eLearning Services line (PPT-to-eLearning conversion, course troubleshooting, LMS integration). Full brand system, sitemap (15 pages), and real copy were provided verbatim. Never use the name "Connectify".

## User Decisions (gathered via ask_human)
- No logins required (auth pages dropped this pass)
- Forms show success message only (no DB persistence)
- Dashboards will use sample/demo data (deferred to second pass)
- Scope this pass: core marketing pages first; dashboards + auth in second pass
- Design bar: Awwwards-level — kinetic masked-line hero reveals, framer-motion scroll reveals, lenis smooth scrolling, editorial marquee, numbered manifesto chapters, parallax hero

## Architecture
- React 19 + react-router-dom 7 (CRA/craco), Tailwind + shadcn/ui, framer-motion 11, lenis, recharts, lucide-react
- FastAPI backend unchanged (health endpoint only); MongoDB available but unused this pass (forms are front-end success states per user choice)
- Shared primitives in `src/components/site/`: Motion.jsx (Reveal, MaskedLines, CountUp), ui.jsx (Tag, SoonPill, ButtonLink, ArrowLink, SectionHead, FormSuccess), Navbar, Footer, Marquee, CtaBanner, MaterialCard
- All copy/data centralized in `src/data/content.js`
- Brand: navy #0B1220, forest green #1E8E4A, mist #F6F8F7; Archivo (display) + Manrope (body)

## Implemented (2026-09-05)
- Home hero rebuilt as an accessible 2-slide carousel (2026-09-05): Slide 1 = simulation e-learning pitch (forest bg), Slide 2 = advanced e-learning materials (solar bg); auto-advances every 7s, pauses on hover/focus, arrow controls + progress dots + 01/02 indicator, aria labels + aria-live, crossfade + masked-line reveal per slide
- Green palette deepened (2026-09-05): gradient forest→emerald primary buttons + nav CTA, green-tinted hero overlays, alternating green marquee items, green proof-strip numbers, global green :focus-visible ring
- Hero slide 1 photo replaced with animated "Scope Sort" simulation mock (SimVisual in Home.jsx): emissions chips auto-sort into Scope 1/2/3 columns on a loop, pulsing live dot, "Concept Preview" badge, animated 92% audit-accuracy bar, floating "+10 Correctly classified" toast
- Hero slide 3 added (sales-conversion CTA): "Your team could be training smarter by next week." — 14-day free trial framing, plans from 49€/mo, Start Free Trial → /pricing, Talk to Sales → /about-contact, proof microcopy strip; seedling photo bg
- Multi-color system (2026-09-05): TOPIC_COLORS/TOPIC_DOTS/TINTS in content.js — per-topic tag colors on material cards (Climate=sky, Circular=emerald, ESG Reporting=violet, Biodiversity=lime, Social=rose), colored dots in topic filter sidebar, varied icon tints on Home (Why Choose Us, Formats), Resources guides, Trainers features, Enterprise capabilities
- Brand recolor to official logo palette (2026-09-05): Logo.jsx rebuilt as inline SVG matching supplied logo (gradient graduation cap + tassel, dark green left leaf #177A3B, lime right leaf #8CC63E, GREEN MIND wordmark #0C4A28, LEARNING lime with flanking dashes); forest tokens now #177A3B/#0C4A28/#2E8540/#EAF6EC, new leaf token #9CD24B replaces all emerald accents site-wide (hero highlights, tags, sim visual, CTAs, footer hovers)
- Hero slide 1 background: animated HarvardX e-learning world-map GIF (media.giphy.com/media/9tA6H1madRvUc/giphy.gif) at 60% opacity under navy gradient, behind the animated Scope Sort panel
- "How It All Connects" rebuilt (2026-09-05): moved above "Who it's for"; 2×2 circuit layout (1 TL → 2 TR → 3 BR → 4 BL) with SVG connector path carrying two traveling glowing "current" packets (stroke-dashoffset loop) + 4 colored pulsing junction dots; each step card has its own color (sky/amber/violet/forest) + ghost number + pulsing bottom bar, and distinct hover physics: radar sweep (1), 3D tilt (2), wrench wiggle (3), broadcast ripple (4); keyframes in App.css (fx-spin/fx-wiggle/fx-ripple/fx-bar-pulse/fx-junction)
- "Learning designed around you" scrollytelling section (2026-09-05): components/site/CustomizeJourney.jsx inserted on Home before the services teaser — 520vh sticky scroll section, single evolving SVG system driven by useScroll progress: 6 tokens (Goals/People/Challenges/Data/Sustainability/Knowledge) scatter→connect to hub (Stage 01), branch into LEARN/EXPERIENCE cards (02), absorb Policies/Terminology/Priorities/Processes pills and tint green generic→personalised (03), assemble into abstract learning frame with play node, lesson bars, learner pulses, animated progress (04), data dots flow back + rotating 6-label loop ring UNDERSTAND→…→IMPROVE (05); left column stage copy crossfades per stage; closing CTA "Build your learning experience" → /about-contact
- Concept Showcase page (2026-09-05): /simulations/preview — hero with cyan→violet gradient "in motion.", EMBEDDED user walkthrough video (Virtual Farm audit simulation, 10s H.264 MP4 uploaded by user → hosted at /videos/walkthrough.mp4 with VP9 WebM fallback /videos/walkthrough.webm, dual-source video tag, autoplay muted loop + controls), three animated in-code work mocks (ScopeSortMini chip-sort loop, LoopMini waste-score ring, ReportMini section-tick compliance) each with bullets + notify links, waitlist CTA. Touchpoints rewired to it: Home vision "See a Concept Preview", Simulations hero "See a Concept Preview", all 3 concept cards get "See the work in motion" links. To replace the video later: overwrite /app/frontend/public/videos/walkthrough.mp4 (keep H.264) or regenerate the .webm fallback
- Pages: Home, Simulations (coming-soon + waitlist), Learning Materials (working filters/sort/duration slider/search), Resources Hub (tabs, guides, insights, blog, webinars), For Trainers (recharts stat card), For Enterprise, eLearning Services (3 anchored services), Pricing (monthly/yearly toggle, FAQ accordion, compare table), About & Contact (split contact panel + team), Search (grouped results + simulation waitlist surfacing), 404
- Global: sticky glass nav with Solutions dropdown + mobile menu, spec-exact footer, editorial marquee, lenis smooth scroll, masked-line hero reveals, parallax hero, count-up proof strips
- Forms (waitlist, contact): front-end success states only, per user decision
- data-testid on all interactive elements

## Verified
- Waitlist submit → success message; contact submit → success message
- Materials filter (Workbook → 2 cards), pricing toggle (49€/61€), FAQ accordion, trainers chart render, search "simulation" → waitlist result, 404 route
- Backend /api/ health OK

## Backlog (second pass)
- P0: Trainer Dashboard (stat cards, line chart, assigned modules table), Learner Dashboard (progress, library, certificates)
- P1: Blog/Article template page (seed: Sarah Jenkins icebreakers post); material detail/preview pages; real pagination data
- P2: Optional JWT auth if user changes mind; webinar playback; downloadable enterprise overview PDF

## Forms → Database (implemented 2026-09-05)
- POST /api/waitlist {name, email, organization, role} → `waitlist` collection; duplicate email returns existing entry (idempotent), invalid email → 422
- POST /api/contact {first_name, last_name, email, topic, message} → `contact_messages` collection
- Simulations waitlist + About contact forms POST via REACT_APP_BACKEND_URL; success state only after 200; inline error boxes (waitlist-error-message / contact-error-message); buttons disable while sending
- No public GET listing (privacy) — view submissions directly in MongoDB collections `waitlist` / `contact_messages`
- Verified: curl round-trips, duplicate handling, 422 on bad email, UI submit → 200 + success message (test signup maria@ecoteach.io)
