import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abdul Ahad — AI Engineer & Full Stack Developer',
  description:
    'Architecting production-grade RAG pipelines, LLM agents, and scalable cloud-native backend systems.',
  authors: [{ name: 'Abdul Ahad' }],
  openGraph: {
    title: 'Abdul Ahad — AI Engineer & Full Stack Developer',
    description:
      'Architecting production-grade RAG pipelines, LLM agents, and scalable cloud-native backend systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Ahad — AI Engineer & Full Stack Developer',
    description:
      'Architecting production-grade RAG pipelines, LLM agents, and scalable cloud-native backend systems.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
