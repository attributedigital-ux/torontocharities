/**
 * Netlify scheduled function — sends up to 90 outreach emails per day.
 * Runs at 09:00 UTC daily. Stays within Resend free tier (3,000/month).
 *
 * Send logic:
 * - First contact: outreach_sent_at IS NULL
 * - Follow-up 1: 14 days after first email, outreach_count = 1
 * - Follow-up 2: 30 days after first email, outreach_count = 2
 * - No further emails after 2 follow-ups
 */

import type { Config } from '@netlify/functions';
import { db, charities } from '@/db';
import { isNotNull, isNull, and, lt, lte, sql, eq } from 'drizzle-orm';
import { Resend } from 'resend';

export const config: Config = { schedule: '0 9 * * *' };

const FROM = 'hello@toronto-charities.ca';
const BASE_URL = 'https://toronto-charities.ca';
const BATCH = 90;
const FOLLOWUP_1_DAYS = 14;
const FOLLOWUP_2_DAYS = 30;
const MAX_OUTREACH = 3; // initial + 2 follow-ups

function buildClaimUrl(slug: string, name: string, site: string | null) {
  const p = new URLSearchParams({ charity: slug, name, site: site ?? '' });
  return `${BASE_URL}/charity/claim/?${p}`;
}

function buildHtml(charity: { slug: string; display_name: string; website_url: string | null }, isFollowup: boolean) {
  const claimUrl = buildClaimUrl(charity.slug, charity.display_name, charity.website_url);
  const profileUrl = `${BASE_URL}/profile/${charity.slug}/`;
  const subject = isFollowup
    ? `Just checking in — ${charity.display_name}'s events still aren't showing up`
    : `Your events aren't showing up where Toronto donors are looking`;

  return {
    subject,
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a2332; background: #fff;">
  <p style="font-size: 13px; color: #6b7a8d; margin-bottom: 32px;">Toronto Charities Directory — toronto-charities.ca</p>

  ${isFollowup ? `
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">We reached out a couple of weeks ago about your free listing on Toronto Charities. Thousands of Toronto residents use the directory each month to find local charities and events — and ${charity.display_name} still isn't showing up fully.</p>
  ` : `
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Toronto Charities is a public directory for the GTA. Thousands of Toronto residents use it each month to find local charities and upcoming events — and <strong>${charity.display_name}</strong> already has a profile. But without activation, your events aren't appearing.</p>
  `}

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Activate your free listing and we'll automatically publish every event you post on Eventbrite, your website, or your blog. No submission forms, no admin. The moment you post something, it appears here.</p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; padding-left: 16px; border-left: 3px solid #2c7a4b; color: #2c3e50;">One step: add a link to <strong>toronto-charities.ca</strong> anywhere on your website, then click below and we verify it on the spot.</p>

  <div style="margin: 32px 0;">
    <a href="${claimUrl}" style="display: inline-block; background: #2c7a4b; color: #fff; padding: 16px 32px; font-family: sans-serif; font-size: 15px; font-weight: 600; text-decoration: none;">Activate your free listing →</a>
    <span style="display: inline-block; margin-left: 16px; font-family: sans-serif; font-size: 14px; color: #6b7a8d; vertical-align: middle;"><a href="${profileUrl}" style="color: #6b7a8d;">View your profile</a></span>
  </div>

  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px; font-style: italic; color: #2c3e50;">Free permanently. No paid tier exists or will.</p>

  <p style="font-size: 15px; line-height: 1.6; margin: 0;">The Toronto Charities team</p>

  <hr style="border: none; border-top: 1px solid #e5e8ec; margin: 32px 0;">
  <p style="font-size: 12px; line-height: 1.6; color: #9aa5b4; margin: 0;">
    You're receiving this because ${charity.display_name} is registered with the CRA. To remove your listing, reply with "remove" and we'll take it down within 24 hours.
    <br><br>Toronto Charities · toronto-charities.ca · hello@toronto-charities.ca
  </p>
</body>
</html>`,
  };
}

export default async function handler() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const now = new Date();
  const followup1Cutoff = new Date(now.getTime() - FOLLOWUP_1_DAYS * 86400000);
  const followup2Cutoff = new Date(now.getTime() - FOLLOWUP_2_DAYS * 86400000);

  // Priority 1: never emailed
  // Priority 2: emailed once, 14+ days ago
  // Priority 3: emailed twice, 30+ days ago
  const candidates = await db.select({
    id: charities.id,
    slug: charities.slug,
    display_name: charities.display_name,
    email: charities.email,
    website_url: charities.website_url,
    outreach_count: charities.outreach_count,
    outreach_sent_at: charities.outreach_sent_at,
  })
    .from(charities)
    .where(and(
      isNotNull(charities.email),
      isNull(charities.linkback_verified_at),
      isNull(charities.claimed_at),
      lt(charities.outreach_count, MAX_OUTREACH),
      sql`(
        ${charities.outreach_sent_at} IS NULL OR
        (${charities.outreach_count} = 1 AND ${charities.outreach_sent_at} <= ${followup1Cutoff.toISOString()}) OR
        (${charities.outreach_count} = 2 AND ${charities.outreach_sent_at} <= ${followup2Cutoff.toISOString()})
      )`,
    ))
    .orderBy(charities.outreach_count, charities.outreach_sent_at)
    .limit(BATCH);

  let sent = 0;
  for (const c of candidates) {
    if (!c.email) continue;
    const isFollowup = (c.outreach_count ?? 0) > 0;
    const { subject, html } = buildHtml(c, isFollowup);
    try {
      await resend.emails.send({ from: FROM, replyTo: FROM, to: c.email, subject, html });
      await db.update(charities)
        .set({
          outreach_sent_at: now,
          outreach_count: sql`${charities.outreach_count} + 1`,
          updated_at: now,
        })
        .where(eq(charities.id, c.id));
      sent++;
    } catch {}
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`Daily outreach: ${sent} sent`);
  return new Response(JSON.stringify({ sent }), { status: 200 });
}
