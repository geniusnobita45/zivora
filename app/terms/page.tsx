import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for Zivora AI services, project enquiries, proposals, payments, content, and ownership.",
  alternates: {
    canonical: "https://zivoraai.co.in/terms",
  },
};

const updatedAt = "July 11, 2026";

export default function TermsPage() {
  return (
    <main className="legal-page">
      <section className="legal-shell">
        <Link className="legal-back" href="/">Back to Zivora AI</Link>
        <p className="legal-kicker">Zivora AI</p>
        <h1>Terms</h1>
        <p className="legal-updated">Last updated: {updatedAt}</p>

        <div className="legal-content">
          <section>
            <h2>Services</h2>
            <p>
              Zivora AI provides services such as AI automation, business workflow automation, website and
              landing-page development, custom AI tools, social media support, paid advertising support,
              AdSense-related growth support, and digital growth consulting. Exact services depend on the
              written proposal or project scope agreed with the client.
            </p>
          </section>

          <section>
            <h2>Proposal And Project Scope</h2>
            <p>
              Enquiries submitted through this website do not create a confirmed project or obligation to start work.
              A project begins only after both sides agree on scope, deliverables, timeline, pricing, and payment terms.
              Any work outside the agreed scope may require a separate quote, revised timeline, or additional payment.
            </p>
          </section>

          <section>
            <h2>Payment Rules</h2>
            <p>
              Payment amounts, milestones, due dates, and accepted payment methods will be defined in the proposal,
              invoice, or written project agreement. Work may be paused if payments are delayed. Taxes, platform fees,
              advertising spend, third-party software, hosting, domains, and other external costs are the client&apos;s
              responsibility unless the written scope says otherwise.
            </p>
          </section>

          <section>
            <h2>Revision Rules</h2>
            <p>
              Revision rounds, if included, will be described in the proposal or written scope. Revisions must relate
              to the agreed deliverables. Major direction changes, new features, new pages, new campaigns, new automation
              logic, or work caused by incomplete client input may be treated as additional scope.
            </p>
          </section>

          <section>
            <h2>Cancellation And Refunds</h2>
            <p>
              Cancellation and refund terms depend on the agreed project scope and payment milestone. Amounts paid for
              completed work, strategy, planning, design, development, setup, third-party costs, or reserved project time
              may be non-refundable. Any refund, if applicable, will be assessed based on work completed and costs already incurred.
            </p>
          </section>

          <section>
            <h2>Client-Provided Content</h2>
            <p>
              The client is responsible for providing accurate text, images, brand assets, credentials, approvals, legal
              permissions, and any content needed for the project. The client confirms they have the right to use all
              materials they provide. Delays in providing content or approvals may affect timelines.
            </p>
          </section>

          <section>
            <h2>Intellectual Property Ownership</h2>
            <p>
              Unless agreed otherwise in writing, the client owns final custom deliverables after full payment is received.
              Zivora AI may retain ownership of pre-existing tools, reusable components, templates, methods, know-how,
              internal processes, and general skills used to create the work. Third-party tools, fonts, images, plugins,
              hosting, and software remain subject to their own licenses and terms.
            </p>
          </section>

          <section>
            <h2>Confidentiality</h2>
            <p>
              Both sides should treat non-public project information, credentials, business data, and strategy details as
              confidential. Confidential information should not be shared publicly unless required for project delivery,
              legal compliance, or with written permission.
            </p>
          </section>

          <section>
            <h2>Liability Limitations</h2>
            <p>
              Zivora AI aims to provide reliable, professional services, but we cannot guarantee specific revenue,
              rankings, ad results, platform approvals, uptime, third-party service behavior, or business outcomes.
              To the maximum extent allowed by applicable law, Zivora AI is not liable for indirect, incidental,
              special, consequential, or lost-profit damages arising from use of the website or services.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions about these Terms, contact Zivora AI at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. You may also call{" "}
              {site.phones.map((phone, index) => (
                <span key={phone.href}>
                  <a href={phone.href}>{phone.label}</a>{index < site.phones.length - 1 ? " or " : ""}
                </span>
              ))}.
            </p>
          </section>

          <p className="legal-note">
            These Terms are provided for transparency and should be reviewed by a qualified lawyer for final legal suitability.
          </p>
        </div>
      </section>
    </main>
  );
}
