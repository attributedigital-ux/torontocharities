'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

type Step = 'instructions' | 'checking' | 'verified' | 'not_found' | 'editing' | 'done';

function ClaimContent() {
  const params = useSearchParams();
  const slug = params.get('charity') ?? '';
  const charityName = params.get('name') ?? 'your charity';
  const websiteUrl = params.get('site') ?? '';

  const [step, setStep] = useState<Step>('instructions');
  const [editRequest, setEditRequest] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [appliedFields, setAppliedFields] = useState<string[]>([]);

  async function verify() {
    setStep('checking');
    const res = await fetch('/api/charity/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    if (data.verified) {
      setStep('verified');
    } else {
      setMessage(data.message ?? 'Link not found.');
      setStep('not_found');
    }
  }

  async function submitEdit() {
    const res = await fetch('/api/charity/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, request: editRequest, email }),
    });
    const data = await res.json();
    if (data.applied) {
      setAppliedFields(data.fields ?? []);
      setStep('done');
    } else {
      setMessage(data.reason ?? data.error ?? 'Could not apply edit.');
    }
  }

  return (
    <>
      <Nav />
      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="mb-6">
          <Link href={`/profile/${slug}/`} className="text-sm text-tp-muted hover:text-tp-blue">
            ← Back to {charityName}
          </Link>
        </div>

        <h1 className="text-3xl mb-2">Activate your free listing</h1>
        <p className="text-tp-muted mb-8">{charityName}</p>

        {step === 'instructions' && (
          <div className="space-y-6">
            <p className="text-tp-ink leading-relaxed">
              Once activated, your profile will automatically list all your upcoming events from Eventbrite and any calendar feeds we find on your site. No ongoing admin needed.
            </p>
            <div className="border border-tp-rule rounded p-5 space-y-4">
              <h2 className="font-medium">One step to activate</h2>
              <p className="text-tp-ink text-sm leading-relaxed">
                Add a link to <strong>toronto-charities.ca</strong> somewhere on your website — your about page, footer, or resources section. Then come back here and click Verify.
              </p>
              {websiteUrl && (
                <p className="text-xs text-tp-muted">
                  We will check: <span className="font-mono">{websiteUrl}</span>
                </p>
              )}
            </div>
            <button
              onClick={verify}
              className="w-full bg-tc-sage text-tp-bg py-3 font-medium hover:opacity-90 transition-opacity"
            >
              I've added the link — verify now
            </button>
          </div>
        )}

        {step === 'checking' && (
          <p className="text-tp-muted">Checking your website for the link...</p>
        )}

        {step === 'not_found' && (
          <div className="space-y-4">
            <div className="border border-tp-rule rounded p-4 bg-tp-paper">
              <p className="text-tp-ink text-sm">{message}</p>
            </div>
            <p className="text-sm text-tp-muted">
              Make sure the link is live on your site — it can take a moment to publish. Then try again.
            </p>
            <button
              onClick={verify}
              className="w-full border border-tc-sage text-tc-sage py-3 font-medium hover:bg-tc-sage hover:text-tp-bg transition-all"
            >
              Try again
            </button>
          </div>
        )}

        {step === 'verified' && (
          <div className="space-y-6">
            <div className="border border-tc-sage rounded p-4 bg-tp-paper">
              <p className="text-sm font-medium text-tc-sage mb-1">Verified</p>
              <p className="text-tp-ink text-sm">
                Your profile is now active. We found the link and your listing is live.
              </p>
            </div>
            <p className="text-tp-ink text-sm leading-relaxed">
              Want to update your description, address, phone, or website? Describe the change in plain English below.
            </p>
            <div className="space-y-3">
              <textarea
                value={editRequest}
                onChange={e => setEditRequest(e.target.value)}
                placeholder="e.g. Please update our address to 123 King St West, Toronto M5H 1J9. Our new phone number is 416-555-0100."
                rows={4}
                className="w-full border border-tp-rule rounded p-3 text-sm text-tp-ink placeholder:text-tp-muted focus:outline-none focus:border-tp-blue resize-none"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email (so we can confirm changes)"
                className="w-full border border-tp-rule rounded p-3 text-sm text-tp-ink placeholder:text-tp-muted focus:outline-none focus:border-tp-blue"
              />
            </div>
            {message && <p className="text-sm text-tp-muted">{message}</p>}
            <div className="flex gap-3">
              <button
                onClick={submitEdit}
                disabled={!editRequest.trim()}
                className="flex-1 bg-tp-blue text-tp-bg py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Apply changes
              </button>
              <Link
                href={`/profile/${slug}/`}
                className="flex-1 text-center border border-tp-rule py-3 text-sm text-tp-ink hover:border-tp-blue transition-colors"
              >
                View profile
              </Link>
            </div>
          </div>
        )}

        {step === 'editing' && (
          <p className="text-tp-muted">Applying your changes...</p>
        )}

        {step === 'done' && (
          <div className="space-y-4">
            <div className="border border-tc-sage rounded p-4 bg-tp-paper">
              <p className="text-sm font-medium text-tc-sage mb-1">Changes applied</p>
              <p className="text-tp-ink text-sm">
                Updated: {appliedFields.join(', ')}.
              </p>
            </div>
            <Link
              href={`/profile/${slug}/`}
              className="block text-center bg-tp-blue text-tp-bg py-3 font-medium hover:opacity-90"
            >
              View your updated profile
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-16 text-tp-muted">Loading...</div>}>
      <ClaimContent />
    </Suspense>
  );
}
