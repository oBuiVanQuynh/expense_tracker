'use client';

import type { Period } from '../../lib/types';
import { formatPeriodLabel } from '../../lib/utils/date';

interface PeriodNavigatorProps {
  period: Period;
  onNavigate: (direction: 1 | -1) => void;
  onSetType: (type: Period['type']) => void;
}

const PERIOD_TYPES: { value: Period['type']; label: string }[] = [
  { value: 'day',   label: 'Ngày'  },
  { value: 'week',  label: 'Tuần'  },
  { value: 'month', label: 'Tháng' },
];

export function PeriodNavigator({ period, onNavigate, onSetType }: PeriodNavigatorProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      {/* Segmented control */}
      <div
        className="flex p-1 rounded-xl gap-1 self-start"
        style={{ background: 'var(--color-border)' }}
      >
        {PERIOD_TYPES.map((pt) => {
          const active = period.type === pt.value;
          return (
            <button
              key={pt.value}
              onClick={() => onSetType(pt.value)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                active
                  ? {
                      background: 'white',
                      color: 'var(--color-primary)',
                      boxShadow: 'var(--shadow-sm)',
                    }
                  : { color: 'var(--color-muted)' }
              }
            >
              {pt.label}
            </button>
          );
        })}
      </div>

      {/* Navigation row */}
      <div className="flex items-center gap-2 sm:ml-2">
        <button
          onClick={() => onNavigate(-1)}
          className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white flex items-center justify-center text-[var(--color-muted)] hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          ‹
        </button>
        <span
          className="min-w-44 text-center text-sm font-semibold px-3 py-1.5 rounded-lg capitalize"
          style={{ color: 'var(--color-text)' }}
        >
          {formatPeriodLabel(period)}
        </span>
        <button
          onClick={() => onNavigate(1)}
          className="w-8 h-8 rounded-lg border border-[var(--color-border)] bg-white flex items-center justify-center text-[var(--color-muted)] hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
