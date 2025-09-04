export const runtime = "nodejs"; // use Node.js runtime (SMTP needs sockets)

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// ✅ validate env vars
const EnvSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  EMAIL_TO: z.string().email(),
});
const env = EnvSchema.parse(process.env);

// ✅ validate request body
const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Body = z.infer<typeof BodySchema>;

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.parse(json);

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${env.SMTP_USER}>`,
      to: env.EMAIL_TO,
      replyTo: parsed.email,
      subject: `Message from ${parsed.name}`,
      text: `${parsed.message}\n\nFrom: ${parsed.name} <${parsed.email}>`,
    });

    return NextResponse.json({ ok: true, message: "Email sent successfully" }, { status: 200 });
  } catch (err) {
    console.error("[contact] error", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
