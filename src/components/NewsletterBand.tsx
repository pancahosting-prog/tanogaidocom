'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterBand() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to Tanogaido stories!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="newsletter-band" aria-labelledby="newsletter-heading">
      <div className="newsletter-inner">
        <h2 id="newsletter-heading" className="newsletter-title">
          Stay Inspired for Your Japan Journey
        </h2>
        <p className="newsletter-sub">
          Receive seasonal itinerary recommendations, hidden culinary spots, and VIP concierge privileges directly in your inbox.
        </p>

        {status === 'success' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontWeight: 600 }}>
            <CheckCircle2 size={20} />
            <span>{message}</span>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-input"
              aria-label="Email address"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="newsletter-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#dc2626', fontSize: 13, marginTop: 12 }}>
            <AlertCircle size={16} />
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}
