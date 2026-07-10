import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(80),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const data = parsed.data;
    const lead = await saveLead({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      service: data.service,
      budget: data.budget || null,
      message: data.message,
      source: "website",
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
