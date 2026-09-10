import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommerceProvider from '@/components/CommerceProvider';

export const metadata = {
  title: { default: 'Sheh — The First Touch of Nature', template: '%s — Sheh' },
  description: 'Premium skincare and wellness shaped by light, water, botanicals and quiet ritual.',
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CommerceProvider>
          <Header />
          {children}
          <Footer />
        </CommerceProvider>
      </body>
    </html>
  );
}
