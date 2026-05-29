import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Toronto Charities — a directory of Toronto-area charities',
  description:
    'A community directory of Toronto-area charities and their events. Browse by cause, find local volunteer opportunities, and discover how GTA organizations are working in your community.',
  metadataBase: new URL('https://toronto-charities.ca'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
