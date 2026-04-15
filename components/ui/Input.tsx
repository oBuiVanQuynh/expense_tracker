'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const fieldBase =
  'w-full h-10 rounded-lg border px-3 text-sm bg-white transition-colors ' +
  'placeholder:text-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ' +
  'disabled:bg-[var(--color-bg)] disabled:cursor-not-allowed';

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={[
          fieldBase,
          error ? 'border-red-400 focus:ring-red-400' : 'border-[var(--color-border)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
