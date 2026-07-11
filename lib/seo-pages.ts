export type MarketingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  problem: string[];
  solution: string[];
  process: string[];
  deliverables: string[];
  technologies: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  cta: string;
  priority: number;
};

export type CaseStudyPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: { title: string; items: string[] }[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
  priority: number;
};

export const marketingPages: MarketingPage[] = [
  {
    slug: "ai-automation-services",
    title: "AI Automation Services in India",
    metaTitle: "AI Automation Services in India",
    description: "Client-ready AI automation systems for lead response, CRM updates, follow-ups, reminders, and internal workflows.",
    eyebrow: "AI Automation",
    intro: "You do not get a vague AI setup. Zivora AI builds a working automation system for your business: enquiry capture, lead qualification, follow-up, reminders, CRM updates, alerts, and a clear handoff to your team.",
    problem: [
      "Your leads come from website forms, WhatsApp, ads, Instagram, calls, or spreadsheets and nobody has one clean view.",
      "Your team replies late, forgets follow-ups, or repeats the same admin work every day.",
      "You want automation, but you need it connected to your actual sales or operations process.",
    ],
    solution: [
      "We build a lead-response workflow that captures the enquiry, asks useful qualifying questions, and routes it to the right person.",
      "We connect your form, WhatsApp, email, CRM, sheet, or database so every lead has a status and next action.",
      "We add fallback rules, alerts, and human approval points where a real person must stay in control.",
    ],
    process: [
      "Workflow audit: we document your current lead journey and find where time or data is getting lost.",
      "Automation blueprint: triggers, messages, tools, fields, ownership, and error handling are defined before build.",
      "Build and handover: we test the workflow with real examples, launch it, and give your team simple operating notes.",
    ],
    deliverables: [
      "Lead capture and qualification flow",
      "WhatsApp, email, or CRM follow-up sequence",
      "Lead status dashboard or tracking sheet",
      "Admin alerts, fallback rules, and documentation",
    ],
    technologies: ["OpenAI APIs", "WhatsApp workflows", "CRM/webhook integrations", "Supabase", "PostgreSQL", "Next.js"],
    benefits: ["Faster replies", "No missed follow-ups", "Cleaner lead data", "Less manual admin", "Better visibility for owners"],
    faqs: [
      { question: "What do I receive at the end?", answer: "A live automation workflow connected to your tools, plus the fields, messages, dashboard, alerts, and documentation needed to use it." },
      { question: "Can this work with my current tools?", answer: "Usually yes. We first check your form, WhatsApp, CRM, sheets, email, and website, then connect the best-fit workflow around them." },
    ],
    cta: "Plan my automation",
    priority: 0.9,
  },
  {
    slug: "website-development",
    title: "Website Development Services",
    metaTitle: "Website Development Services",
    description: "Client-ready website development for clear service pages, enquiry forms, SEO foundations, and conversion-focused business websites.",
    eyebrow: "Website Development",
    intro: "You get a website built around your offer, not a generic template. Zivora AI plans your pages, writes clear service structure, builds the frontend, connects enquiries, and prepares the site for search and ads.",
    problem: [
      "Your current site does not explain what you sell, who it is for, and why a client should contact you.",
      "You depend on one homepage instead of dedicated pages for each important service.",
      "Your form, analytics, speed, mobile layout, or SEO basics are weak.",
    ],
    solution: [
      "We build a focused site structure: homepage, service pages, about, contact, policy pages, and strong CTAs.",
      "Each service page explains the client problem, your solution, process, deliverables, tools, benefits, and FAQs.",
      "We connect the contact form, analytics, metadata, sitemap, and lead flow so the website can support real business growth.",
    ],
    process: [
      "Offer mapping: we clarify your services, audience, proof, pricing direction, and conversion goal.",
      "Page planning: we create the structure and content blocks before design/development.",
      "Launch-ready build: responsive UI, fast pages, metadata, forms, and technical checks.",
    ],
    deliverables: ["Responsive website", "Service-specific pages", "Contact form and lead routing", "SEO metadata and sitemap", "Basic analytics setup support"],
    technologies: ["Next.js", "React", "TypeScript", "Vercel", "Supabase", "Analytics", "Structured metadata"],
    benefits: ["Clearer positioning", "Better enquiry quality", "More useful service pages", "Stronger base for Google, ads, and social traffic"],
    faqs: [
      { question: "Will the site be custom to my business?", answer: "Yes. We use your services, client type, workflow, location, and proof points to shape the page structure and content." },
      { question: "Can you improve an existing website?", answer: "Yes. We can rebuild weak pages, improve copy, connect forms, clean metadata, and keep useful parts of the current site." },
    ],
    cta: "Build my website",
    priority: 0.85,
  },
  {
    slug: "ai-tools-development",
    title: "Custom AI Tools Development India",
    metaTitle: "Custom AI Tools Development India",
    description: "Custom AI assistants, copilots, internal tools, and workflow products built around your business data and tasks.",
    eyebrow: "AI Tools",
    intro: "You get a practical AI tool for one real job inside your business: answering from your data, drafting work, classifying enquiries, summarizing records, generating reports, or helping staff finish repeatable tasks faster.",
    problem: [
      "Your team repeats research, writing, sorting, reporting, or support work that could be assisted by AI.",
      "Generic chatbots do not understand your documents, fields, approvals, or workflow.",
      "You need a private interface your team can actually use, not just a demo prompt.",
    ],
    solution: [
      "We define the tool around one clear use case and the exact inputs and outputs your team needs.",
      "We connect approved documents, databases, forms, or APIs with guardrails and human review where needed.",
      "We build a usable interface with logs, states, and instructions so it can become part of daily work.",
    ],
    process: ["Use-case selection", "Prototype with real examples", "Data and prompt workflow setup", "UI build", "Testing, access rules, and handover"],
    deliverables: ["AI assistant or internal copilot", "Prompt and reasoning workflow", "Data retrieval or API connection", "Admin notes, logs, and usage guide"],
    technologies: ["OpenAI APIs", "RAG", "Vector search", "Next.js", "Supabase", "PostgreSQL", "API integrations"],
    benefits: ["Faster staff output", "Consistent answers", "Less manual research", "AI workflow owned by your business"],
    faqs: [
      { question: "What kind of AI tool can you build?", answer: "Internal copilots, knowledge assistants, lead classifiers, report generators, content assistants, support helpers, and workflow-specific AI dashboards." },
      { question: "Do I need a huge dataset?", answer: "No. Many useful tools start with your existing documents, FAQs, forms, examples, and process rules." },
    ],
    cta: "Design my AI tool",
    priority: 0.85,
  },
  {
    slug: "social-media-management",
    title: "Social Media Management and Automation",
    metaTitle: "Social Media Management and Automation",
    description: "Client-specific social media systems for content planning, repurposing, publishing, and enquiry support.",
    eyebrow: "Social Media",
    intro: "You get a repeatable social media system for your brand: content pillars, monthly topics, post formats, repurposing workflow, approval flow, and CTAs that point people back to your services.",
    problem: ["You post randomly and then disappear for weeks.", "Your best ideas are stuck in calls, notes, videos, or founder knowledge.", "Content is not connected to service pages, enquiries, or business goals."],
    solution: ["We create content pillars around your offer and client questions.", "We turn one idea into short posts, captions, scripts, carousels, and website-supporting content.", "We add a simple publishing and review workflow so the system is easier to maintain."],
    process: ["Brand and audience audit", "Content pillar planning", "Monthly calendar", "Repurposing workflow", "Performance review"],
    deliverables: ["Content calendar", "Caption/script/carousel direction", "Repurposing workflow", "Publishing checklist", "CTA and lead-flow recommendations"],
    technologies: ["AI content workflows", "Analytics dashboards", "Scheduling tools", "Canva/Figma handoff", "Automation workflows"],
    benefits: ["Consistent posting", "Clearer brand message", "More use from every idea", "Content that supports enquiries"],
    faqs: [
      { question: "Is this just posting automation?", answer: "No. We first decide what your brand should say and how content should support leads, then automation helps with consistency." },
      { question: "Can you make it specific to my industry?", answer: "Yes. Topics, FAQs, proof points, and CTAs are built around your actual service and client type." },
    ],
    cta: "Create my content system",
    priority: 0.8,
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising and Funnel Automation",
    metaTitle: "Paid Advertising Services",
    description: "Landing pages, tracking, lead capture, and follow-up systems for paid ad campaigns.",
    eyebrow: "Paid Ads",
    intro: "You get the pieces around your ad campaign that usually decide whether money is wasted: a clear landing page, conversion form, tracking setup, lead notification, and follow-up workflow.",
    problem: ["Ads send traffic to pages that do not match the offer.", "Lead tracking is unclear, so you cannot tell what campaign created a real enquiry.", "New leads wait too long for a reply after submitting a form."],
    solution: ["We build campaign-specific landing pages with one offer and one clear action.", "We connect form submissions to notifications, sheets/CRM, and follow-up messages.", "We set up basic conversion tracking support so you can judge lead quality."],
    process: ["Offer and audience check", "Landing page build", "Form and tracking setup", "Lead follow-up workflow", "Performance review"],
    deliverables: ["Campaign landing page", "Lead form and notification flow", "Tracking event setup support", "Automated follow-up sequence", "Lead quality notes"],
    technologies: ["Meta Ads support", "Google Ads support", "Landing pages", "Analytics", "CRM/webhooks", "WhatsApp follow-up"],
    benefits: ["Less ad spend leakage", "Faster lead response", "Cleaner tracking", "Better conversion from paid traffic"],
    faqs: [
      { question: "Do you guarantee ad results?", answer: "No. We do not promise revenue. We improve the page, tracking, and response system so campaigns have a better foundation." },
      { question: "Can this work with my current ad account?", answer: "Yes. We can work around your existing campaigns and improve the funnel after the click." },
    ],
    cta: "Improve my ad funnel",
    priority: 0.78,
  },
  {
    slug: "adsense-growth",
    title: "AdSense Growth and Content Monetization",
    metaTitle: "AdSense Growth Services",
    description: "Content structure, technical SEO, internal linking, and monetization readiness support for content websites.",
    eyebrow: "AdSense Growth",
    intro: "You get a cleaner content-growth system: topic clusters, useful page briefs, internal linking, technical fixes, performance checks, and a monetization-readiness plan for your site.",
    problem: ["Your website has posts, but no clear topic structure or internal linking plan.", "Pages are thin, slow, or hard to navigate.", "You are targeting keywords without building helpful original content."],
    solution: ["We map realistic long-tail topics around your niche and audience questions.", "We improve page structure, technical SEO basics, navigation, speed, and internal links.", "We create a practical content plan that supports AdSense readiness without keyword stuffing."],
    process: ["Content and technical audit", "Topic cluster planning", "Page improvement list", "Internal linking plan", "Analytics/Search Console review"],
    deliverables: ["Keyword and topic plan", "Content briefs", "Technical SEO checklist", "Internal linking map", "Monetization readiness notes"],
    technologies: ["Google Search Console", "Analytics", "Next.js SEO", "Schema basics", "Performance optimization"],
    benefits: ["More useful content", "Better site structure", "Improved reader experience", "Cleaner base for monetization"],
    faqs: [
      { question: "Can you guarantee AdSense approval?", answer: "No. Approval depends on Google policies. We improve the site quality, structure, and readiness before you apply or re-apply." },
      { question: "Will you create thin keyword pages?", answer: "No. We focus on useful pages with real structure, not repeated keywords." },
    ],
    cta: "Plan my content growth",
    priority: 0.78,
  },
  {
    slug: "about",
    title: "About Zivora AI",
    metaTitle: "About Zivora AI",
    description: "About Zivora AI, an AI automation, website, and digital growth agency led by Aryan Sharma.",
    eyebrow: "About",
    intro: "Zivora AI is built for clients who need practical execution: websites that explain the offer, automations that remove manual work, AI tools that help teams, and growth systems that can be measured.",
    problem: ["Businesses often buy separate services that do not connect.", "Websites, ads, content, CRM, and follow-ups are handled in different places.", "Owners need one clear system instead of more disconnected tools."],
    solution: ["We plan the website, automation, AI layer, content, and tracking as one connected workflow.", "We start from your business bottleneck, then choose the tools and pages needed to solve it.", "We keep the build understandable so your team can actually use it."],
    process: ["Discovery call", "Workflow and offer mapping", "System blueprint", "Build and launch", "Review and improve"],
    deliverables: ["Strategy map", "Website/service page direction", "Automation roadmap", "AI tool recommendation", "Growth system implementation"],
    technologies: ["Next.js", "React", "OpenAI APIs", "Supabase", "PostgreSQL", "Vercel", "Analytics"],
    benefits: ["One connected plan", "Practical AI adoption", "Clearer digital presence", "Less wasted manual work"],
    faqs: [
      { question: "Who runs Zivora AI?", answer: "Zivora AI is led by Aryan Sharma, an AI automation engineer and full-stack product builder." },
      { question: "Who is a good fit?", answer: "Clinics, service businesses, creators, startups, and local brands that want better lead handling, websites, automation, or AI workflows." },
    ],
    cta: "Talk to Zivora AI",
    priority: 0.75,
  },
  {
    slug: "contact",
    title: "Contact Zivora AI",
    metaTitle: "Contact Zivora AI",
    description: "Contact Zivora AI for AI automation, website development, custom AI tools, social media systems, paid ads, and content growth.",
    eyebrow: "Contact",
    intro: "Tell us what you want fixed: slow lead response, weak website, scattered content, manual admin, poor tracking, or a custom AI idea. We will suggest the most useful first build.",
    problem: ["You know something is slowing growth, but the exact solution is unclear.", "You want a clear recommendation before paying for a full build.", "You need someone to connect website, automation, AI, and follow-up into one plan."],
    solution: ["Send your business type, current problem, tools you use, and target outcome.", "We review the workflow and recommend a practical next step.", "If there is a fit, we define scope, timeline, deliverables, and pricing."],
    process: ["Send brief", "Workflow review", "Recommendation", "Scope and quote", "Build start"],
    deliverables: ["Initial direction", "Recommended service", "Scope outline", "Next-step proposal", "Direct email contact"],
    technologies: ["Email", "Website enquiry form", "Discovery call", "Workflow audit", "Project roadmap"],
    benefits: ["Clarity before build", "No random package", "A practical first step", "Direct contact with Zivora AI"],
    faqs: [
      { question: "What should I send?", answer: "Your business, current problem, tools you use, target outcome, and any budget or timeline range." },
      { question: "What is the direct email?", answer: "aryansharma@zivoraai.co.in" },
    ],
    cta: "Send a project brief",
    priority: 0.74,
  },
  {
    slug: "ai-automation-for-clinics",
    title: "AI Automation for Clinics",
    metaTitle: "AI Automation for Clinics in India",
    description: "Clinic automation for appointments, WhatsApp reminders, patient enquiries, reviews, and staff workflows.",
    eyebrow: "Clinic Automation",
    intro: "You get a clinic-specific automation system for front-desk work: appointment reminders, WhatsApp follow-ups, patient enquiry handling, review requests, and staff task visibility.",
    problem: ["Patients ask repeated questions about timings, fees, availability, location, and appointments.", "Manual reminders lead to missed appointments and confused confirmations.", "Google, Instagram, WhatsApp, and call enquiries are not tracked in one place.", "Review collection happens randomly after successful visits."],
    solution: ["We set up appointment confirmation and reminder workflows.", "We create WhatsApp follow-up for new enquiries, missed calls, pending confirmations, and post-visit reviews.", "We organize patient enquiries into a simple tracking sheet or dashboard with owner, status, and next action.", "Medical questions stay with doctors or staff; automation handles admin communication only."],
    process: ["Map patient journey", "Define reminder and follow-up rules", "Set up tracking fields", "Test real clinic scenarios", "Train staff on exceptions"],
    deliverables: ["Appointment reminder workflow", "WhatsApp enquiry flow", "Patient lead tracker", "Review request automation", "Clinic FAQ response templates"],
    technologies: ["WhatsApp workflows", "Google Sheets or CRM", "Calendar integrations", "OpenAI APIs", "Web forms", "Automation webhooks"],
    benefits: ["Fewer missed appointments", "Faster enquiry response", "Less front-desk repetition", "More reviews", "Cleaner staff handoff"],
    faqs: [
      { question: "Will AI answer medical questions?", answer: "No. The system can handle operational questions and route medical questions to clinic staff or doctors." },
      { question: "Can it work for a small clinic?", answer: "Yes. Small clinics often benefit quickly because reminders, enquiries, and reviews are high-repeat tasks." },
      { question: "Can it work on WhatsApp?", answer: "Yes. WhatsApp is usually the most practical channel for reminders and follow-ups in India." },
    ],
    cta: "Automate my clinic",
    priority: 0.88,
  },
];

