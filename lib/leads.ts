import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import postgres from "postgres";
import { ConfigurationError } from "@/lib/errors";
import type { Lead } from "@/lib/types";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "leads.json");
const MAX_ADMIN_LEADS = 100;

async function ensureLocalFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readLocalLeads(): Promise<Lead[]> {
  await ensureLocalFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return (JSON.parse(raw) as Lead[]).slice(0, MAX_ADMIN_LEADS);
}

async function writeLocalLeads(leads: Lead[]) {
  await ensureLocalFile();
  await fs.writeFile(dataFile, JSON.stringify(leads.slice(0, MAX_ADMIN_LEADS), null, 2), "utf8");
}

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new ConfigurationError("DATABASE_URL is required for production lead storage.");
    }
    return null;
  }
  return postgres(url, { max: 1, prepare: false });
}

async function ensurePostgresTable(sql: ReturnType<typeof postgres>) {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT NOT NULL,
      budget TEXT,
      message TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'website',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function saveLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const sql = getSql();
  if (sql) {
    try {
      await ensurePostgresTable(sql);
      await sql`
        INSERT INTO leads (id, name, email, phone, company, service, budget, message, source, created_at)
        VALUES (${lead.id}, ${lead.name}, ${lead.email}, ${lead.phone ?? null}, ${lead.company ?? null}, ${lead.service}, ${lead.budget ?? null}, ${lead.message}, ${lead.source}, ${lead.createdAt})
      `;
    } finally {
      await sql.end();
    }
    return lead;
  }

  const leads = await readLocalLeads();
  leads.unshift(lead);
  await writeLocalLeads(leads);
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const sql = getSql();
  if (sql) {
    try {
      await ensurePostgresTable(sql);
      const rows = await sql<Lead[]>`
        SELECT
          id, name, email, phone, company, service, budget, message, source,
          created_at::text AS "createdAt"
        FROM leads
        ORDER BY created_at DESC
        LIMIT ${MAX_ADMIN_LEADS}
      `;
      return rows;
    } finally {
      await sql.end();
    }
  }

  return readLocalLeads();
}
