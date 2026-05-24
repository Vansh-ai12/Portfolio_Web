import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  if (!process.env.RESEND_API_KEY) {
    console.log("Contact message received:", parsed.data);
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: parsed.data.subject,
      text: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`
    })
  });

  if (!response.ok) return NextResponse.json({ error: "Email failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