export const caseStudyPages: CaseStudyPage[] = [
  {
    slug: "nobi-ai-assistant",
    title: "NOBI AI Assistant Case Study",
    metaTitle: "NOBI AI Assistant Case Study",
    description: "NOBI case study showing how Zivora AI thinks about assistant workflows, automation actions, and client-ready AI systems.",
    eyebrow: "Case Study",
    intro: "NOBI is not shown as a random AI demo. It is a builder case study that explains how a client-ready assistant can reason, use tools, run actions, verify work, and support real business workflows.",
    sections: [
      { title: "Client Problem This Solves", items: ["Teams work across browser tabs, CRMs, sheets, documents, and chat apps with no single assistant to coordinate tasks.", "Most AI tools answer questions but do not complete multi-step operational work.", "Businesses need AI that can act, verify, and hand control back to humans when needed."] },
      { title: "Why Normal Systems Break", items: ["Research, browser work, file handling, content, and automation are usually split across separate tools.", "Without a reasoning layer, every task becomes a manual copy-paste handoff.", "The NOBI approach shows how one assistant can plan steps, run actions, and check outcomes."] },
      { title: "Architecture", items: ["Intent layer: understands the user goal and decides what kind of work is needed.", "Reasoning layer: breaks the task into steps and chooses the right action.", "Action layer: handles browser operations, extraction, content work, and workflow execution.", "Verification layer: checks whether the final state matches the requested goal."] },
      { title: "63 Automation Actions", items: ["The action set covered browser control, navigation, extraction, file handling, form workflows, and task execution.", "The value is not the number alone; the value is selecting the right action at the right moment.", "The same pattern can become client workflows for leads, clinic reminders, CRM updates, reports, or content operations."] },
      { title: "What A Client Could Get", items: ["An internal operations assistant for a specific workflow such as lead handling, reporting, support, or clinic admin.", "A workflow dashboard where actions, status, and exceptions are visible.", "Human approval points for sensitive decisions, with automation handling repeatable steps."] },
      { title: "Business Potential", items: ["Reduce manual switching between tools.", "Make repeatable work faster and easier to audit.", "Turn AI from a chatbot into an operational layer for the business."] },
    ],
    technologies: ["AI reasoning", "Browser workflows", "Automation actions", "Tool orchestration", "Verification loops", "Full-stack product design"],
    faqs: [
      { question: "Is NOBI a client project?", answer: "NOBI is a builder case study. It shows the architecture and thinking Zivora AI can adapt for client-specific systems." },
      { question: "Can you build something like this for my business?", answer: "Yes, but it should be focused on one workflow first: leads, clinic operations, reporting, support, internal knowledge, or content production." },
    ],
    priority: 0.82,
  },
];

export function getMarketingPage(slug: string) {
  return marketingPages.find((page) => page.slug === slug);
}

export function getCaseStudyPage(slug: string) {
  return caseStudyPages.find((page) => page.slug === slug);
}