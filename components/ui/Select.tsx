'use client';

import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const fieldBase =
  'w-full h-10 rounded-lg border px-3 text-sm bg-white transition-colors ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ' +
  'disabled:bg-[var(--color-bg)] disabled:cursor-not-allowed';

export function Select({ label, error, id, options, className = '', ...props }: SelectProps) {
  const selectId = id ?? label;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={[
          fieldBase,
          error ? 'border-red-400 focus:ring-red-400' : 'border-[var(--color-border)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
