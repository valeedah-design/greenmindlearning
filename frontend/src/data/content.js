export const IMAGES = {
  heroForest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
  forestCanopy: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop",
  forestSun: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1600&auto=format&fit=crop",
  mistyHills: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
  forestLight: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1600&auto=format&fit=crop",
  greenAerial: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop",
  leafSun: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600&auto=format&fit=crop",
  leafHand: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop",
  windTurbines: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop",
  solarPanels: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&auto=format&fit=crop",
  circuit: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  workshop: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
  execMeeting: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  discussion: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
  conference: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop",
  paperwork: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
  penPaper: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
  mountains: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
  industry: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600&auto=format&fit=crop",
  teamHands: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  portrait1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  portrait2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  portrait3: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
};

export const MATERIALS = [
  { id: 1, title: "The Roadmap to Net Zero: Corporate Strategy", type: "Slide Deck", topic: "Climate & Energy", level: "Foundational", minutes: 45, rating: 4.9, popularity: 98, img: IMAGES.windTurbines, desc: "A boardroom-ready deck that turns net-zero commitments into a phased, measurable corporate strategy." },
  { id: 2, title: "Closing the Loop: Patagonia Case Study", type: "Case Study", topic: "Circular Economy", level: "Intermediate", minutes: 90, rating: 4.8, popularity: 92, img: IMAGES.mountains, desc: "Deconstruct how Patagonia built circularity into product design, repair, and resale — with discussion prompts." },
  { id: 3, title: "The ESG Reporting Playbook", type: "Workbook", topic: "ESG Reporting", level: "Advanced", minutes: 75, rating: 5.0, popularity: 96, img: IMAGES.penPaper, desc: "A step-by-step workbook for drafting a compliant ESG disclosure, from materiality to metrics." },
  { id: 4, title: "Ecosystem Services: Value Evaluation", type: "Assessment", topic: "Biodiversity", level: "Foundational", minutes: 20, rating: 4.7, popularity: 81, img: IMAGES.forestLight, desc: "A scored assessment that teaches learners to put defensible value on ecosystem services." },
  { id: 5, title: "The Clean Energy Transition Handbook", type: "Workbook", topic: "Climate & Energy", level: "Intermediate", minutes: 60, rating: 4.9, popularity: 89, img: IMAGES.solarPanels, desc: "Practical worksheets for planning a credible transition from fossil procurement to renewables." },
  { id: 6, title: "Supply Chain Human Rights Ethics", type: "Video Guide", topic: "Social", level: "Foundational", minutes: 35, rating: 4.6, popularity: 77, img: IMAGES.industry, desc: "A guided video walkthrough of human-rights due diligence across tiered supply chains." },
];

export const GUIDES = [
  { title: "Cognitive Load in ESG", meta: "12 min read", tag: "Foundational", desc: "How to sequence dense regulatory content so learners retain it instead of enduring it." },
  { title: "Gamifying Carbon Audits", meta: "18 min read", tag: "Interactive", desc: "Turn audit exercises into scored challenges that create productive struggle in the room." },
  { title: "Handling Greenwashing Skepticism", meta: "15 min read", tag: "Soft Skills", desc: "Facilitation techniques for the moment a trainee says: 'isn't this all just PR?'" },
];

export const INSIGHTS = [
  { title: "EU CSRD: What Trainers Need to Change by 2027", tag: "Regulation", date: "Aug 15, 2026", img: IMAGES.paperwork, desc: "The expanded reporting wave means your compliance modules need new case data — here's the diff." },
  { title: "The Rise of Blue Carbon Credits", tag: "Market Trends", date: "Aug 12, 2026", img: IMAGES.mistyHills, desc: "Coastal ecosystems are entering carbon markets. What L&D teams should teach about them now." },
];

export const BLOG_POSTS = [
  { title: "My Top 5 Icebreakers for Sustainability Workshops", author: "Sarah Jenkins", role: "Lead Trainer", desc: "Five field-tested openers that get a room of skeptical executives talking about scope 3 in under ten minutes." },
  { title: "Why I Stopped Using Slides for Module 3", author: "Marcus Thorne", role: "Director of Sustainability", desc: "I replaced my best deck with a hands-on audit exercise. Completion scores told the rest of the story." },
];

export const WEBINARS = [
  { title: "Circular Economy Training: Beyond the Basics", duration: "45:00", img: IMAGES.greenAerial },
  { title: "Remote Facilitation for Sustainability Teams", duration: "52:15", img: IMAGES.discussion },
  { title: "Mastering the New GRI Standards", duration: "38:40", img: IMAGES.paperwork },
  { title: "Designing Your First Net-Zero Workshop", duration: "41:20", img: IMAGES.conference },
];

