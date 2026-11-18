'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import {
  buildWhatsAppContextUrl,
  MAX_CS_AI_REPLIES,
  type CsChatMessage,
  type CsLeadInfo,
} from '@/lib/cs-context';

interface FloatingConciergeProps {
  whatsappNumber: string;
  brandName?: string;
}

const STORAGE_KEY = 'tanogaido_cs_session_v1';

const STARTER_TOPICS = [
  'Private Japan tour guide pricing',
  'Japan tourist visa assistance',
  'JR Pass & private airport car',
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 16;
}

export function FloatingConcierge({
  whatsappNumber,
  brandName = 'Tanogaido',
}: FloatingConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Pre-chat mandatory lead state
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [waInput, setWaInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [formError, setFormError] = useState('');

  // Chat state
  const [messages, setMessages] = useState<CsChatMessage[]>([]);
  const [replyCount, setReplyCount] = useState(0);
  const [draftMessage, setDraftMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          lead?: CsLeadInfo;
          leadSubmitted?: boolean;
          messages?: CsChatMessage[];
          replyCount?: number;
        };
        if (parsed.lead) {
          setNameInput(parsed.lead.name || '');
          setWaInput(parsed.lead.whatsapp || '');
          setEmailInput(parsed.lead.email || '');
        }
        if (parsed.leadSubmitted) setLeadSubmitted(true);
        if (Array.isArray(parsed.messages)) setMessages(parsed.messages);
        if (typeof parsed.replyCount === 'number') setReplyCount(parsed.replyCount);
      }
    } catch {
      // Ignore storage read error
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lead: {
            name: nameInput.trim(),
            whatsapp: waInput.trim(),
            email: emailInput.trim(),
          },
          leadSubmitted,
          messages,
          replyCount,
        })
      );
    } catch {
      // Ignore storage write error
    }
  }, [hydrated, nameInput, waInput, emailInput, leadSubmitted, messages, replyCount]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen, messages, sending]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const lead: CsLeadInfo = useMemo(
    () => ({
      name: nameInput.trim(),
      whatsapp: waInput.trim(),
      email: emailInput.trim(),
    }),
    [nameInput, waInput, emailInput]
  );

  const whatsappContextUrl = useMemo(
    () =>
      buildWhatsAppContextUrl({
        whatsappNumber,
        lead: lead.name ? lead : { name: 'Website Visitor', whatsapp: waInput || '-', email: emailInput || '-' },
        messages,
      }),
    [whatsappNumber, lead, waInput, emailInput, messages]
  );

  const limitReached = replyCount >= MAX_CS_AI_REPLIES;
  const remainingReplies = Math.max(0, MAX_CS_AI_REPLIES - replyCount);

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (nameInput.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!isValidPhone(waInput)) {
      setFormError('Please enter a valid WhatsApp number (min. 8 digits).');
      return;
    }
    if (!isValidEmail(emailInput)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    setLeadSubmitted(true);
  }

  async function sendQuestion(questionText: string) {
    const trimmed = questionText.trim();
    if (!trimmed || sending || limitReached) return;

    const historyBefore = messages;
    const optimisticMessages: CsChatMessage[] = [
      ...historyBefore,
      { role: 'user', content: trimmed },
    ];

    setMessages(optimisticMessages);
    setDraftMessage('');
    setChatError('');
    setSending(true);

    try {
      const res = await fetch('/api/cs-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          message: trimmed,
          history: historyBefore,
          replyCount,
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        replyCount?: number;
        limitReached?: boolean;
        error?: string;
      };

      if (!res.ok && data.limitReached) {
        setReplyCount(MAX_CS_AI_REPLIES);
        if (data.error) setChatError(data.error);
        return;
      }

      if (!res.ok || !data.reply) {
        setMessages(historyBefore);
        setDraftMessage(trimmed);
        setChatError(
          data.error ||
            'Unable to reach the AI concierge right now. Please connect directly on WhatsApp.'
        );
        return;
      }

      setMessages([...optimisticMessages, { role: 'assistant', content: data.reply }]);
      setReplyCount(typeof data.replyCount === 'number' ? data.replyCount : replyCount + 1);
    } catch {
      setMessages(historyBefore);
      setDraftMessage(trimmed);
      setChatError('Connection interrupted. Please try again or continue via WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendQuestion(draftMessage);
  }

  function handleResetSession() {
    setMessages([]);
    setReplyCount(0);
    setChatError('');
    setDraftMessage('');
    setLeadSubmitted(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  }

  const displayBrand = brandName.toLowerCase() === 'tanogaido' ? 'Tanogaido' : brandName;

  return (
    <div className="tg-cs-root">
      {isOpen && (
        <section
          className="tg-cs-popup"
          role="dialog"
          aria-modal="false"
          aria-label="Tanogaido Customer Service Concierge"
        >
          {/* Popup Header */}
          <header className="tg-cs-header">
            <div className="tg-cs-header-brand">
              <div className="tg-cs-logo-frame">
                <img
                  src="/assets/logotano.png"
                  alt="Tanogaido"
                  width={26}
                  height={26}
                  decoding="async"
                />
              </div>
              <div className="tg-cs-header-text">
                <div className="tg-cs-title-row">
                  <span className="tg-cs-title">{displayBrand} Concierge</span>
                </div>
                <p className="tg-cs-subtitle">
                  {leadSubmitted ? (
                    <span className="tabular-nums">
                      Service Desk · {remainingReplies} / {MAX_CS_AI_REPLIES} left
                    </span>
                  ) : (
                    'Japan Service Desk · English'
                  )}
                </p>
              </div>
            </div>

            <div className="tg-cs-header-actions">
              {leadSubmitted && (
                <button
                  type="button"
                  className="tg-cs-icon-btn"
                  onClick={handleResetSession}
                  aria-label="Start new conversation"
                  title="Start new conversation"
                >
                  <RotateCcw size={15} />
                </button>
              )}
              <button
                type="button"
                className="tg-cs-icon-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close concierge chat"
                title="Close"
              >
                <X size={17} />
              </button>
            </div>
          </header>

          {/* Body: Lead Form OR Chat Thread */}
          {!leadSubmitted ? (
            <form className="tg-cs-intake-form" onSubmit={handleLeadSubmit} noValidate>
              <div className="tg-cs-intake-intro">
                <h3>Ask Our Japan Concierge</h3>
                <p>
                  Enter your contact details to start an English consultation about Tanogaido
                  tours, visas, rail passes, or shop items.
                </p>
              </div>

              <div className="tg-cs-field">
                <label htmlFor="tg-cs-name">
                  Full Name <span className="tg-cs-req">*</span>
                </label>
                <input
                  id="tg-cs-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Nadia Putri"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>

              <div className="tg-cs-field">
                <label htmlFor="tg-cs-wa">
                  WhatsApp Number <span className="tg-cs-req">*</span>
                </label>
                <input
                  id="tg-cs-wa"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="e.g. +62 812 3456 7890"
                  value={waInput}
                  onChange={(e) => setWaInput(e.target.value)}
                />
              </div>

              <div className="tg-cs-field">
                <label htmlFor="tg-cs-email">
                  Email Address <span className="tg-cs-req">*</span>
                </label>
                <input
                  id="tg-cs-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="e.g. nadia@company.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              {formError && (
                <p className="tg-cs-error-msg" role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className="tg-cs-primary-btn">
                <span>Start Consultation</span>
                <ArrowRight size={16} />
              </button>

              <p className="tg-cs-intake-note">
                Up to {MAX_CS_AI_REPLIES} instant AI answers, followed by direct WhatsApp handoff
                with your conversation context.
              </p>
            </form>
          ) : (
            <>
              <div className="tg-cs-messages" aria-live="polite">
                <div className="tg-cs-msg is-assistant">
                  <div className="tg-cs-msg-bubble">
                    Hello {lead.name}, welcome to Tanogaido Concierge. How can we assist you with our
                    Japan tour guides, visa assistance, JR Pass transport, or shop items today?
                  </div>
                </div>

                {messages.map((msg, idx) => (
                  <div
                    key={`${msg.role}-${idx}`}
                    className={`tg-cs-msg ${msg.role === 'user' ? 'is-user' : 'is-assistant'}`}
                  >
                    <div className="tg-cs-msg-bubble">{msg.content}</div>
                  </div>
                ))}

                {messages.length === 0 && !sending && !limitReached && (
                  <div className="tg-cs-starters" aria-label="Suggested questions">
                    {STARTER_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className="tg-cs-starter-btn"
                        onClick={() => void sendQuestion(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}

                {sending && (
                  <div className="tg-cs-msg is-assistant">
                    <div className="tg-cs-msg-bubble tg-cs-typing">
                      Checking Tanogaido services...
                    </div>
                  </div>
                )}

                {chatError && (
                  <div className="tg-cs-chat-alert" role="alert">
                    <p>{chatError}</p>
                    <a
                      href={whatsappContextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tg-cs-wa-inline-link"
                    >
                      <span>Open WhatsApp with context</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}

                {limitReached && (
                  <div className="tg-cs-handoff-card">
                    <h4>Continue with a Human Specialist</h4>
                    <p>
                      You have used all {MAX_CS_AI_REPLIES} automated replies. Connect on WhatsApp
                      now—your contact details and inquiry context will be pre-filled automatically.
                    </p>
                    <a
                      href={whatsappContextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tg-cs-wa-cta"
                    >
                      <span>Continue on WhatsApp</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <footer className="tg-cs-footer">
                {!limitReached && (
                  <form className="tg-cs-input-row" onSubmit={handleChatSubmit}>
                    <input
                      type="text"
                      className="tg-cs-chat-input"
                      placeholder="Ask about Tanogaido Japan services..."
                      value={draftMessage}
                      disabled={sending}
                      onChange={(e) => setDraftMessage(e.target.value)}
                      maxLength={500}
                    />
                    <button
                      type="submit"
                      className="tg-cs-send-btn"
                      disabled={sending || !draftMessage.trim()}
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                )}

                <div className="tg-cs-footer-meta">
                  <span>{lead.name}</span>
                  <a
                    href={whatsappContextUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tg-cs-direct-wa"
                  >
                    <span>WhatsApp Concierge</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </footer>
            </>
          )}
        </section>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        className={`tg-cs-launcher ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Minimize customer service chat' : 'Open Tanogaido Customer Service'}
      >
        <span className="tg-cs-launcher-avatar" aria-hidden="true">
          {isOpen ? (
            <X size={20} />
          ) : (
            <img src="/assets/logotano.png" alt="" width={24} height={24} decoding="async" />
          )}
        </span>
        <span className="tg-cs-launcher-label">
          {!isOpen && <MessageSquare size={15} aria-hidden="true" />}
          <span>{isOpen ? 'Close Chat' : 'Tanogaido CS'}</span>
        </span>
      </button>
    </div>
  );
}
