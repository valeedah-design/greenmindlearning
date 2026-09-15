import { Home, BookOpen, Newspaper, Quote, HelpCircle } from "lucide-react";

// Single source of truth for the admin's sidebar + dashboard cards.
// Each section is named after the PUBLIC PAGE it affects, per the admin's
// core UX principle: staff should never wonder "where do I go to change X".
export const NAV_SECTIONS = [
  {
    to: "trusted-by",
    navLabel: "Trusted-by logos",
    publicPage: "Home",
    cardTitle: "Home — Trusted-by logos strip",
    description: "Manage the client logo strip shown near the top of the Home page.",
    icon: Home,
  },
  {
    to: "materials",
    navLabel: "Learning Materials",
    publicPage: "Learning Materials",
    cardTitle: "Learning Materials — courses & categories",
    description: "Add, edit and organize courses, plus the types & topics used to tag and filter them.",
    icon: BookOpen,
  },
  {
    to: "insights",
    navLabel: "Industry Insights",
    publicPage: "Resources Hub",
    cardTitle: "Resources Hub — Industry Insights",
    description: "Manage the news & insight links shown on the Resources Hub page.",
    icon: Newspaper,
  },
  {
    to: "testimonials",
    navLabel: "Testimonials",
    publicPage: "For Trainers",
    cardTitle: "For Trainers — Testimonials",
    description: "Manage trainer testimonials and whether they're shown on the For Trainers page.",
    icon: Quote,
  },
  {
    to: "faq",
    navLabel: "Pricing FAQ",
    publicPage: "Pricing",
    cardTitle: "Pricing — FAQ",
    description: "Manage the frequently asked questions shown on the Pricing page.",
    icon: HelpCircle,
  },
];

export default NAV_SECTIONS;
