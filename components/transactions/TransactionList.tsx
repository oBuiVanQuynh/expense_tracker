'use client';

import type { Transaction, Category } from '../../lib/types';
import { formatVND } from '../../lib/utils/currency';
import { Button } from '../ui/Button';

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
      <p className="text-center text-gray-400 py-12 text-sm">Chưa có giao dịch nào.</p>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={[
                'text-lg leading-none',
                t.type === 'income' ? 'text-green-500' : 'text-red-500',
              ].join(' ')}
            >
              {t.type === 'income' ? '↑' : '↓'}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {categoryMap.get(t.categoryId) ?? 'Không rõ'}
              </p>
              {t.note && (
                <p className="text-xs text-gray-400 truncate">{t.note}</p>
              )}
              <p className="text-xs text-gray-400">{t.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={[
                'text-sm font-semibold',
                t.type === 'income' ? 'text-green-600' : 'text-red-600',
              ].join(' ')}
            >
              {t.type === 'income' ? '+' : '-'}
              {formatVND(t.amount)}
            </span>
            <Button variant="ghost" size="sm" onClick={() => onEdit(t)}>
              Sửa
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(t.id)}
            >
              Xoá
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
