'use client';

import type { AggregationResult } from '../../lib/types';
import { formatVND } from '../../lib/utils/currency';

interface CategoryBreakdownProps {
  result: AggregationResult;
}

export function CategoryBreakdown({ result }: CategoryBreakdownProps) {
  if (result.categoryBreakdown.length === 0) {
    return (
      <div className="flex flex-col items-center py-10 gap-2">
        <span className="text-3xl">📊</span>
        <p className="text-sm text-[var(--color-muted)]">Không có dữ liệu trong kỳ này.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {result.categoryBreakdown.map((item) => {
        const isIncome = item.type === 'income';
        const barColor = isIncome ? '#16a34a' : '#ef4444';
        const textColor = isIncome ? 'var(--color-income)' : 'var(--color-expense)';

        return (
          <div key={item.categoryId}>
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: barColor }}
                />
                <span className="text-sm font-medium text-[var(--color-text)] truncate">
                  {item.categoryName}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                  style={{ background: isIncome ? '#dcfce7' : '#fee2e2', color: textColor }}
                >
                  {item.percentage}%
                </span>
                <span className="text-sm font-bold" style={{ color: textColor }}>
                  {formatVND(item.amount)}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-[var(--color-bg)]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%`, background: barColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
