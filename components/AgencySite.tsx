"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { track } from "@vercel/analytics";
import ownerPortrait from "../nobi.jpg";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Menu,
  MousePointer2,
  Play,
  Rocket,
  Send,
  Share2,
  Target,
  UserRound,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ownerProfile, projects, services, site } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-canvas hero-canvas-loading" aria-hidden="true" />,
});

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
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

function LazyHeroScene() {
  const probeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const scheduledRef = useRef(false);

  useEffect(() => {
    const node = probeRef.current;
    let delayTimer: number | undefined;
    let idleId: number | undefined;

    const scheduleMount = () => {
      if (scheduledRef.current) return;
      scheduledRef.current = true;
      delayTimer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => setMounted(true), { timeout: 1400 });
        } else {
          setMounted(true);
        }
      }, 2200);
    };

    if (!node || !("IntersectionObserver" in window)) {
      setActive(true);
      scheduleMount();
      return () => {
        if (delayTimer) window.clearTimeout(delayTimer);
        if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) scheduleMount();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (delayTimer) window.clearTimeout(delayTimer);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
    };
  }, []);

  return (
    <>
      <div ref={probeRef} className="hero-scene-probe" aria-hidden="true" />
      {mounted ? (
        <HeroScene active={active} />
      ) : (
        <div className="hero-canvas hero-canvas-loading" aria-hidden="true" />
      )}
    </>
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
        <a className="brand" href="/" aria-label="Zivora home">
          <Image
            src="/zivora-logo-96.webp"
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
          Get Started <ArrowRight size={15} />
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
              <a className="brand" href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/zivora-logo-96.webp"
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
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            AI Automation · Web Development · Growth Systems
          </div>
          <h1>We Build the Systems That Grow Your Business</h1>
          <p className="hero-lead">
            Zivora AI partners with ambitious businesses to build websites that convert,
            automations that save hours, custom AI tools, and growth systems —
            so you can focus on what you do best.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact" onClick={() => track("hero_cta_clicked")}>
              Book a Free Strategy Call <ArrowRight size={17} />
            </a>
            <a className="button button-ghost" href="#services">
              <span className="play-icon"><Play size={13} fill="currentColor" /></span>
              Explore Our Services
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>AI</span><span>3D</span><span>8</span>
            </div>
            <div>
              <strong>Trusted by Growing Businesses</strong>
              <p>Websites, automations, AI tools, and growth — all in one partner.</p>
            </div>
          </div>
          <div className="hero-metrics" aria-label="Zivora capabilities">
            <span><strong>2x</strong> faster lead response</span>
            <span><strong>10+</strong> hours saved weekly</span>
            <span><strong>100%</strong> custom-built systems</span>
          </div>
        </div>

        <motion.div className="hero-visual" style={{ y: orbY, opacity: orbOpacity }}>
          <LazyHeroScene />
          <motion.div
            className="floating-card floating-card-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="floating-icon"><Workflow size={16} /></span>
            <div><small>AUTOMATION</small><strong>New lead captured & routed</strong></div>
            <span className="live-chip">LIVE</span>
          </motion.div>
          <motion.div
            className="floating-card floating-card-bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="floating-icon cyan"><Zap size={16} /></span>
            <div><small>SYSTEM STATUS</small><strong>All workflows connected</strong></div>
            <CircleCheck size={18} className="success-icon" />
          </motion.div>
          <div className="orbit-label orbit-label-one">CAPTURE</div>
          <div className="orbit-label orbit-label-two">AUTOMATE</div>
          <div className="orbit-label orbit-label-three">CONVERT</div>
        </motion.div>
      </div>

      <div className="hero-footer shell">
        <div className="scroll-cue"><MousePointer2 size={15} /><span>Scroll to explore</span></div>
        <div className="capability-line">
          <span>LEAD AUTOMATION</span><i />
          <span>CONVERSION WEBSITES</span><i />
          <span>AI TOOLS</span><i />
          <span>GROWTH SYSTEMS</span>
        </div>
      </div>
    </section>
  );
}

