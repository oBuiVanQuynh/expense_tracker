'use client';

import { usePeriod } from '../../lib/hooks/usePeriod';
import { useTransactions } from '../../lib/hooks/useTransactions';
import { useCategories } from '../../lib/hooks/useCategories';
import { aggregateByPeriod } from '../../lib/utils/aggregation';
import { SummaryCards } from '../../components/dashboard/SummaryCards';
import { PeriodNavigator } from '../../components/dashboard/PeriodNavigator';
import { CategoryBreakdown } from '../../components/dashboard/CategoryBreakdown';

export default function DashboardPage() {
  const { period, navigate, setPeriodType } = usePeriod();
  const { all: transactions } = useTransactions();
  const { categories } = useCategories();

  const result = aggregateByPeriod(transactions, categories, period);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Tổng quan</h1>
        <p className="text-sm text-[var(--color-muted)] mt-0.5">Theo dõi thu chi của bạn</p>
      </div>

      <PeriodNavigator period={period} onNavigate={navigate} onSetType={setPeriodType} />

      <SummaryCards result={result} />

      <div
        className="bg-white rounded-2xl p-5"
        style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}
      >
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)] mb-5">
          Theo danh mục
        </h2>
        <CategoryBreakdown result={result} />
      </div>
    </div>
  );
}
