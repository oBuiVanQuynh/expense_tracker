import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-6">
            <span className="font-semibold text-lg">💰 Chi Tiêu</span>
            <a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              Tổng quan
            </a>
            <a href="/transactions" className="text-sm text-gray-600 hover:text-gray-900">
              Giao dịch
            </a>
            <a href="/categories" className="text-sm text-gray-600 hover:text-gray-900">
              Danh mục
            </a>
          </nav>
        </header>
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
