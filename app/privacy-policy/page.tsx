import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Zivora AI project enquiries and client communication.",
  alternates: {
    canonical: "https://zivoraai.co.in/privacy-policy",
  },
};

const updatedAt = "July 11, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <section className="legal-shell">
        <Link className="legal-back" href="/">Back to Zivora AI</Link>
        <p className="legal-kicker">Zivora AI</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: {updatedAt}</p>

        <div className="legal-content">
          <section>
            <h2>Information We Collect</h2>
            <p>
              When you submit a project enquiry through this website, Zivora AI may collect your name,
              email address, phone number, company or brand name, selected service, budget range, and
              project message. We also use basic technical and security checks to protect the form from spam and abuse.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information you provide to understand your project enquiry, respond to you,
              communicate about possible services, prepare proposals, and manage client communication.
              We do not sell your enquiry information.
            </p>
          </section>

          <section>
            <h2>Where Data May Be Stored</h2>
            <p>
              Enquiry data may be stored in a Supabase database or another configured production database.
              The website is hosted on Vercel. Business email communication may be handled through Hostinger
              business email services. These providers may process data as part of hosting, database, email,
              delivery, security, and operational services.
            </p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              We retain enquiry information for as long as reasonably needed to respond to the enquiry,
              discuss a project, maintain business records, resolve disputes, and improve our services.
              If a project does not move forward, we aim to delete or anonymize enquiry information within
              24 months unless a longer period is required for legitimate business, legal, tax, accounting,
              security, or dispute-resolution reasons.
            </p>
          </section>

          <section>
            <h2>Data Deletion Requests</h2>
            <p>
              You can request deletion of your enquiry data by contacting us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. We may need to verify the request and may retain
              limited records where required for legal, security, accounting, or legitimate business reasons.
            </p>
          </section>

          <section>
            <h2>Security Limitations</h2>
            <p>
              We use reasonable technical and organizational measures to protect enquiry data. However, no
              website, database, email system, or internet transmission can be guaranteed to be completely secure.
              You should avoid submitting highly sensitive personal, financial, medical, or confidential information
              through the enquiry form unless it is necessary for the project discussion.
            </p>
          </section>

          <section>
            <h2>Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated date on this page shows when
              the latest version was published.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For privacy questions or deletion requests, contact Zivora AI at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. You may also call{" "}
              {site.phones.map((phone, index) => (
                <span key={phone.href}>
                  <a href={phone.href}>{phone.label}</a>{index < site.phones.length - 1 ? " or " : ""}
                </span>
              ))}.
            </p>
          </section>

          <p className="legal-note">
            This policy is provided for transparency and should be reviewed by a qualified lawyer for final legal suitability.
          </p>
        </div>
      </section>
    </main>
  );
}
