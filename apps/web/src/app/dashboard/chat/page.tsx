'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Chip, SafetyBanner, Eyebrow, Icon } from '@karigai/ui';
import Link from 'next/link';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  structured?: {
    summary: string;
    contributors: { factor: string; evidence: string }[];
    actions: string[];
    safetyMessage?: string;
  };
};

const QUICK_PROMPTS = [
  'Why this workout?',
  'Best foods for luteal phase?',
  'Why am I so tired?',
  'Should I train today?',
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content: '',
    structured: {
      summary: 'Lower energy in luteal phase is completely normal and expected — your progesterone peaks here.',
      contributors: [
        { factor: 'Progesterone surge', evidence: 'Day 24 of 28-day cycle — luteal peak' },
        { factor: 'Sleep quality dip', evidence: 'Common in late luteal due to temperature shift' },
        { factor: 'Iron status', evidence: 'Iron deficiency logged — can compound fatigue' },
      ],
      actions: ['Prioritise protein at breakfast', '25-min walk over HIIT today', 'Iron-rich lunch suggested'],
      safetyMessage: undefined,
    },
  },
];

/* S_AIChat — context-aware AI insights chat */
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Stub response — wire up to POST /chat/message in Phase 8
    await new Promise(r => setTimeout(r, 1200));
    const stubReply: Message = {
      role: 'assistant',
      content: '',
      structured: {
        summary: `Based on your current luteal phase and logged data, here's what's relevant to "${text}".`,
        contributors: [
          { factor: 'Cycle phase context', evidence: 'Luteal day 24 — energy naturally lower' },
          { factor: 'Recent nutrition', evidence: 'Adequate protein today — good foundation' },
        ],
        actions: ['Stay hydrated', 'Gentle movement preferred'],
      },
    };
    setMessages(prev => [...prev, stubReply]);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        paddingBottom: 84,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: '1px solid var(--kg-hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--kg-paper)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/dashboard" style={{ color: 'var(--kg-ink)', display: 'flex' }}>
            <Icon name="back" size={22} />
          </Link>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--kg-ink)' }}>
              karigai · insights
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-sage)', letterSpacing: '0.12em' }}>
              ● RULE-CHECKED
            </div>
          </div>
        </div>
        <Icon name="history" size={20} color="var(--kg-muted)" />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            {msg.role === 'user' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    background: 'var(--kg-ink)',
                    color: 'var(--kg-cream)',
                    padding: '12px 16px',
                    borderRadius: '20px 20px 6px 20px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    lineHeight: 1.5,
                    maxWidth: '80%',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ) : msg.structured ? (
              <AIResponseCard structured={msg.structured} />
            ) : null}
          </div>
        ))}

        {loading && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 14,
              background: 'var(--kg-cream)',
              border: '1px solid var(--kg-bone)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--kg-muted)',
            }}
          >
            Thinking…
          </div>
        )}

        {/* Quick prompts */}
        {!loading && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 99,
                  border: '1px solid var(--kg-hairline)',
                  background: 'var(--kg-card)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--kg-ink2)',
                  cursor: 'pointer',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div
        style={{
          position: 'fixed',
          bottom: 84,
          left: 0,
          right: 0,
          padding: '10px 16px',
          background: 'rgba(250,246,239,0.9)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--kg-hairline)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--kg-card)',
            border: '1px solid var(--kg-hairline)',
            borderRadius: 22,
            padding: '8px 8px 8px 14px',
          }}
        >
          <Icon name="plus" size={18} color="var(--kg-muted)" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask about your patterns…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--kg-ink)',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: input.trim() ? 'var(--kg-ink)' : 'var(--kg-hairline)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
            }}
          >
            <Icon name="arrow" size={16} color={input.trim() ? 'var(--kg-cream)' : 'var(--kg-muted)'} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AIResponseCard({
  structured,
}: {
  structured: NonNullable<Message['structured']>;
}) {
  return (
    <div
      style={{
        background: 'var(--kg-cream)',
        border: '1px solid var(--kg-bone)',
        borderRadius: 16,
        padding: '16px',
      }}
    >
      <Eyebrow style={{ marginBottom: 8 }}>
        Response · Structured · {structured.contributors.length} sources
      </Eyebrow>

      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 19,
          fontStyle: 'italic',
          color: 'var(--kg-ink)',
          lineHeight: 1.35,
          margin: '0 0 14px',
        }}
      >
        {structured.summary}
      </p>

      {/* Sources */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {structured.contributors.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--kg-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--kg-cream)',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--kg-ink)', marginBottom: 2 }}>
                {c.factor}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--kg-muted)' }}>
                {c.evidence}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested actions */}
      <div
        style={{
          background: 'var(--kg-bone)',
          borderRadius: 10,
          padding: '10px 12px',
          marginBottom: structured.safetyMessage ? 12 : 0,
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)', letterSpacing: '0.12em', marginBottom: 8 }}>
          SUGGESTED TODAY
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {structured.actions.map((a, i) => (
            <Chip key={i} tone={i === 0 ? 'sage' : i === 1 ? 'clay' : 'neutral'}>{a}</Chip>
          ))}
        </div>
      </div>

      {structured.safetyMessage && (
        <SafetyBanner
          tone="warn"
          title="Clinical note"
          body={structured.safetyMessage}
          style={{ marginTop: 12 }}
        />
      )}
    </div>
  );
}
