import { TabBar } from '@/components/dashboard/TabBar';

/* Authenticated dashboard shell — wraps all /dashboard/* routes */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--kg-paper)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <main style={{ flex: 1, paddingBottom: 84 }}>
        {children}
      </main>

      <TabBar />
    </div>
  );
}
