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
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3">
      {/* Search + export row */}
      <div className="flex gap-2">
        <Input
          placeholder="Tìm theo ghi chú..."
          value={filters.search ?? ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value || undefined })}
          className="flex-1"
        />
        <Button variant="secondary" onClick={onExport}>
          ↓ Xuất CSV
        </Button>
      </div>

      {/* Filter row */}
      <div className="flex gap-2 flex-wrap">
        <Select
          options={TYPE_OPTIONS}
          value={filters.type ?? ''}
          onChange={(e) =>
            onChange({ ...filters, type: (e.target.value as Filters['type']) || undefined })
          }
          className="flex-1 min-w-32"
        />
        <Select
          options={categoryOptions}
          value={filters.categoryId ?? ''}
          onChange={(e) =>
            onChange({ ...filters, categoryId: e.target.value || undefined })
          }
          className="flex-1 min-w-40"
        />
        <Input
          type="date"
          value={filters.dateFrom ?? ''}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value || undefined })}
          className="flex-1 min-w-36"
          title="Từ ngày"
        />
        <Input
          type="date"
          value={filters.dateTo ?? ''}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value || undefined })}
          className="flex-1 min-w-36"
          title="Đến ngày"
        />
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Xoá bộ lọc
          </Button>
        )}
      </div>
    </div>
  );
}
