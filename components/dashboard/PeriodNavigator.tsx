'use client';

import type { Period } from '../../lib/types';
import { formatPeriodLabel } from '../../lib/utils/date';
import { Button } from '../ui/Button';

interface PeriodNavigatorProps {
  period: Period;
  onNavigate: (direction: 1 | -1) => void;
  onSetType: (type: Period['type']) => void;
}

const PERIOD_TYPES: { value: Period['type']; label: string }[] = [
  { value: 'day', label: 'Ngày' },
  { value: 'week', label: 'Tuần' },
  { value: 'month', label: 'Tháng' },
];

export function PeriodNavigator({ period, onNavigate, onSetType }: PeriodNavigatorProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Type selector */}
      <div className="flex rounded-md overflow-hidden border border-gray-200 self-start">
        {PERIOD_TYPES.map((pt) => (
          <button
            key={pt.value}
            onClick={() => onSetType(pt.value)}
            className={[
              'px-4 py-1.5 text-sm font-medium transition-colors',
              period.type === pt.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50',
            ].join(' ')}
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => onNavigate(-1)}>
          ←
        </Button>
        <span className="text-sm font-medium text-gray-700 min-w-40 text-center capitalize">
          {formatPeriodLabel(period)}
        </span>
        <Button variant="secondary" size="sm" onClick={() => onNavigate(1)}>
          →
        </Button>
      </div>
    </div>
  );
}
