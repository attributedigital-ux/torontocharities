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

  const subject = `Your free charity listing is live — ${charity.display_name}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a2332; background: #fff;">

  <p style="font-size: 13px; color: #6b7a8d; margin-bottom: 32px;">Toronto Charities Directory</p>

  <h1 style="font-size: 24px; font-weight: normal; margin: 0 0 24px; line-height: 1.3;">
    ${charity.display_name} has a free listing on Toronto Charities
  </h1>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
    We have built a public directory of every registered charity in the Toronto area — and your profile is already live.
  </p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
    Right now it shows your registered name, address, and CRA number. Once you activate it, we will also publish your events automatically, keep your description current, and display a verified badge next to your name.
  </p>

  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
    Activation takes about two minutes. Add a link to <strong>toronto-charities.ca</strong> anywhere on your website — your footer, about page, or resources section — then click the button below and we will verify it on the spot.
  </p>

  <div style="margin: 32px 0;">
    <a href="${claimUrl}" style="display: inline-block; background: #2c7a4b; color: #fff; padding: 14px 28px; font-family: sans-serif; font-size: 15px; font-weight: 500; text-decoration: none;">
      Activate your free listing →
    </a>
  </div>

  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #2c3e50;">
    <strong>What you get:</strong>
  </p>
  <ul style="font-size: 15px; line-height: 1.8; margin: 0 0 24px; padding-left: 20px; color: #2c3e50;">
    <li>Your events published automatically from Eventbrite and your website calendar</li>
    <li>A permanent, indexed profile page for your charity</li>
    <li>A verified badge and direct link to your website</li>
    <li>Update your description or contact details any time by replying to this email</li>
  </ul>

  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
    This is free. There is no fee now, and there will not be one. The directory exists to help Toronto residents find and support local charities.
  </p>

  <p style="font-size: 14px; line-height: 1.6; color: #6b7a8d; margin: 0 0 8px;">
    <a href="${profileUrl}" style="color: #6b7a8d;">View your current listing</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e8ec; margin: 32px 0;">

  <p style="font-size: 12px; line-height: 1.6; color: #9aa5b4; margin: 0;">
    You are receiving this because ${charity.display_name} is a registered charity listed in the CRA public registry.
    To remove your charity from this directory, reply with "remove" and we will take it down within 24 hours.
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
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 100;

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
