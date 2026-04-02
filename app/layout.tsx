import type { Metadata } from 'next';
import './globals.css';
import { VibeProvider } from '@/context/VibeContext';

export const metadata: Metadata = {
  title: 'GameTime Sports Bar & Grill',
  description: 'Your game. Our passion. The best sports bar experience in town.',
  openGraph: {
    title: 'GameTime Sports Bar & Grill',
    description: 'Your game. Our passion.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full antialiased">
        <VibeProvider>{children}</VibeProvider>
      </body>
    </html>
  );
}
