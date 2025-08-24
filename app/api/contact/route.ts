import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { z } from 'zod';
import AdminNotification from '../../emails/AdminNotification';
import UserReceipt from '../../emails/UserReceipt';

// IMPORTANT: keep Node runtime; the Resend Node SDK is designed for Node/serverless.
export const runtime = 'nodejs';
// On Vercel, this ensures this route stays dynamic.
export const dynamic = 'force-dynamic';

// Convert comma-separated env string to a Set
const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean) // remove empty entries
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema aligned with your client
const ContactFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase()
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  // Honeypot (must be empty)
  website: z.string().max(0).optional().or(z.literal('')),
});

type ContactResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  id?: string;
};

export async function POST(request: NextRequest) {
  try {
    // Basic origin check
    const origin = request.headers.get('origin') ?? '';
    if (!ALLOWED_ORIGINS.has(origin)) {
      return NextResponse.json<ContactResponse>(
        { success: false, message: 'Origin not allowed.' },
        { status: 403 },
      );
    }

    // Parse and validate
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ContactResponse>(
        { success: false, message: 'Invalid JSON in request body.' },
        { status: 400 },
      );
    }

    const parsed = ContactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: 'Please check your input and try again.',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, message } = parsed.data;

    // Honeypot catch (bots fill hidden fields)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((parsed.data as any).website) {
      // Pretend success to not tip off bots
      return NextResponse.json<ContactResponse>({
        success: true,
        message: 'Thanks! If this was legitimate, we’ll be in touch.',
      });
    }

    // Request metadata (for admin email)
    const h = await headers();
    const userAgent = h.get('user-agent') || 'Unknown';
    const referer = h.get('referer') || 'Direct';
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') ?? 'Unknown';
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

    // --- SEND EMAILS (React templates) ---
    const fromAdmin = process.env.FROM_EMAIL ?? 'Contact <contact@yourdomain.com>';
    const toAdmin = process.env.CONTACT_EMAIL ?? 'gemuel20sampayan@gmail.com';
    const fromNoReply = process.env.FROM_EMAIL_NOREPLY ?? 'No Reply <noreply@yourdomain.com>';

    // Send to admin
    const adminRes = await resend.emails.send({
      from: fromAdmin,
      to: [toAdmin],
      replyTo: email,
      subject: `🚀 New Portfolio Contact: ${firstName} ${lastName}`,
      react: AdminNotification({
        firstName, lastName, email, message,
        ip, userAgent, referer, timestamp,
      }),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    });

    if (adminRes.error) {
      // Surface SDK error details safely
      console.error('Resend admin email error:', adminRes.error);
      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: 'Failed to send message. Please try again later or email me directly.',
        },
        { status: 502 },
      );
    }

    // Confirmation to user
    const userRes = await resend.emails.send({
      from: fromNoReply,
      to: [email],
      subject: `Thanks for reaching out, ${firstName}! 👋`,
      react: UserReceipt({
        firstName, lastName, email, message,
      }),
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@yourdomain.com>',
        'X-Auto-Response-Suppress': 'All',
      },
    });

    if (userRes.error) {
      console.error('Resend user receipt error:', userRes.error);
      // Still return success (admin got it), but log for investigation
    }

    return NextResponse.json<ContactResponse>({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24–48 hours. 🚀",
      id: adminRes.data?.id,
    });
  } catch (err) {
    console.error('Contact API fatal error:', err);
    return NextResponse.json<ContactResponse>(
      { success: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
export const PUT = GET;
export const DELETE = GET;
