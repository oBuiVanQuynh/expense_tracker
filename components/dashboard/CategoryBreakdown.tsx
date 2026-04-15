'use client';

import type { AggregationResult } from '../../lib/types';
import { formatVND } from '../../lib/utils/currency';

interface CategoryBreakdownProps {
  result: AggregationResult;
}

export function CategoryBreakdown({ result }: CategoryBreakdownProps) {
  if (result.categoryBreakdown.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">
        Không có dữ liệu trong kỳ này.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {result.categoryBreakdown.map((item) => (
        <div key={item.categoryId}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">{item.categoryName}</span>
            <span
              className={item.type === 'income' ? 'text-green-600' : 'text-red-600'}
            >
              {formatVND(item.amount)}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={[
                'h-full rounded-full transition-all',
                item.type === 'income' ? 'bg-green-400' : 'bg-red-400',
              ].join(' ')}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{item.percentage}%</p>
        </div>
      ))}
    </div>
  );
}
