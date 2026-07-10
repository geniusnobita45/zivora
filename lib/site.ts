export const site = {
  name: "ZIVORA",
  tagline: "Automate · Innovate · Elevate",
  descriptor: "We don't just build websites — we engineer revenue machines. AI-powered automation, stunning digital experiences, and growth systems that work while you sleep.",
  email: "aryansharma@zivoraai.co.in",
  phone: "+91 98765 43210",
  location: "India · Serving clients worldwide",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Clients", href: "#clients" },
    { label: "Owner", href: "#owner" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const services = [
  {
    number: "01",
    title: "AI Automation",
    short: "Stop hiring for tasks a machine can do better, faster, and 24/7.",
    detail: "We build AI agents that capture leads, respond in seconds, follow up relentlessly, update your CRM, and handle support — so your team focuses on closing deals, not chasing them.",
    icon: "bot",
    tags: ["AI Agents", "CRM Sync", "Auto Follow-ups"],
  },
  {
    number: "02",
    title: "Premium Websites",
    short: "Your website should make money, not just look pretty.",
    detail: "We craft stunning, conversion-obsessed websites with 3D experiences, blazing speed, and strategic UX — every pixel designed to turn visitors into paying customers.",
    icon: "web",
    tags: ["3D Web", "Full-Stack", "High Conversion"],
  },
  {
    number: "03",
    title: "Custom AI Tools",
    short: "What if your business had its own AI brain? We build it.",
    detail: "From internal copilots that answer your team's questions instantly to customer-facing AI products that wow users — we create AI tools tailored to your exact workflow.",
    icon: "spark",
    tags: ["LLMs", "RAG Systems", "Voice AI"],
  },
  {
    number: "04",
    title: "Revenue Growth",
    short: "Turn your content into a cash-generating machine.",
    detail: "We architect your entire content operation — site structure, SEO foundations, performance optimization, and monetization strategy — so every article, video, and page earns its keep.",
    icon: "chart",
    tags: ["Content Ops", "SEO", "Monetization"],
  },
  {
    number: "05",
    title: "Social Domination",
    short: "Stop posting randomly. Start owning your audience.",
    detail: "We build your social media engine — strategic content calendars, scroll-stopping visuals, automated publishing, and AI-powered repurposing — so you're everywhere, effortlessly.",
    icon: "social",
    tags: ["Brand Strategy", "Content", "Growth"],
  },
  {
    number: "06",
    title: "Paid Acquisition",
    short: "Every rupee you spend on ads should bring back five.",
    detail: "We wire your ads directly to landing pages, tracking pixels, and automated nurture sequences — so leads don't just click, they convert and buy.",
    icon: "target",
    tags: ["Meta Ads", "Funnels", "ROI Tracking"],
  },
] as const;

export const systemCards = [
  {
    eyebrow: "AUTOMATE",
    title: "Leads respond. You don't have to.",
    description: "While your competitors take 6 hours to reply, your AI responds in 6 seconds — qualifying, routing, and following up automatically. No lead ever goes cold again.",
    metrics: ["6-second response", "Auto-qualification", "CRM sync"],
    className: "system-violet",
  },
  {
    eyebrow: "CREATE",
    title: "One idea. Seven platforms. Zero effort.",
    description: "Record one video or write one article — our system repurposes it into tweets, reels, carousels, blogs, and emails. Your brand is everywhere without you being everywhere.",
    metrics: ["Multi-platform", "Brand-consistent", "AI-assisted"],
    className: "system-cyan",
  },
  {
    eyebrow: "CONVERT",
    title: "Know exactly which rupee made you money.",
    description: "Ads, landing pages, analytics, and CRM — all connected. You'll see the exact path from first ad click to signed contract. No guessing, no wasted budget.",
    metrics: ["End-to-end tracking", "Faster pages", "Smart handoff"],
    className: "system-gold",
  },
] as const;

export const processSteps = [
  { step: "01", title: "Deep Dive", text: "We don't start with tech — we start with your business. Your revenue model, your bottlenecks, your customers' journey, and where money is being left on the table." },
  { step: "02", title: "Blueprint", text: "We design the exact system your business needs — what stays human, what gets automated, what gets tracked. You see the plan before we write a single line of code." },
  { step: "03", title: "Build & Launch", text: "We design, develop, integrate, and battle-test everything as one connected product. No half-baked MVPs — you get a system that works from day one." },
  { step: "04", title: "Scale & Optimize", text: "We monitor real performance data, spot opportunities you'd miss, and continuously optimize. Your system gets smarter and more profitable every month." },
] as const;


export const projectProgram = [
  {
    number: "01",
    title: "Client Websites",
    description: "A future home for premium websites, landing pages, and full-stack experiences built by Zivora.",
    tags: ["Case study", "Design", "Deployment"],
  },
  {
    number: "02",
    title: "AI Automation Systems",
    description: "Document the automations, AI agents, CRM workflows, and internal tools we build for businesses.",
    tags: ["Automation", "AI agents", "Workflow"],
  },
  {
    number: "03",
    title: "Growth & Revenue Engines",
    description: "Show campaigns, funnels, dashboards, and operating systems that helped clients grow with clarity.",
    tags: ["Funnels", "Analytics", "Scale"],
  },
] as const;

export const clientProfileSlots = [
  { label: "Profile 01", focus: "Business identity", detail: "Client name, industry, location, and the problem we solved will appear here." },
  { label: "Profile 02", focus: "Result snapshot", detail: "Add client outcomes, testimonial notes, metrics, and the services delivered." },
  { label: "Profile 03", focus: "Partnership story", detail: "Use this slot for long-term collaborators, ongoing retainers, or featured partners." },
] as const;

export const ownerProfile = {
  name: "Aryan Sharma",
  role: "Owner of Zivora · AI Automation Engineer",
  portfolioUrl: "https://zivoraai.co.in/#owner",
  summary: "Aryan builds AI-powered products, automation systems, machine-learning workflows, and premium full-stack experiences. Zivora carries that same builder mindset into client work: intelligent systems, clean execution, and digital products made to scale.",
  highlights: ["AI automation engineer", "Full-stack product builder", "Generative AI and workflow systems", "Premium web experiences"],
  stats: [
    { value: "20+", label: "AI projects explored" },
    { value: "6+", label: "products built" },
    { value: "2+", label: "years building" },
  ],
} as const;


