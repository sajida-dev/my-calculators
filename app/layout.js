import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import SecondaryNav from './components/SecondaryNav';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Calculators - Your All-in-One Calculator Solution',
  description: 'Access a wide range of calculators for academic, finance, health, and conversion needs. Free, easy-to-use, and accurate calculations.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header />
          <SecondaryNav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
