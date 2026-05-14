import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'PhD Outreach Architect',
  description: 'An AI assistant that analyzes FindAPhD projects and aligns them with a specific background to generate tailored outreach emails.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
