import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { site } from "@/lib/site";
import type { CaseStudyPage, MarketingPage } from "@/lib/seo-pages";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="content-block">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqBlock({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="content-block content-faq">
      <h2>FAQ</h2>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <article key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MarketingContentPage({ page }: { page: MarketingPage }) {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="shell content-hero-grid">
          <div>
            <Link className="content-back" href="/">Back to homepage</Link>
            <p className="legal-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="content-actions">
              <Link className="button button-primary" href="/#contact">
                {page.cta} <ArrowRight size={17} />
              </Link>
              <a className="button button-ghost" href={`mailto:${site.email}`}>
                <Mail size={17} /> {site.email}
              </a>
            </div>
          </div>
          <aside className="content-side-panel">
            <span>{site.name}</span>
            <strong>Built around your real workflow, not a generic package.</strong>
            <p>Send the workflow, service, or growth problem you want fixed. We will map the pages, automations, tools, and handoff your business actually needs.</p>
            <a href={`https://${site.domain}`}>{site.domain}</a>
          </aside>
        </div>
      </section>

      <section className="content-body shell">
        <ListBlock title="Problem You Bring" items={page.problem} />
        <ListBlock title="What We Build For You" items={page.solution} />
        <ListBlock title="How We Implement It" items={page.process} />
        <ListBlock title="What You Receive" items={page.deliverables} />
        <ListBlock title="Tools We Can Connect" items={page.technologies} />
        <ListBlock title="Business Outcome" items={page.benefits} />
        <FaqBlock faqs={page.faqs} />
      </section>
    </main>
  );
}

export function CaseStudyContentPage({ page }: { page: CaseStudyPage }) {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="shell content-hero-grid">
          <div>
            <Link className="content-back" href="/">Back to homepage</Link>
            <p className="legal-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="content-actions">
              <Link className="button button-primary" href="/#contact">
                Discuss a similar system <ArrowRight size={17} />
              </Link>
              <Link className="button button-ghost" href="/ai-automation-services">
                Explore automation services
              </Link>
            </div>
          </div>
          <aside className="content-side-panel">
            <span>Original Build</span>
            <strong>NOBI shows AI reasoning plus action workflows.</strong>
            <p>Use this as a trust signal for custom AI automation, assistant design, and connected workflow products.</p>
          </aside>
        </div>
      </section>

      <section className="content-body shell">
        {page.sections.map((section) => (
          <ListBlock key={section.title} title={section.title} items={section.items} />
        ))}
        <ListBlock title="Technologies Used" items={page.technologies} />
        <FaqBlock faqs={page.faqs} />
      </section>
    </main>
  );
}