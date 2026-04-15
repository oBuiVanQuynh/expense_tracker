'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/dashboard',    label: 'Tổng quan' },
  { href: '/transactions', label: 'Giao dịch' },
  { href: '/categories',   label: 'Danh mục'  },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--color-border)',
      }}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-1">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 mr-4 font-bold text-base no-underline"
          style={{ color: 'var(--color-primary)' }}
        >
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
          >
            ₫
          </span>
          <span className="hidden sm:block">Chi Tiêu</span>
        </Link>

        {/* Links */}
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all no-underline"
              style={
                active
                  ? { background: 'var(--color-primary-light)', color: 'var(--color-primary)' }
                  : { color: 'var(--color-muted)' }
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
