import { z } from "zod";

export const SERVICE_OPTIONS = [
  "AI Automation",
  "Website Development",
  "Custom AI Tools",
  "Content & AdSense Growth",
  "Social Media Systems",
  "Paid Ad Funnels",
  "Complete digital system — everything",
] as const;

export const BUDGET_OPTIONS = [
  "",
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹7L",
  "₹7L+",
  "Not sure yet — help me plan",
] as const;

export const CONTACT_MAX_BODY_BYTES = 12_000;
export const MIN_FORM_COMPLETION_MS = 2_500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const emptyToNull = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    phone: z.string().max(30).optional().transform(emptyToNull),
    company: z.string().max(120).optional().transform(emptyToNull),
    service: z.enum(SERVICE_OPTIONS),
    budget: z.enum(BUDGET_OPTIONS).optional().transform((value) => (value ? value : null)),
    message: z.string().trim().min(10).max(4_000),
    website: z.string().max(200).optional(),
    formStartedAt: z.coerce.number().int().positive(),
  })
  .strict();

export type LeadSubmission = Omit<z.infer<typeof leadSchema>, "website" | "formStartedAt"> & {
  source: "website";
};

export function parseLeadSubmission(input: unknown, now = Date.now()) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, reason: "invalid" as const };
  }

  const elapsed = now - parsed.data.formStartedAt;
  if (elapsed < MIN_FORM_COMPLETION_MS || elapsed > MAX_FORM_AGE_MS) {
    return { ok: false as const, reason: "timing" as const };
  }

  if (parsed.data.website) {
    return { ok: true as const, spam: true as const };
  }

  return {
    ok: true as const,
    spam: false as const,
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      service: parsed.data.service,
      budget: parsed.data.budget,
      message: parsed.data.message,
      source: "website" as const,
    },
  };
}


