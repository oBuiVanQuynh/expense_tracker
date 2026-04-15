'use client';

import type { Category, TransactionFilters as Filters } from '../../lib/types';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export interface TransactionFiltersProps {
  filters: Filters;
  categories: Category[];
  onChange: (filters: Filters) => void;
  onExport: () => void;
}

const TYPE_OPTIONS = [
  { value: '', label: 'Tất cả loại' },
  { value: 'expense', label: 'Chi tiêu' },
  { value: 'income', label: 'Thu nhập' },
];

export function TransactionFilters({
  filters,
  categories,
  onChange,
  onExport,
}: TransactionFiltersProps) {
  const categoryOptions = [
    { value: '', label: 'Tất cả danh mục' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  function reset() {
    onChange({});
  }

  const hasFilters =
    !!filters.type ||
    !!filters.categoryId ||
    !!filters.search ||
    !!filters.dateFrom ||
    !!filters.dateTo;

  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col gap-3"
      style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}
    >
      {/* Search + export */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm pointer-events-none">
            🔍
          </span>
          <input
            placeholder="Tìm theo ghi chú..."
            value={filters.search ?? ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value || undefined })}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-gray-400"
          />
        </div>
        <Button variant="secondary" onClick={onExport} size="md">
          ↓ CSV
        </Button>
      </div>

      {/* Filters row */}
      <div className="flex gap-2 flex-wrap items-center">
        <Select
          options={TYPE_OPTIONS}
          value={filters.type ?? ''}
          onChange={(e) =>
            onChange({ ...filters, type: (e.target.value as Filters['type']) || undefined })
          }
          className="flex-1 min-w-28"
        />
        <Select
          options={categoryOptions}
          value={filters.categoryId ?? ''}
          onChange={(e) =>
            onChange({ ...filters, categoryId: e.target.value || undefined })
          }
          className="flex-1 min-w-36"
        />
        <Input
          type="date"
          value={filters.dateFrom ?? ''}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value || undefined })}
          className="flex-1 min-w-32"
          title="Từ ngày"
        />
        <Input
          type="date"
          value={filters.dateTo ?? ''}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value || undefined })}
          className="flex-1 min-w-32"
          title="Đến ngày"
        />
        {hasFilters && (
          <button
            onClick={reset}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors whitespace-nowrap"
          >
            ✕ Xoá lọc
          </button>
        )}
      </div>
    </div>
  );
}
