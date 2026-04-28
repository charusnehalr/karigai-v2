import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
});

const geist = Geist({
  variable: '--font-body-next',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono-next',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'karigai — wellness, attuned',
  description:
    'Cycle, fitness, nutrition and habits — gently personalized, never diagnostic.',
  keywords: ['wellness', 'cycle tracking', 'nutrition', 'fitness', 'women health'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
