import type { Metadata } from 'next';
import { Playfair_Display, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EkoTrace — Community-Verified Cultural Tourism Platform for Lagos',
  description:
    'Discover Lagos festivals, places, traditions, food, crafts and stories with information you can trace back to oral custodians, institutional archives, and community evidence.',
  keywords: [
    'Lagos culture',
    'Eyo Festival',
    'Nike Art Gallery',
    'Popo Aguda',
    'Fanti Carnival',
    'Gelede Mask Tradition',
    'Makoko Waterfront',
    'Cultural archive',
    'Community verification',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F5] text-[#161615] font-sans selection:bg-[#B4441F] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
