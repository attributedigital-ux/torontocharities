/**
 * Netlify scheduled function — sends up to 90 outreach emails per day.
 * Runs at 09:00 UTC daily. Stays within Resend free tier (3,000/month).
 */

import type { Config } from '@netlify/functions';
import { db, charities } from '@/db';
import { isNotNull, isNull, and } from 'drizzle-orm';
import { Resend } from 'resend';

export const config: Config = { schedule: '0 9 * * *' };

const FROM = 'hello@toronto-charities.ca';
const BASE_URL = 'https://toronto-charities.ca';
const BATCH = 90;

function buildClaimUrl(slug: string, name: string, site: string | null) {
  const p = new URLSearchParams({ charity: slug, name, site: site ?? '' });
  return `${BASE_URL}/charity/claim/?${p}`;
}

function buildHtml(charity: { slug: string; display_name: string; website_url: string | null }) {
  const claimUrl = buildClaimUrl(charity.slug, charity.display_name, charity.website_url);
  const profileUrl = `${BASE_URL}/profile/${charity.slug}/`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a2332; background: #fff;">
  <p style="font-size: 13px; color: #6b7a8d; margin-bottom: 32px;">Toronto Charities Directory</p>
  <h1 style="font-size: 24px; font-weight: normal; margin: 0 0 24px; line-height: 1.3;">${charity.display_name} has a free listing on Toronto Charities</h1>
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">We have built a public directory of every registered charity in the Toronto area — and your profile is already live.</p>
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Right now it shows your registered name, address, and CRA number. Once you activate it, we will also publish your events automatically and display a verified badge next to your name.</p>
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">Activation takes about two minutes. Add a link to <strong>toronto-charities.ca</strong> anywhere on your website, then click below and we verify it on the spot.</p>
  <div style="margin: 32px 0;">
    <a href="${claimUrl}" style="display: inline-block; background: #2c7a4b; color: #fff; padding: 14px 28px; font-family: sans-serif; font-size: 15px; font-weight: 500; text-decoration: none;">Activate your free listing →</a>
  </div>
  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">This is free. There is no fee now, and there will not be one.</p>
  <p style="font-size: 14px; line-height: 1.6; color: #6b7a8d; margin: 0 0 8px;"><a href="${profileUrl}" style="color: #6b7a8d;">View your current listing</a></p>
  <hr style="border: none; border-top: 1px solid #e5e8ec; margin: 32px 0;">
  <p style="font-size: 12px; line-height: 1.6; color: #9aa5b4; margin: 0;">
    You are receiving this because ${charity.display_name} is a registered charity in the CRA public registry.
    To remove your listing, reply with "remove".<br><br>
    Toronto Charities · toronto-charities.ca
  </p>
</body>
</html>`;
}

export default async function handler() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const candidates = await db.select({
    id: charities.id,
    slug: charities.slug,
    display_name: charities.display_name,
    email: charities.email,
    website_url: charities.website_url,
  })
    .from(charities)
    .where(and(
      isNotNull(charities.email),
      isNull(charities.linkback_verified_at),
      isNull(charities.claimed_at),
    ))
    .limit(BATCH);

  let sent = 0;
  for (const c of candidates) {
    if (!c.email) continue;
    try {
      await resend.emails.send({
        from: FROM,
        replyTo: FROM,
        to: c.email,
        subject: `Your free charity listing is live — ${c.display_name}`,
        html: buildHtml(c),
      });
      sent++;
    } catch {}
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`Daily outreach: ${sent} emails sent`);
  return new Response(JSON.stringify({ sent }), { status: 200 });
}
