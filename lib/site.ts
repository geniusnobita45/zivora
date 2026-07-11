export const site = {
  name: "Zivora AI",
  domain: "zivoraai.co.in",
  tagline: "We Build the Systems That Grow Your Business",
  descriptor: "Zivora AI partners with businesses to build high-converting websites, intelligent automation pipelines, custom AI tools, and growth systems — so you close more deals, save more hours, and scale without the chaos.",
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
    { label: "Home", href: "#top" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Owner", href: "#owner" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const services = [
  {
    number: "01",
    title: "AI Automation",
    href: "/ai-automation-services",
    short: "Stop losing leads to slow response times and manual follow-ups.",
    detail: "We design and deploy automated pipelines that capture every enquiry, qualify leads instantly, trigger follow-ups, sync with your CRM, and alert your team — so no opportunity falls through the cracks.",
    icon: "bot",
    tags: ["Lead Capture", "Smart Follow-ups", "CRM Sync"],
  },
  {
    number: "02",
    title: "Website Development",
    href: "/website-development",
    short: "Your website should be your best salesperson — working 24/7.",
    detail: "We build conversion-optimized websites with compelling service pages, strategic CTAs, integrated lead forms, and SEO foundations that turn visitors into paying clients.",
    icon: "web",
    tags: ["Conversion Pages", "Lead Funnels", "SEO Ready"],
  },
  {
    number: "03",
    title: "Custom AI Tools",
    href: "/ai-tools-development",
    short: "Give your team an AI-powered assistant built for your exact workflow.",
    detail: "From internal knowledge bots and support copilots to content generators and lead classifiers — we build AI tools trained on your data, your rules, and your business logic.",
    icon: "spark",
    tags: ["AI Copilots", "RAG Systems", "Custom Dashboards"],
  },
  {
    number: "04",
    title: "Content & AdSense Growth",
    href: "/adsense-growth",
    short: "Turn your content into a revenue engine with structure and strategy.",
    detail: "We map topic clusters, optimize internal linking, create high-value content briefs, fix technical SEO, and help you read Search Console data to grow organic traffic and ad revenue.",
    icon: "chart",
    tags: ["Topic Strategy", "SEO Optimization", "Revenue Growth"],
  },
  {
    number: "05",
    title: "Social Media Systems",
    href: "/social-media-management",
    short: "Post consistently, build authority, and drive traffic to your offers.",
    detail: "We set up content pillars, monthly calendars, repurposing workflows, and publishing systems tied to your services — so every post moves your audience closer to becoming a client.",
    icon: "social",
    tags: ["Content Strategy", "Brand Authority", "Audience Growth"],
  },
  {
    number: "06",
    title: "Paid Ad Funnels",
    href: "/paid-advertising",
    short: "Make every rupee of ad spend count with optimized landing and follow-up.",
    detail: "We build high-converting landing pages, connect tracking pixels, set up lead notifications, and create follow-up sequences so your paid traffic converts — not bounces.",
    icon: "target",
    tags: ["Landing Pages", "Conversion Tracking", "ROI Optimization"],
  },
] as const;


export const projects = [
  {
    number: "01",
    title: "NOBI AI Assistant",
    href: "/case-studies/nobi-ai-assistant",
    description: "An advanced AI assistant showcasing multi-step reasoning, browser automation, and intelligent workflow orchestration — demonstrating the kind of AI systems we build for clients.",
    tags: ["AI Assistant", "Automation", "Case Study"],
  },
  {
    number: "02",
    title: "Aryan's Project Portfolio",
    href: "https://portfolio-backend-7kau.onrender.com",
    description: "Explore the deployed portfolio of AI experiments, web products, automation frameworks, and open-source tools built by Zivora's founder.",
    tags: ["Portfolio", "Open Source", "AI & Web"],
  },
] as const;

export const systemCards = [
  {
    eyebrow: "CAPTURE",
    title: "Every lead gets an instant next step.",
    description: "Website forms, WhatsApp messages, and ad leads are automatically captured, tagged, and routed to the right team member with instant follow-up — no lead left waiting.",
    metrics: ["Instant routing", "Smart tagging", "Auto follow-up"],
    className: "system-violet",
  },
  {
    eyebrow: "CREATE",
    title: "Your expertise becomes scalable content.",
    description: "We turn your core service message into a content machine — service pages, social posts, email sequences, and landing pages that all speak with one powerful voice.",
    metrics: ["Service pages", "Content systems", "Unified messaging"],
    className: "system-cyan",
  },
  {
    eyebrow: "MEASURE",
    title: "Know exactly what's driving results.",
    description: "Every form submission, page view, and campaign click is tracked and connected — giving you a clear dashboard of what's working and where to double down.",
    metrics: ["Source tracking", "Performance data", "Growth insights"],
    className: "system-gold",
  },
] as const;

export const processSteps = [
  { step: "01", title: "Discovery & Audit", text: "We dive deep into your current setup — website, lead flow, tools, content, and bottlenecks — to understand exactly where growth is being left on the table." },
  { step: "02", title: "Strategy & Blueprint", text: "We architect the exact system your business needs — which pages to build, what to automate, which tools to connect, and how data should flow between them." },
  { step: "03", title: "Build & Integrate", text: "Our team builds your website, automation workflows, AI tools, or ad funnels — and connects everything to your existing CRM, WhatsApp, email, and analytics." },
  { step: "04", title: "Launch & Optimize", text: "We launch with real data, monitor performance, and continuously optimize based on actual results — not guesswork. Your system gets smarter over time." },
] as const;

export const ownerProfile = {
  name: "Aryan Sharma",
  role: "Founder of Zivora AI · AI Automation Engineer",
  portfolioUrl: "https://portfolio-backend-7kau.onrender.com",
  summary: "Aryan is an AI automation engineer and full-stack builder who has developed 20+ AI-powered products, automation systems, and premium web experiences. At Zivora, he channels that deep technical expertise into building real business systems — websites that convert, automations that save hours, and AI tools that give teams superpowers.",
  highlights: ["AI & automation specialist", "Full-stack product architect", "Generative AI systems builder", "Premium web experience designer"],
  stats: [
    { value: "20+", label: "AI projects built" },
    { value: "6+", label: "products shipped" },
    { value: "2+", label: "years of building" },
  ],
} as const;