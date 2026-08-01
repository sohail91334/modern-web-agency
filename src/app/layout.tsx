import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  title: 'Modern Web Agency — Websites, Webshops & SEO',
  description:
    'Modern Web Agency builds fully custom websites, WordPress & Elementor sites, WooCommerce webshops and provides expert SEO services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
