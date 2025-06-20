import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RecommendationSidebar from './components/RecommendationSidebar';
import NavOrHeroSection from './components/NavOrHeroSection';

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
          <NavOrHeroSection />
          <div className="flex-1 w-full">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 ">
              <main className="col-span-1 lg:col-span-2 w-full">
                {children}
              </main>
              <aside className="col-span-1 w-full lg:sticky lg:top-28 xl:top-32 self-start">
                <RecommendationSidebar />
              </aside>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
