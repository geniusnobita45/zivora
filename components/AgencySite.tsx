"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  Globe2,
  Share2,
  Layers3,
  Menu,
  MousePointer2,
  Play,
  Rocket,
  Send,
  Target,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { processSteps, services, site, systemCards } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-canvas hero-canvas-loading" aria-hidden="true" />,
});

const iconMap = {
  bot: Bot,
  web: Code2,
  spark: BrainCircuit,
  chart: ChartNoAxesCombined,
  social: Share2,
  target: Target,
} as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="eyebrow"><span />{eyebrow}</div>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  );
}

function AmbientCursor() {
  const [position, setPosition] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      className="cursor-ambient"
      style={{ transform: `translate3d(${position.x - 240}px, ${position.y - 240}px, 0)` }}
      aria-hidden="true"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Zivora home">
          <Image
            src="/zivora-logo.jpg"
            alt="Zivora Logo"
            width={190}
            height={62}
            className="brand-logo"
            priority
          />
          <span className="brand-text">{site.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <a className="nav-cta" href="#contact">
          Start a project <ArrowRight size={15} />
        </a>

        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={21} />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="mobile-menu-top">
              <a className="brand" href="#top" onClick={() => setOpen(false)}>
                <Image
                  src="/zivora-logo.jpg"
                  alt="Zivora Logo"
                  width={170}
              height={56}
                  className="brand-logo"
                />
                <span className="brand-text">{site.name}</span>
              </a>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav>
              {site.nav.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>{item.label}<ChevronRight size={18} />
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="hero-content shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="status-pill">
            <span className="status-dot" />
            AI Automation · Digital Products · Growth Systems
          </div>
          <h1>
            Your business<br />
            should <span className="gradient-text">run itself.</span>
          </h1>
          <p className="hero-lead">
            While you focus on the vision, we build the machine behind it —
            AI automation, stunning websites, and growth systems that generate
            leads, close deals, and scale revenue on autopilot.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Let&apos;s build yours <ArrowRight size={17} />
            </a>
            <a className="button button-ghost" href="#services">
              <span className="play-icon"><Play size={13} fill="currentColor" /></span>
              See what we build
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>AI</span><span>3D</span><span>∞</span>
            </div>
            <div>
              <strong>Strategy → Build → Scale</strong>
              <p>One team. Every digital system you need.</p>
            </div>
          </div>
          <div className="hero-metrics" aria-label="Zivora capabilities">
            <span><strong>6 sec</strong> lead response</span>
            <span><strong>360°</strong> growth engine</span>
            <span><strong>24/7</strong> automation</span>
          </div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: orbY, opacity: orbOpacity }}>
          <HeroScene />
          <motion.div
            className="floating-card floating-card-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="floating-icon"><Workflow size={16} /></span>
            <div><small>WORKFLOW</small><strong>Lead follow-up active</strong></div>
            <span className="live-chip">LIVE</span>
          </motion.div>
          <motion.div
            className="floating-card floating-card-bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="floating-icon cyan"><Zap size={16} /></span>
            <div><small>SYSTEM STATUS</small><strong>6 processes connected</strong></div>
            <CircleCheck size={18} className="success-icon" />
          </motion.div>
          <div className="orbit-label orbit-label-one">AUTOMATE</div>
          <div className="orbit-label orbit-label-two">INNOVATE</div>
          <div className="orbit-label orbit-label-three">ELEVATE</div>
        </motion.div>
      </div>

      <div className="hero-footer shell">
        <div className="scroll-cue"><MousePointer2 size={15} /><span>Scroll to explore</span></div>
        <div className="capability-line">
          <span>AI AUTOMATION</span><i />
          <span>FULL-STACK WEB</span><i />
          <span>GROWTH SYSTEMS</span><i />
          <span>SOCIAL OPERATIONS</span>
        </div>
      </div>
    </section>
  );
}

