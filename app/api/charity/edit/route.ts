/**
 * POST /api/charity/edit
 * Body: { slug: string; request: string; email?: string }
 *
 * Accepts plain-English edit requests from verified charity owners.
 * Claude parses the request, extracts structured changes, applies them.
 * Only works for charities with linkback_verified_at set.
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { db, charities } from '@/db';
import { eq } from 'drizzle-orm';

const MODEL = 'claude-haiku-4-5-20251001';

const SYSTEM = `You process plain-English edit requests from charity owners who want to update their directory listing.

Given the current charity data and the edit request, return a JSON object with ONLY the fields that should change:
{
  "description": "new description text" | null,
  "website_url": "https://..." | null,
  "email": "contact@..." | null,
  "phone": "416-..." | null,
  "address_street": "123 Main St" | null,
  "address_city": "Toronto" | null,
  "address_postcode": "M5V 1A1" | null,
  "display_name": "Updated Name" | null,
  "reject_reason": null | "reason if the request cannot be fulfilled"
}

Only include fields that the request explicitly asks to change. Set any unchanged fields to null.
If the request asks for something you cannot do (add payment info, remove charity number, etc), set reject_reason.
Never fabricate information. Only apply what the requester explicitly provides.`;

const ALLOWED_FIELDS = ['description', 'website_url', 'email', 'phone', 'address_street', 'address_city', 'address_postcode', 'display_name'] as const;

export async function POST(req: NextRequest) {
  const { slug, request, email } = await req.json().catch(() => ({}));
  if (!slug || !request) {
    return NextResponse.json({ error: 'slug and request required' }, { status: 400 });
  }

  const [charity] = await db.select().from(charities).where(eq(charities.slug, slug)).limit(1);
  if (!charity) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if (!charity.linkback_verified_at) {
    return NextResponse.json({ error: 'Profile must be activated before editing.' }, { status: 403 });
  }

  const client = new Anthropic();

  const userPrompt = `Current charity data:
Name: ${charity.display_name}
Website: ${charity.website_url ?? 'not set'}
Email: ${charity.email ?? 'not set'}
Phone: ${charity.phone ?? 'not set'}
Address: ${[charity.address_street, charity.address_city, charity.address_postcode].filter(Boolean).join(', ') || 'not set'}
Description: ${charity.description?.slice(0, 300) ?? 'not set'}

Edit request from ${email ?? 'charity owner'}:
${request}`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = res.content[0].type === 'text' ? res.content[0].text : '';
  let changes: Record<string, string | null>;
  try {
    const cleaned = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    changes = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: 'Failed to parse edit request. Please try rephrasing.' }, { status: 422 });
  }

  if (changes.reject_reason) {
    return NextResponse.json({ applied: false, reason: changes.reject_reason });
  }

  const updates: Partial<typeof charity> = { updated_at: new Date() };
  for (const field of ALLOWED_FIELDS) {
    if (changes[field] != null) {
      (updates as any)[field] = changes[field];
    }
  }

  if (Object.keys(updates).length > 1) {
    await db.update(charities).set(updates).where(eq(charities.id, charity.id));
  }

  const appliedFields = ALLOWED_FIELDS.filter(f => changes[f] != null);
  return NextResponse.json({
    applied: true,
    fields: appliedFields,
    message: `Updated: ${appliedFields.join(', ')}.`,
  });
}
