'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
}

const base =
  'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ' +
  'disabled:opacity-50 disabled:pointer-events-none select-none';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'text-white shadow-sm hover:opacity-90 active:scale-[.98] ' +
    '[background:linear-gradient(135deg,#4f46e5,#7c3aed)] ' +
    'focus-visible:ring-indigo-400',
  secondary:
    'bg-white border border-[var(--color-border)] text-[var(--color-text)] ' +
    'hover:bg-[var(--color-bg)] active:scale-[.98] shadow-sm focus-visible:ring-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:scale-[.98] shadow-sm focus-visible:ring-red-400',
  ghost:
    'bg-transparent text-[var(--color-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] focus-visible:ring-gray-400',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
