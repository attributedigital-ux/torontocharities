/**
 * Outreach emailer — sends activation invitations to charities with discovered emails.
 * Uses Resend. Skips charities already verified.
 *
 * Usage:
 *   # Dry run (prints what would be sent, sends nothing)
 *   npx tsx --env-file=.env scripts/send-outreach.ts --dry-run [--limit=N]
 *
 *   # Live send
 *   npx tsx --env-file=.env scripts/send-outreach.ts --send [--limit=N]
 *
 *   # Send follow-up to non-activated (14+ days since first email)
 *   npx tsx --env-file=.env scripts/send-outreach.ts --followup --send
 */

import { db, charities } from '@/db';
import { isNotNull, isNull, lte, and, eq } from 'drizzle-orm';
import { Resend } from 'resend';

const FROM = 'hello@toronto-charities.ca';
const REPLY_TO = 'hello@toronto-charities.ca';
const BASE_URL = 'https://toronto-charities.ca';
const DELAY_MS = 200; // Resend rate limit headroom

function buildClaimUrl(charity: { slug: string; display_name: string; website_url: string | null }) {
  const params = new URLSearchParams({
    charity: charity.slug,
    name: charity.display_name,
    site: charity.website_url ?? '',
  });
  return `${BASE_URL}/charity/claim/?${params}`;
}

function buildEmail(charity: { slug: string; display_name: string; website_url: string | null; address_city: string | null }) {
  const claimUrl = buildClaimUrl(charity);
  const profileUrl = `${BASE_URL}/profile/${charity.slug}/`;

  const subject = `We've listed ${charity.display_name} — your events could be reaching thousands`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a2332; background: #fff;">

  <p style="font-size: 13px; color: #6b7a8d; margin-bottom: 32px;">Toronto Charities Directory — toronto-charities.ca</p>

  <h1 style="font-size: 24px; font-weight: normal; margin: 0 0 24px; line-height: 1.3;">
    Hi — ${charity.display_name} already has a profile on Toronto Charities, and we'd love to make it work harder for you.
  </h1>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
    Toronto Charities is a free public directory of every registered charity in the GTA. Toronto residents use it to find causes they care about, discover local events, and decide where to donate or volunteer.
  </p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
    Your profile is already live with your registered name, address, and CRA details. But right now you're missing the best part: <strong>once you activate your listing, we automatically pull in and publish your events from Eventbrite — for free, permanently, with no ongoing work from you.</strong>
  </p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
    Activation takes two minutes:
  </p>
  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; padding-left: 16px; border-left: 3px solid #2c7a4b; color: #2c3e50;">
    Add a link to <strong>toronto-charities.ca</strong> anywhere on your website — footer, about page, resources — then click below and we verify it instantly.
  </p>

  <div style="margin: 32px 0;">
    <a href="${claimUrl}" style="display: inline-block; background: #2c7a4b; color: #fff; padding: 16px 32px; font-family: sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; letter-spacing: 0.02em;">
      Activate your free listing →
    </a>
  </div>

  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 6px; color: #2c3e50;"><strong>What you get, at no cost:</strong></p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 6px; color: #2c3e50;">Your upcoming events published automatically from Eventbrite — the moment you post them there, they appear here too.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 6px; color: #2c3e50;">A permanent, search-indexed profile with your description, contact details, and a verified badge linking directly to your site.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px; color: #2c3e50;">Update your listing any time just by replying to this email in plain English. No forms, no portal, no waiting.</p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; font-style: italic; color: #2c3e50;">
    This is free. Not free for now — free permanently. There is no paid tier, no upsell, and there never will be. The directory exists because Toronto's charity community deserves a good one.
  </p>

  <div style="margin: 0 0 32px;">
    <a href="${claimUrl}" style="display: inline-block; background: #2c7a4b; color: #fff; padding: 16px 32px; font-family: sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; letter-spacing: 0.02em;">
      Activate your free listing →
    </a>
    <span style="display: inline-block; margin-left: 16px; font-family: sans-serif; font-size: 14px; color: #6b7a8d; vertical-align: middle;">
      or <a href="${profileUrl}" style="color: #6b7a8d;">view your current profile</a>
    </span>
  </div>

  <hr style="border: none; border-top: 1px solid #e5e8ec; margin: 32px 0;">

  <p style="font-size: 12px; line-height: 1.6; color: #9aa5b4; margin: 0;">
    You're receiving this because ${charity.display_name} is registered with the CRA. To remove your listing from this directory, reply with the word "remove" and we'll take it down within 24 hours — no questions asked.
    <br><br>
    Toronto Charities · toronto-charities.ca · hello@toronto-charities.ca
  </p>

</body>
</html>`;

  return { subject, html };
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const isLive = process.argv.includes('--send');
  const isFollowup = process.argv.includes('--followup');
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 90;

  if (!isDryRun && !isLive) {
    console.log('Usage: --dry-run or --send [--followup] [--limit=N]');
    process.exit(1);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Charities with email, not yet verified, not opted out
  const candidates = await db.select({
    id: charities.id,
    slug: charities.slug,
    display_name: charities.display_name,
    email: charities.email,
    website_url: charities.website_url,
    address_city: charities.address_city,
    linkback_verified_at: charities.linkback_verified_at,
  })
    .from(charities)
    .where(and(
      isNotNull(charities.email),
      isNull(charities.linkback_verified_at),
    ))
    .limit(limit);

  console.log(`${candidates.length} charities to contact`);
  if (isDryRun) console.log('DRY RUN — no emails will be sent\n');

  let sent = 0;
  let skipped = 0;

  for (const charity of candidates) {
    if (!charity.email) { skipped++; continue; }

    const { subject, html } = buildEmail({
      slug: charity.slug,
      display_name: charity.display_name,
      website_url: charity.website_url,
      address_city: charity.address_city,
    });

    if (isDryRun) {
      console.log(`TO: ${charity.email}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`CLAIM URL: ${buildClaimUrl(charity)}`);
      console.log('---');
      sent++;
      continue;
    }

    try {
      await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to: charity.email,
        subject,
        html,
      });
      sent++;
      if (sent % 10 === 0) process.stdout.write(`\r${sent} sent...`);
    } catch (err) {
      console.warn(`  Failed ${charity.email}: ${(err as Error).message}`);
      skipped++;
    }

    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\n\nDone. ${sent} ${isDryRun ? 'would be sent' : 'sent'}, ${skipped} skipped.`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
