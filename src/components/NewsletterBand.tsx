'use client';

import React, { useState } from 'react';

export function NewsletterBand({
  isRevealItem = false,
  successText = 'Subscribed! Watch your inbox for curated Japan drops & travel notes.',
  source = 'website-newsletter',
}: {
  isRevealItem?: boolean;
  successText?: string;
  source?: string;
}) {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('We respect your privacy. Unsubscribe anytime.');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = email.trim();
    if (!val || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val, source }),
      });
      if (res.ok) {
        setEmail('');
        setStatusMessage(successText);
        setIsSuccess(true);
      } else {
        setStatusMessage('Please enter a valid email address.');
      }
    } catch {
      setEmail('');
      setStatusMessage(successText);
      setIsSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className={`newsletter-band ${isRevealItem ? 'reveal-item' : ''}`}
      id="newsletter-band"
    >
      <div className="newsletter-scenic-edge" aria-hidden="true" />
      <div className="page-container">
        <div className="newsletter-inner">
          <div>
            <span className="newsletter-eyebrow">STAY INSPIRED</span>
            <h2 className="newsletter-heading">Get Travel Inspiration in Your Inbox</h2>
            <p className="newsletter-sub">
              Exclusive seasonal tour dates, JR Pass guides, and curated Japan offers &mdash; straight to you.
            </p>
          </div>
          <div className="newsletter-form-wrap">
            <form className="newsletter-form" id="newsletter-form" onSubmit={handleSubmit}>
              <input
                className="newsletter-input"
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="newsletter-submit" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
            <p className={`newsletter-note ${isSuccess ? 'is-success' : ''}`} id="newsletter-note">
              {statusMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
