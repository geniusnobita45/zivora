export const site = {
  name: "Zivora AI",
  domain: "zivoraai.co.in",
  tagline: "Automate · Innovate · Scale",
  descriptor: "Zivora AI builds practical websites, automations, AI tools, and growth workflows that help businesses capture leads, follow up faster, and reduce manual work.",
  email: "aryansharma@zivoraai.co.in",
  phone: "+91 95690 65509",
  phones: [
    { label: "+91 95690 65509", href: "tel:+919569065509" },
    { label: "+91 80547 85509", href: "tel:+918054785509" },
  ],
  location: "Kanpur Nagar, Uttar Pradesh, India",
  social: {
    instagram: "https://www.instagram.com/zivoraagency01?igsh=MWJ6b3c2dDE2YzhwMA==",
    github: "https://github.com/geniusnobita45",
  },
  nav: [
    { label: "Services", href: "/ai-automation-services" },
    { label: "Clinics", href: "/ai-automation-for-clinics" },
    { label: "Case Study", href: "/case-studies/nobi-ai-assistant" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const services = [
  {
    number: "01",
    title: "AI Automation",
    href: "/ai-automation-services",
    short: "Turn missed leads and repeated admin tasks into a clear automated workflow.",
    detail: "We build enquiry capture, qualification, reminders, CRM or sheet updates, team alerts, and follow-up sequences around the way your business already works.",
    icon: "bot",
    tags: ["Lead Capture", "Follow-ups", "CRM Sync"],
  },
  {
    number: "02",
    title: "Website Development",
    href: "/website-development",
    short: "Get a fast website that explains your offer and sends enquiries to the right place.",
    detail: "We plan and build homepage, service pages, contact forms, SEO metadata, and conversion paths so visitors understand what you do and how to contact you.",
    icon: "web",
    tags: ["Service Pages", "Lead Forms", "SEO Base"],
  },
  {
    number: "03",
    title: "Custom AI Tools",
    href: "/ai-tools-development",
    short: "Build a private AI helper for one real job inside your business.",
    detail: "We create internal copilots, support helpers, content assistants, lead classifiers, or report tools using your documents, rules, examples, and workflow.",
    icon: "spark",
    tags: ["AI Copilots", "RAG", "Dashboards"],
  },
  {
    number: "04",
    title: "Content & AdSense Growth",
    href: "/adsense-growth",
    short: "Structure your content site for useful pages, internal links, and monetization readiness.",
    detail: "We map topic clusters, improve page structure, create content briefs, fix technical basics, and help you read Search Console data without chasing random keywords.",
    icon: "chart",
    tags: ["Topic Clusters", "Internal Links", "Search Console"],
  },
  {
    number: "05",
    title: "Social Media Systems",
    href: "/social-media-management",
    short: "Make posting easier with a repeatable content plan tied to your services.",
    detail: "We define content pillars, monthly topics, repurposing workflows, publishing checklists, and CTAs that point people back to your website or enquiry flow.",
    icon: "social",
    tags: ["Content Pillars", "Repurposing", "Publishing Flow"],
  },
  {
    number: "06",
    title: "Paid Ad Funnels",
    href: "/paid-advertising",
    short: "Improve the page, form, tracking, and follow-up behind your ad campaigns.",
    detail: "We build campaign landing pages, connect form notifications, set up lead tracking support, and create follow-up workflows so ad enquiries do not go cold.",
    icon: "target",
    tags: ["Landing Pages", "Tracking", "Lead Follow-up"],
  },
] as const;

export const systemCards = [
  {
    eyebrow: "CAPTURE",
    title: "Every enquiry gets a next step.",
    description: "Website forms, WhatsApp messages, and ad leads can be captured, tagged, assigned, and followed up without waiting for someone to remember.",
    metrics: ["Lead status", "Team alerts", "Follow-up rules"],
    className: "system-violet",
  },
  {
    eyebrow: "CREATE",
    title: "Your service message becomes reusable content.",
    description: "One strong offer can become service pages, social posts, FAQs, landing pages, and follow-up messages that all say the same clear thing.",
    metrics: ["Service pages", "Content pillars", "Clear CTAs"],
    className: "system-cyan",
  },
  {
    eyebrow: "MEASURE",
    title: "Know what is working before scaling it.",
    description: "Forms, analytics, lead sources, and campaign pages are connected so you can see where enquiries come from and where the workflow needs improvement.",
    metrics: ["Source tracking", "Faster pages", "Better handoff"],
    className: "system-gold",
  },
] as const;

export const processSteps = [
  { step: "01", title: "Map The Workflow", text: "We document your current website, leads, tools, follow-ups, content, and bottlenecks before suggesting any build." },
  { step: "02", title: "Define The System", text: "We decide what pages, automations, fields, messages, approvals, and tracking your business actually needs." },
  { step: "03", title: "Build & Connect", text: "We build the website, automation, AI tool, or funnel and connect it to forms, sheets, CRM, WhatsApp, email, or analytics." },
  { step: "04", title: "Launch & Improve", text: "We test with real examples, hand over the workflow, and use performance data to improve the system after launch." },
] as const;

export const ownerProfile = {
  name: "Aryan Sharma",
  role: "Owner of Zivora · AI Automation Engineer",
  portfolioUrl: "https://zivoraai.co.in/#owner",
  summary: "Aryan builds AI-powered products, automation systems, machine-learning workflows, and premium full-stack experiences. Zivora turns that builder mindset into client work: clear websites, practical automations, useful AI tools, and growth systems that can be operated after launch.",
  highlights: ["AI automation engineer", "Full-stack product builder", "Generative AI and workflow systems", "Premium web experiences"],
  stats: [
    { value: "20+", label: "AI projects explored" },
    { value: "6+", label: "products built" },
    { value: "2+", label: "years building" },
  ],
} as const;