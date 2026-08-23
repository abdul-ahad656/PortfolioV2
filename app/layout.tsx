import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
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
      className={`dark ${sans.variable} ${mono.variable} ${display.variable}`}
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
