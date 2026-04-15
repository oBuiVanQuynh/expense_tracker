'use client';

import type { Transaction, Category } from '../../lib/types';
import { formatVND } from '../../lib/utils/currency';

export interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  categories,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-2">
        <span className="text-4xl">🧾</span>
        <p className="text-sm text-[var(--color-muted)]">Chưa có giao dịch nào.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-border)]">
      {transactions.map((t) => {
        const isIncome = t.type === 'income';
        const amountColor = isIncome ? 'var(--color-income)' : 'var(--color-expense)';
        const iconBg = isIncome ? '#dcfce7' : '#fee2e2';
        const iconColor = isIncome ? '#16a34a' : '#dc2626';

        return (
          <li
            key={t.id}
            className="flex items-center justify-between py-3.5 gap-3 group hover:bg-[var(--color-bg)] -mx-4 px-4 rounded-xl transition-colors"
          >
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm"
                style={{ background: iconBg, color: iconColor }}
              >
                {isIncome ? '↑' : '↓'}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">
                  {categoryMap.get(t.categoryId) ?? 'Không rõ'}
                </p>
                {t.note && (
                  <p className="text-xs text-[var(--color-muted)] truncate">{t.note}</p>
                )}
                <p className="text-xs text-[var(--color-muted)]">{t.date}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-bold" style={{ color: amountColor }}>
                {isIncome ? '+' : '-'}{formatVND(t.amount)}
              </span>
              {/* Action buttons — show on hover */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(t)}
                  className="text-xs px-2 py-1 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-xs px-2 py-1 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:text-red-600 hover:border-red-300 transition-colors"
                >
                  Xoá
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