function SignalStrip() {
  const signals = [
    { value: "01", label: "Deep discovery before any build" },
    { value: "02", label: "Everything connected & integrated" },
    { value: "03", label: "Real-time lead tracking & alerts" },
    { value: "04", label: "Continuous optimization post-launch" },
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
          eyebrow="OUR SERVICES"
          title={<>Solutions That Drive <span className="muted-heading">Real Results</span></>}
          copy="Every service is designed around one goal: helping your business capture more leads, close more deals, and grow faster with less manual work."
        />

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.a
                href={service.href}
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -8 }}
                onClick={() => track("service_card_clicked", { service: service.title })}
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
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="section about-section" id="about">
      <div className="about-liquid-bg" aria-hidden="true" />
      <div className="shell about-layout">
        <div className="about-heading-panel">
          <div className="eyebrow"><span />ABOUT US</div>
          <h2>Your Growth Partner in AI & Digital Transformation</h2>
          <div className="about-mini-stats" aria-label="Our approach">
            <span><strong>01</strong> Discover</span>
            <span><strong>02</strong> Build</span>
            <span><strong>03</strong> Scale</span>
          </div>
        </div>

        <div className="about-showcase">
          <div className="about-copy about-glass-copy">
            <p>
              We help businesses replace scattered tools, missed leads, and manual workflows with one integrated digital system. Whether it&apos;s a website that actually converts, an automation that follows up in seconds, or an AI tool that saves your team hours every week — we build it all under one roof.
            </p>
            <p>
              Start with your biggest pain point. We&apos;ll audit it, architect the right solution, build and integrate it, and make sure your team can run it independently after launch.
            </p>
          </div>

          <div className="liquid-system-visual" aria-hidden="true">
            <div className="liquid-core">
              <span className="core-ring core-ring-one" />
              <span className="core-ring core-ring-two" />
              <span className="core-sphere" />
            </div>
            <div className="liquid-node node-web"><Globe2 size={18} /><span>Website</span></div>
            <div className="liquid-node node-ai"><BrainCircuit size={18} /><span>AI Tool</span></div>
            <div className="liquid-node node-flow"><Workflow size={18} /><span>Automation</span></div>
            <div className="liquid-node node-growth"><ChartNoAxesCombined size={18} /><span>Growth</span></div>
            <div className="liquid-beam beam-one" />
            <div className="liquid-beam beam-two" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="shell">
        <div className="projects-top">
          <SectionHeading
            eyebrow="OUR WORK"
            title={<>Real Results. <span className="muted-heading">Real Systems.</span></>}
            copy="Every project below represents a real system we built — not a template, not a mockup. Click through to see how we approach complex problems."
          />
          <a className="text-link" href={ownerProfile.portfolioUrl} target="_blank" rel="noopener noreferrer">
            View Full Portfolio <ExternalLink size={16} />
          </a>
        </div>

        <div className="program-grid project-link-grid">
          {projects.map((project) => (
            <a className="program-card" href={project.href} key={project.title} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <div className="program-card-top"><span>{project.number}</span><ExternalLink size={16} /></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="service-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Owner() {
  return (
    <section className="section owner-section" id="owner">
      <div className="shell owner-layout">
        <motion.div
          className="owner-card"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <div className="owner-portrait-wrap" aria-hidden="true">
            <div className="owner-portrait-orbit" />
            <Image
              src={ownerPortrait}
              alt="Aryan Sharma"
              className="owner-portrait"
              sizes="(max-width: 820px) 78vw, 320px"
              priority={false}
            />
          </div>
          <div className="owner-mark"><UserRound size={24} /></div>
          <span className="owner-label">FOUNDER</span>
          <h3>{ownerProfile.name}</h3>
          <p>{ownerProfile.role}</p>
          <a className="button button-primary owner-link" href={ownerProfile.portfolioUrl} target="_blank" rel="noopener noreferrer">
            View Portfolio <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="owner-copy">
          <div className="eyebrow"><span />MEET THE FOUNDER</div>
          <h2>The <span className="gradient-text">AI builder mindset</span> behind every Zivora system.</h2>
          <p>{ownerProfile.summary}</p>
          <div className="owner-highlights">
            {ownerProfile.highlights.map((item) => <span key={item}><Check size={13} />{item}</span>)}
          </div>
          <div className="owner-stats">
            {ownerProfile.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
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
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const sectionRef = useRef<HTMLElement>(null);
  const enquiryStarted = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track("contact_section_opened");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function trackEnquiryStarted() {
    if (enquiryStarted.current) return;
    enquiryStarted.current = true;
    track("enquiry_started");
  }

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
      track("enquiry_submitted_successfully");
      form.reset();
    } catch (submissionError) {
      setState("error");
      track("enquiry_failed");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />
      <div className="shell contact-shell">
        <div className="contact-copy">
          <div className="eyebrow"><span />LET&apos;S BUILD TOGETHER</div>
          <h2>Ready to Build Something <span className="gradient-text">Powerful?</span></h2>
          <p>Whether you need a high-converting website, an automation that saves your team hours, or a custom AI tool — we&apos;ll map the exact system your business needs in one free strategy call.</p>
          <div className="contact-points">
            <span><CircleCheck size={17} /> Free 30-minute strategy call</span>
            <span><CircleCheck size={17} /> Custom system blueprint for your business</span>
            <span><CircleCheck size={17} /> No jargon — just clear, actionable next steps</span>
          </div>
          <div className="direct-contact">
            <small>Prefer to reach out directly?</small>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.phones.map((phone) => <a href={phone.href} key={phone.href}>{phone.label}</a>)}
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
              <h3>Your brief is with our team.</h3>
              <p>We&apos;re reviewing your project details now. Expect a personalized response with clear next steps within 24 hours — no generic sales pitch, guaranteed.</p>
              <button className="button button-ghost" onClick={() => { setState("idle"); setFormStartedAt(Date.now()); }}>Submit another brief</button>
            </div>
          ) : (
            <form onSubmit={submit} onFocusCapture={trackEnquiryStarted}>
              <div className="form-head">
                <span>PROJECT BRIEF</span>
                <small>Takes about 2 minutes</small>
              </div>
              <div className="form-grid two-col">
                <label><span>Your name *</span><input name="name" required minLength={2} placeholder="Your full name" /></label>
                <label><span>Work email *</span><input name="email" type="email" required placeholder="you@company.com" /></label>
              </div>
              <div className="form-grid two-col">
                <label><span>Phone / WhatsApp</span><input name="phone" placeholder="+91 ..." /></label>
                <label><span>Company / Brand</span><input name="company" placeholder="Your business name" /></label>
              </div>
              <div className="form-grid two-col">
                <label>
                  <span>What do you need? *</span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => <option key={service.title}>{service.title}</option>)}
                    <option>Complete digital system — everything</option>
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
                    <option>Not sure yet — help me plan</option>
                  </select>
                </label>
              </div>
              <label><span>What&apos;s your biggest challenge right now? *</span><textarea name="message" required minLength={10} rows={5} placeholder="Tell us about the problem you want solved — slow leads, low conversions, manual processes, scaling challenges..." /></label>
              <input type="hidden" name="formStartedAt" value={formStartedAt} />
              <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {state === "error" ? <p className="form-error">{error}</p> : null}
              <button className="button button-primary form-submit" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending..." : <>Send Project Brief <Send size={16} /></>}
              </button>
              <p className="form-note">By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms</a>.</p>
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
          <a className="brand" href="/">
            <Image
              src="/zivora-logo-96.webp"
              alt="Zivora Logo"
              width={170}
              height={56}
              className="brand-logo"
            />
            <span className="brand-text">{site.name}</span>
          </a>
          <p className="footer-brand-lines">
            <strong>Zivora AI</strong>
            <a href={`https://${site.domain}`}>{site.domain}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>India</span>
          </p>
        </div>
        <div className="footer-links">
          <div><small>EXPLORE</small>{site.nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
          <div><small>CAPABILITIES</small><a href="/ai-automation-services">AI Automation</a><a href="/website-development">Web Development</a><a href="/ai-tools-development">AI Tools</a><a href="/adsense-growth">Content Growth</a></div>
          <div><small>CONNECT</small><a href={`mailto:${site.email}`}>{site.email}</a>{site.phones.map((phone) => <a href={phone.href} key={phone.href}>{phone.label}</a>)}<a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a><span>{site.location}</span></div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>We Build the Systems That Grow Your Business</span>
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
      <ParticleField />
      <AmbientCursor />
      <Header />
      <main>
        <Hero />
        <SignalStrip />
        <AboutUs />
        <Services />
        <Owner />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
