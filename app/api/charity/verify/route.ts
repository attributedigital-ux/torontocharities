/**
 * POST /api/charity/verify
 * Body: { slug: string }
 *
 * Fetches the charity's registered website_url and checks it for a link
 * back to toronto-charities.ca. If found, marks linkback_verified_at + claimed_at.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db, charities } from '@/db';
import { eq } from 'drizzle-orm';

const TARGET_DOMAIN = 'toronto-charities.ca';
const TIMEOUT_MS = 8000;

async function checkForLinkback(websiteUrl: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(websiteUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'TorontoCharitiesVerifier/1.0' },
    });
    if (!res.ok) return false;
    const html = await res.text();
    return html.toLowerCase().includes(TARGET_DOMAIN);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  const { slug } = await req.json().catch(() => ({}));
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const [charity] = await db.select().from(charities).where(eq(charities.slug, slug)).limit(1);
  if (!charity) return NextResponse.json({ error: 'not found' }, { status: 404 });

  if (!charity.website_url) {
    return NextResponse.json({
      verified: false,
      reason: 'no_website',
      message: "We don't have a website on file for this charity. Email us at hello@toronto-charities.ca to add one.",
    });
  }

  const found = await checkForLinkback(charity.website_url);

  if (found) {
    await db.update(charities).set({
      linkback_verified_at: new Date(),
      claimed_at: charity.claimed_at ?? new Date(),
      updated_at: new Date(),
    }).where(eq(charities.id, charity.id));

    return NextResponse.json({ verified: true });
  }

  return NextResponse.json({
    verified: false,
    reason: 'link_not_found',
    website: charity.website_url,
    message: `We checked ${charity.website_url} but couldn't find a link to ${TARGET_DOMAIN}. Add the link and try again.`,
  });
}
