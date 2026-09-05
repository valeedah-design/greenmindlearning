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
- P2: Optional JWT auth if user changes mind; persist waitlist/contact to MongoDB; webinar playback; downloadable enterprise overview PDF
