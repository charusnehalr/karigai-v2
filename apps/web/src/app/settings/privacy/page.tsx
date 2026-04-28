'use client';

import { useState } from 'react';
import { Card, Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

type RowValue = 'ON' | 'OFF' | 'LINKED' | null;

function PrivacyRow({
  icon,
  label,
  value,
  destructive,
  onClick,
}: {
  icon: Parameters<typeof Icon>[0]['name'];
  label: string;
  value?: RowValue;
  destructive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        background: 'transparent',
        border: 'none',
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: 'var(--kg-shell)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={16} color={destructive ? 'var(--kg-alert)' : 'var(--kg-ink2)'} />
      </div>
      <span
        style={{
          flex: 1,
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: destructive ? 'var(--kg-alert)' : 'var(--kg-ink)',
        }}
      >
        {label}
      </span>
      {value && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: value === 'ON' || value === 'LINKED'
              ? 'var(--kg-sage)'
              : 'var(--kg-muted)',
            letterSpacing: '0.1em',
          }}
        >
          {value}
        </span>
      )}
    </button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--kg-hairline)' }} />;
}

/* S_Privacy — data controls */
export default function PrivacyPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--kg-paper)',
        padding: '48px 20px 48px',
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      <Eyebrow style={{ marginBottom: 8 }}>settings</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          fontStyle: 'italic',
          color: 'var(--kg-ink)',
          margin: '0 0 8px',
          letterSpacing: '-0.01em',
        }}
      >
        Privacy & data
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--kg-muted)',
          lineHeight: 1.5,
          margin: '0 0 28px',
        }}
      >
        Your data is yours. Export it, delete it, control what we see — anytime.
      </p>

      {/* Your data */}
      <Card style={{ padding: '4px 16px', marginBottom: 12 }}>
        <Eyebrow style={{ paddingTop: 12, paddingBottom: 8 }}>Your data</Eyebrow>
        <PrivacyRow icon="lock" label="Encrypted health log" value="ON" />
        <Divider />
        <PrivacyRow icon="device" label="HealthKit" value="LINKED" onClick={() => {}} />
        <Divider />
        <PrivacyRow icon="device" label="Health Connect" value="OFF" onClick={() => {}} />
        <Divider />
        <PrivacyRow icon="download" label="Export all my data" onClick={() => {}} />
        <Divider />
        <PrivacyRow icon="history" label="Consent history" onClick={() => {}} />
      </Card>

      {/* What we use AI for */}
      <Card style={{ padding: '4px 16px', marginBottom: 12 }}>
        <Eyebrow style={{ paddingTop: 12, paddingBottom: 8 }}>What we use AI for</Eyebrow>
        <PrivacyRow icon="spark" label="Personalized insights" value="ON" />
        <Divider />
        <PrivacyRow icon="chart" label="Anonymous research contribution" value="OFF" onClick={() => {}} />
        <Divider />
        <PrivacyRow icon="shield" label="Red-flag detection (always on)" value="ON" />
      </Card>

      {/* Account */}
      <Card style={{ padding: '4px 16px', marginBottom: 24 }}>
        <Eyebrow style={{ paddingTop: 12, paddingBottom: 8 }}>Account</Eyebrow>
        <PrivacyRow
          icon="trash"
          label="Delete account"
          destructive
          onClick={() => setShowDeleteConfirm(true)}
        />
      </Card>

      {showDeleteConfirm && (
        <SafetyBanner
          tone="alert"
          title="This is irreversible"
          body="Deleting your account removes all your data within 30 days. AI-generated content is purged immediately. This cannot be undone."
          style={{ marginBottom: 16 }}
        />
      )}
      {showDeleteConfirm && (
        <button
          style={{
            width: '100%',
            height: 48,
            borderRadius: 14,
            background: 'var(--kg-alert)',
            color: 'white',
            border: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: 24,
          }}
        >
          Confirm account deletion
        </button>
      )}

      {/* Footer */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--kg-muted)',
          letterSpacing: '0.1em',
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        KARIGAI IS NOT A MEDICAL DEVICE. WE PROVIDE WELLNESS, FITNESS & LIFESTYLE SUPPORT.
      </p>
    </div>
  );
}