function SignalStrip() {
  const signals = [
    { value: "24/7", label: "systems that work while you sleep" },
    { value: "01", label: "partner for everything digital" },
    { value: "∞", label: "unlimited scale, zero bottlenecks" },
    { value: "360°", label: "first impression to final sale" },
  ];
  return (
    <section className="signal-strip">
      <div className="shell signal-grid">
        {signals.map((signal, index) => (
          <motion.div
            className="signal-item"
            key={signal.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="shell">
        <SectionHeading
          eyebrow="WHAT WE BUILD"
          title={<>One agency. <span className="muted-heading">Every growth lever.</span></>}
          copy="Most agencies sell you one piece. We build the entire machine — website, automation, AI, content, and ads — all wired together so nothing falls through the cracks."
        />

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.article
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -8 }}
              >
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon"><Icon size={22} /></span>
                </div>
                <h3>{service.title}</h3>
                <p className="service-short">{service.short}</p>
                <p className="service-detail">{service.detail}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="service-arrow"><ArrowRight size={18} /></div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OperatingSystem() {
  const [active, setActive] = useState(1);
  const nodes = useMemo(() => [
    { icon: Globe2, label: "Traffic", x: "4%", y: "48%" },
    { icon: BrainCircuit, label: "AI Layer", x: "27%", y: "18%" },
    { icon: Workflow, label: "Automation", x: "27%", y: "72%" },
    { icon: Layers3, label: "Your Business", x: "50%", y: "45%", core: true },
    { icon: ChartNoAxesCombined, label: "Analytics", x: "73%", y: "18%" },
    { icon: Share2, label: "Content", x: "73%", y: "72%" },
    { icon: Rocket, label: "Growth", x: "93%", y: "48%" },
  ], []);

  return (
    <section className="section os-section" id="systems">
      <div className="shell">
        <SectionHeading
          eyebrow="THE CONNECTED ADVANTAGE"
          title={<>Not another vendor.<br /><span className="gradient-text">Your business operating system.</span></>}
          copy="Most businesses run on disconnected tools and hope. We replace the chaos with one intelligent system where every part talks to every other part — automatically."
        />

        <motion.div
          className="system-map"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="map-grid" />
          <svg className="map-lines" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="lineGlow" x1="0" x2="1">
                <stop offset="0" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path d="M65 215 C170 215 205 78 315 78" />
            <path d="M65 215 C170 215 205 335 315 335" />
            <path d="M315 78 C405 78 420 215 500 215" />
            <path d="M315 335 C405 335 420 215 500 215" />
            <path d="M500 215 C585 215 600 78 730 78" />
            <path d="M500 215 C585 215 600 335 730 335" />
            <path d="M730 78 C815 78 835 215 930 215" />
            <path d="M730 335 C815 335 835 215 930 215" />
          </svg>
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.button
                type="button"
                key={node.label}
                className={`map-node ${node.core ? "core-node" : ""} ${active === index ? "active" : ""}`}
                style={{ left: node.x, top: node.y }}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                whileHover={{ scale: 1.06 }}
              >
                <span><Icon size={node.core ? 26 : 20} /></span>
                <small>{node.label}</small>
              </motion.button>
            );
          })}
          <div className="map-status">
            <span className="status-dot" />
            <div><small>SYSTEM PULSE</small><strong>{nodes[active].label} connected</strong></div>
          </div>
        </motion.div>

        <div className="system-cards">
          {systemCards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`system-card ${card.className}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09 }}
            >
              <div className="system-card-light" />
              <span className="system-eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="metric-list">
                {card.metrics.map((metric) => <span key={metric}><Check size={13} />{metric}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="shell process-layout">
        <div className="process-sticky">
          <SectionHeading
            eyebrow="HOW WE WORK"
            title={<>We don&apos;t guess.<br /><span className="gradient-text">We engineer.</span></>}
            copy="Every dollar you invest should be trackable, every system we build should be measurable. Here's how we make that happen."
          />
          <a className="text-link" href="#contact">Talk to our team <ArrowRight size={16} /></a>
        </div>

        <div className="process-list">
          {processSteps.map((item, index) => (
            <motion.article
              className="process-item"
              key={item.step}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="process-index">{item.step}</div>
              <div className="process-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
              <div className="process-dot" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const industries = ["Clinics & hospitals", "Local service businesses", "Creators & media brands", "Startups & SaaS", "E-commerce brands", "Coaches & educators"];
  return (
    <section className="section industries-section">
      <div className="shell">
        <div className="industries-panel">
          <div>
            <div className="eyebrow"><span />WHO WE WORK WITH</div>
            <h2>Different industry.<br /><span className="muted-heading">Same hunger for growth.</span></h2>
          </div>
          <div className="industry-list">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span>0{index + 1}</span><strong>{industry}</strong><ArrowRight size={16} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your request.");
      setState("success");
      form.reset();
    } catch (submissionError) {
      setState("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />
      <div className="shell contact-shell">
        <div className="contact-copy">
          <div className="eyebrow"><span />LET&apos;S TALK</div>
          <h2>Tell us what&apos;s broken.<br />We&apos;ll show you <span className="gradient-text">what&apos;s possible.</span></h2>
          <p>Whether leads are slipping through the cracks, your website isn&apos;t converting, or growth feels stuck — we&apos;ll map the exact system your business needs in one call.</p>
          <div className="contact-points">
            <span><CircleCheck size={17} /> Free 30-minute strategy call</span>
            <span><CircleCheck size={17} /> Custom system recommendation</span>
            <span><CircleCheck size={17} /> Zero jargon, pure business talk</span>
          </div>
          <div className="direct-contact">
            <small>Prefer email?</small>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>

        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {state === "success" ? (
            <div className="success-state">
              <span><CircleCheck size={29} /></span>
              <h3>We got your brief.</h3>
              <p>Our team is reviewing your project. Expect a reply with a clear next step within 24 hours — no generic sales pitch, we promise.</p>
              <button className="button button-ghost" onClick={() => setState("idle")}>Send another brief</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-head">
                <span>PROJECT BRIEF</span>
                <small>Takes about 2 minutes</small>
              </div>
              <div className="form-grid two-col">
                <label><span>Your name *</span><input name="name" required minLength={2} placeholder="Annie" /></label>
                <label><span>Work email *</span><input name="email" type="email" required placeholder="you@company.com" /></label>
              </div>
              <div className="form-grid two-col">
                <label><span>Phone / WhatsApp</span><input name="phone" placeholder="+91 ..." /></label>
                <label><span>Company / brand</span><input name="company" placeholder="Your business name" /></label>
              </div>
              <div className="form-grid two-col">
                <label>
                  <span>What do you need? *</span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => <option key={service.title}>{service.title}</option>)}
                    <option>The full system — everything</option>
                  </select>
                </label>
                <label>
                  <span>Budget range</span>
                  <select name="budget" defaultValue="">
                    <option value="">Select a range</option>
                    <option>₹50K – ₹1L</option>
                    <option>₹1L – ₹3L</option>
                    <option>₹3L – ₹7L</option>
                    <option>₹7L+</option>
                    <option>Help me figure it out</option>
                  </select>
                </label>
              </div>
              <label><span>What&apos;s the biggest problem right now? *</span><textarea name="message" required minLength={10} rows={5} placeholder="Tell us what's not working — slow leads, weak website, no social presence, wasted ad budget..." /></label>
              <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {state === "error" ? <p className="form-error">{error}</p> : null}
              <button className="button button-primary form-submit" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending..." : <>Send project brief <Send size={16} /></>}
              </button>
              <p className="form-note">By submitting, you agree to be contacted about this project.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <a className="brand" href="#top">
            <Image
              src="/zivora-logo.jpg"
              alt="Zivora Logo"
              width={170}
              height={56}
              className="brand-logo"
            />
            <span className="brand-text">{site.name}</span>
          </a>
          <p>{site.descriptor}</p>
        </div>
        <div className="footer-links">
          <div><small>EXPLORE</small>{site.nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
          <div><small>CAPABILITIES</small><a href="#services">Automation</a><a href="#services">Web experiences</a><a href="#services">AI tools</a><a href="#services">Revenue growth</a></div>
          <div><small>CONTACT</small><a href={`mailto:${site.email}`}>{site.email}</a><span>{site.location}</span></div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Automate · Innovate · Elevate</span>
      </div>
    </footer>
  );
}

export function AgencySite() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: smoothProgress }} />
      <AmbientCursor />
      <Header />
      <main>
        <Hero />
        <SignalStrip />
        <Services />
        <OperatingSystem />
        <Process />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </>
  );
}





