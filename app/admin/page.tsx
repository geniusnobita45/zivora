import type { Metadata } from "next";
import Link from "next/link";
import { Orbit } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { getLeads } from "@/lib/leads";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authenticated = await isAdmin();
  const params = await searchParams;

  if (!authenticated) {
    return (
      <main className="admin-page">
        <div className="admin-login">
          <form className="admin-login-card" action="/api/admin/login" method="post">
            <Link className="brand" href="/">
              <span className="brand-mark"><Orbit size={20} /></span>
              <span>{site.name}</span>
            </Link>
            <h1>Lead command center</h1>
            <p>Sign in to view project briefs submitted through the website.</p>
            {params.error ? <p className="admin-error">Invalid credentials</p> : null}
            <input type="password" name="password" placeholder="Admin password" required autoFocus />
            <button className="button button-primary" type="submit">Open dashboard</button>
          </form>
        </div>
      </main>
    );
  }

  const leads = await getLeads();

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div className="admin-title">
            <h1>Project briefs</h1>
            <p>{leads.length} lead{leads.length === 1 ? "" : "s"} captured</p>
          </div>
          <div className="admin-header-actions">
            <Link href="/">View website</Link>
            <form action="/api/admin/logout" method="post"><button type="submit">Sign out</button></form>
          </div>
        </header>

        {leads.length ? (
          <section className="lead-list">
            {leads.map((lead) => (
              <article className="lead-card" key={lead.id}>
                <div>
                  <small>CONTACT</small>
                  <h3>{lead.name}</h3>
                  <p>{lead.company || "No company provided"}</p>
                  <p><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone ? <> Â· <a href={`tel:${lead.phone}`}>{lead.phone}</a></> : null}</p>
                </div>
                <div className="lead-meta">
                  <small>PROJECT</small>
                  <span>{lead.service}</span>
                  <span>{lead.budget || "Budget not selected"}</span>
                </div>
                <div>
                  <small>BUSINESS PROBLEM</small>
                  <p>{lead.message}</p>
                </div>
                <time className="lead-date" dateTime={lead.createdAt}>
                  {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(lead.createdAt))}
                </time>
              </article>
            ))}
          </section>
        ) : (
          <div className="empty-leads">No project briefs yet. Submit the form on the homepage to test the full flow.</div>
        )}
      </div>
    </main>
  );
}

