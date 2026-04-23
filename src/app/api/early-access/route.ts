import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = emailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email not sent:', email);
      // In development, return success even without API key
      return NextResponse.json({
        message: 'Success (dev mode - email logged but not sent)',
        email,
      });
    }

    // Initialize Resend client with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification to Gal
    await resend.emails.send({
      from: 'Early Access <onboarding@resend.dev>', // TODO: Update with verified domain
      to: 'gal@example.com', // TODO: @gal - provide actual email
      subject: 'New Early Access Sign-up',
      html: `
        <h2>New early access request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Source: AI Integration Landing Page - Workflow Tool</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Gal Moussan <onboarding@resend.dev>', // TODO: Update with verified domain
      to: email,
      subject: "You're on the early access list",
      html: `
        <h2>Thanks for your interest!</h2>
        <p>I'll email you when the workflow visualization tool is ready.</p>
        <p>In the meantime, if you want to discuss your AI automation needs, feel free to reach out via WhatsApp.</p>
        <p>— Gal</p>
      `,
    });

    return NextResponse.json({ message: 'Success', email });
  } catch (error) {
    console.error('Early access API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
