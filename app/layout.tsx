import type { Metadata } from 'next';
import './globals.css';
import { SeedLoader } from '../components/dev/SeedLoader';
import { NavBar } from '../components/NavBar';

const isDev = process.env.NODE_ENV !== 'production';

export const metadata: Metadata = {
  title: 'Theo Dõi Chi Tiêu',
  description: 'Ứng dụng theo dõi thu chi cá nhân',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-7">
          {children}
        </main>
        {isDev && <SeedLoader />}
      </body>
    </html>
  );
}

