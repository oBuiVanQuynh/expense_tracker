'use client';

import { formatVND } from '../../lib/utils/currency';
import type { AggregationResult } from '../../lib/types';

interface SummaryCardsProps {
  result: AggregationResult;
}

const CARDS = [
  {
    key: 'income' as const,
    label: 'Thu nhập',
    icon: '↑',
    iconBg: 'linear-gradient(135deg,#16a34a,#15803d)',
    valueColor: 'var(--color-income)',
  },
  {
    key: 'expense' as const,
    label: 'Chi tiêu',
    icon: '↓',
    iconBg: 'linear-gradient(135deg,#dc2626,#b91c1c)',
    valueColor: 'var(--color-expense)',
  },
  {
    key: 'balance' as const,
    label: 'Số dư trong kỳ',
    icon: '≈',
    iconBg: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
    valueColor: null, // dynamic
  },
];

export function SummaryCards({ result }: SummaryCardsProps) {
  const values = {
    income:  result.totalIncome,
    expense: result.totalExpense,
    balance: result.balance,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CARDS.map((card) => {
        const value = values[card.key];
        const color =
          card.valueColor ??
          (value >= 0 ? 'var(--color-primary)' : 'var(--color-expense)');

        return (
          <div
            key={card.key}
            className="bg-white rounded-2xl p-5 flex items-start gap-4"
            style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}
          >
            <span
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-base font-bold"
              style={{ background: card.iconBg }}
            >
              {card.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] mb-1">
                {card.label}
              </p>
              <p className="text-xl font-bold truncate" style={{ color }}>
                {formatVND(value)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
