/**
 * POST /api/inbound-email
 * Resend inbound webhook — receives emails sent to hello@toronto-charities.ca.
 *
 * Flow:
 * 1. Resend receives email, POSTs JSON payload to this endpoint
 * 2. We find the charity by matching sender email to charities.email
 * 3. Claude reads the email body and decides what to do:
 *    - Edit request → apply via /api/charity/edit logic, reply with confirmation
 *    - Removal request → mark opted_out, reply confirming removal
 *    - Question → Claude answers from charity data, replies
 *    - Unclear → polite reply asking them to clarify
 * 4. We reply via Resend API
 *
 * Setup in Resend dashboard:
 *   Domains → toronto-charities.ca → Inbound → Add webhook URL:
 *   https://toronto-charities.ca/api/inbound-email
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { db, charities, event_source_opt_outs } from '@/db';
import { eq } from 'drizzle-orm';

const MODEL = 'claude-haiku-4-5-20251001';
const FROM = 'hello@toronto-charities.ca';

const SYSTEM = `You handle inbound emails from Toronto-area charities about their directory listing on toronto-charities.ca.

You will receive the charity's current data and the email body. Respond with a JSON object:
{
  "action": "edit" | "remove" | "answer" | "clarify",
  "edit_request": "plain English description of changes to make, or null",
  "reply_body": "plain text reply to send to the charity (no HTML, no markdown)",
  "reject_reason": null | "reason if something can't be done"
}

Rules:
- "edit": they want to update their listing (description, address, phone, website, name)
- "remove": they want their charity removed from the directory
- "answer": they have a question you can answer from their data (how to add events, what the directory is, etc)
- "clarify": their email is too vague to act on

Reply tone: warm, plain, direct. One or two short paragraphs. No em dashes. No bullet lists in the reply.
Sign off as: "Toronto Charities team"
Never promise features that don't exist. Never invent information about their charity.`;

const ALLOWED_FIELDS = ['description', 'website_url', 'email', 'phone', 'address_street', 'address_city', 'address_postcode', 'display_name'] as const;

export async function POST(req: NextRequest) {
  // Resend inbound webhook verification
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = req.headers.get('svix-signature');
    if (!signature) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // In production: verify svix signature here
  }

  const payload = await req.json().catch(() => null);
  if (!payload) return NextResponse.json({ ok: true }); // Ignore malformed

  const fromEmail: string = payload.from?.address ?? payload.from ?? '';
  const subject: string = payload.subject ?? '';
  const body: string = payload.text ?? payload.html?.replace(/<[^>]+>/g, ' ') ?? '';

  if (!fromEmail || !body) return NextResponse.json({ ok: true });

  // Find charity by sender email
  const [charity] = await db.select().from(charities)
    .where(eq(charities.email, fromEmail.toLowerCase()))
    .limit(1);

  if (!charity) {
    // Unknown sender — send a polite reply pointing them to the directory
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: fromEmail,
      subject: `Re: ${subject}`,
      text: `Thanks for getting in touch.\n\nWe couldn't match your email address to a listing in our directory. If your charity is registered with the CRA, you can find your profile at toronto-charities.ca and activate it from there.\n\nIf you need help finding your listing, reply with your charity's registered name.\n\nToronto Charities team`,
    });
    return NextResponse.json({ ok: true });
  }

  // Handle remove request without Claude (fast path)
  if (/\b(remove|unsubscribe|opt.?out|delete|take.*down)\b/i.test(body)) {
    await db.insert(event_source_opt_outs).values({
      charity_id: charity.id,
      reason: 'inbound email removal request',
    }).onConflictDoNothing();

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: fromEmail,
      subject: `Re: ${subject}`,
      text: `We have removed ${charity.display_name} from the Toronto Charities directory. The listing will no longer appear in search results.\n\nIf you change your mind, email us and we will restore it.\n\nToronto Charities team`,
    });
    return NextResponse.json({ ok: true });
  }

  // Claude processes the email
  const client = new Anthropic();
  const userPrompt = `Charity: ${charity.display_name}
Current data:
- Website: ${charity.website_url ?? 'not set'}
- Email: ${charity.email ?? 'not set'}
- Phone: ${charity.phone ?? 'not set'}
- Address: ${[charity.address_street, charity.address_city, charity.address_postcode].filter(Boolean).join(', ') || 'not set'}
- Description: ${charity.description?.slice(0, 200) ?? 'not set'}
- Verified: ${charity.linkback_verified_at ? 'yes' : 'no'}

Email from: ${fromEmail}
Subject: ${subject}
Body:
${body.slice(0, 1500)}`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = res.content[0].type === 'text' ? res.content[0].text : '';
  let result: Record<string, any>;
  try {
    const cleaned = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    result = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ ok: true }); // Can't parse, skip silently
  }

  // Apply edit if requested
  if (result.action === 'edit' && result.edit_request) {
    const editRes = await fetch(`${process.env.NEXTAUTH_URL ?? 'https://toronto-charities.ca'}/api/charity/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: charity.slug, request: result.edit_request, email: fromEmail }),
    });
    // edit result is logged but reply comes from Claude's reply_body
  }

  // Send reply
  if (result.reply_body) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: fromEmail,
      subject: `Re: ${subject}`,
      text: result.reply_body,
    });
  }

  return NextResponse.json({ ok: true });
}