export const FAQS = [
  { q: "Can I change my plan later?", a: "Yes. You can upgrade or downgrade at any time from your account settings. Upgrades apply immediately and are prorated; downgrades take effect at the next billing cycle." },
  { q: "Is there a free trial available?", a: "Every Trainer and Professional plan starts with a 14-day free trial — full library access, no credit card required. Enterprise pilots are scoped with our sales team." },
  { q: "Do you offer discounts for non-profits?", a: "Yes. Registered non-profits, NGOs, and accredited educational institutions receive 30% off any plan. Contact our team with proof of status to activate it." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, SEPA direct debit, and — for annual Enterprise contracts — bank transfer with invoicing." },
];

export const TIERS = [
  {
    name: "Trainer", yearly: 49, monthly: 61, popular: false,
    blurb: "Perfect for independent consultants and small-scale educators.",
    features: ["Up to 50 active students", "Full Learning Material Access", "Topic Explorer Basic Insights", "Standard Resources Hub"],
    cta: "Start Trainer Trial", to: "/about-contact",
  },
  {
    name: "Professional", yearly: 149, monthly: 186, popular: true,
    blurb: "For growing teams and institutions requiring deep analytics.",
    features: ["Up to 250 active students", "Priority Material Downloads", "Real-time Student Analytics", "Custom Branding (White-label)", "API Access for LMS Integration"],
    cta: "Upgrade to Pro", to: "/about-contact",
  },
  {
    name: "Enterprise", yearly: null, monthly: null, popular: false,
    blurb: "Full ecosystem control for large-scale organizations.",
    features: ["Unlimited students & trainers", "Dedicated Account Manager", "Custom Material Development", "Advanced Security (SSO/SAML)", "24/7 Premium Support"],
    cta: "Contact Sales", to: "/about-contact",
  },
];

export const COMPARE_ROWS = [
  { label: "Topic Explorer Access", values: ["Basic Insights", "Advanced Insights", "Full + Custom Data"] },
  { label: "Resources Downloads", values: ["Standard", "Priority", "Unlimited"] },
  { label: "Classroom Analytics", values: [null, "Real-time", "Real-time + Benchmarks"] },
  { label: "Custom URL/Domain", values: [null, true, true] },
  { label: "Support Tier", values: ["Standard", "Priority", "24/7 Premium"] },
];

export const TESTIMONIALS = [
  { quote: "Green Mind Learning's materials are the first I've used that my cohort actually asks to take home. The case studies do the heavy lifting in every session.", name: "Dr. Sarah Thompson", role: "Global Sustainability Lead, GreenPath", initials: "ST" },
  { quote: "I cut my preparation time in half. The trainer guides read like a colleague walking you through the room before you ever enter it.", name: "James Miller", role: "Independent ESG Consultant", initials: "JM" },
  { quote: "Rigorous, current, and classroom-ready. My students rated the circular-economy module the best of the entire term.", name: "Marcus Chen", role: "Sustainability Professor, LSE", initials: "MC" },
];

export const TEAM = [
  { name: "Rabeeh Kallara Kalattummal", role: "Engineering & Technology", img: IMAGES.portrait1, bio: "Builds the platform's technical backbone — from simulation architecture to accessible, performant front-end engineering." },
  { name: "Valeed Abdul Hameed", role: "Urban Studies, ESG & Design Research", img: IMAGES.portrait2, bio: "Bridges urban systems research and design, turning dense regulation into frameworks people can actually use." },
  { name: "Razin Abdullah", role: "Learning & Development", img: IMAGES.portrait3, bio: "Designs the pedagogy behind every module — measurable outcomes, real practice, no filler." },
];

export const MARQUEE_ITEMS = ["Net Zero", "Carbon Accounting", "CSRD Ready", "GRI Aligned", "Circular Economy", "Scope 1 · 2 · 3", "Biodiversity", "ESG Disclosure", "ISO 14001", "Life Cycle Assessment"];

export const TOPICS = ["Climate & Energy", "Circular Economy", "ESG Reporting", "Biodiversity", "Social"];
export const MATERIAL_TYPES = ["Slide Deck", "Case Study", "Assessment", "Workbook", "Video Guide"];
export const LEVELS = ["Foundational", "Intermediate", "Advanced"];
