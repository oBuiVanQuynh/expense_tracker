'use client';

import { formatVND } from '../../lib/utils/currency';
import type { AggregationResult } from '../../lib/types';

interface SummaryCardsProps {
  result: AggregationResult;
}

export function SummaryCards({ result }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs text-gray-500 mb-1">Thu nhập</p>
        <p className="text-lg font-bold text-green-600">{formatVND(result.totalIncome)}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs text-gray-500 mb-1">Chi tiêu</p>
        <p className="text-lg font-bold text-red-600">{formatVND(result.totalExpense)}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs text-gray-500 mb-1">Số dư trong kỳ</p>
        <p
          className={[
            'text-lg font-bold',
            result.balance >= 0 ? 'text-blue-600' : 'text-orange-600',
          ].join(' ')}
        >
          {formatVND(result.balance)}
        </p>
      </div>
    </div>
  );
}
