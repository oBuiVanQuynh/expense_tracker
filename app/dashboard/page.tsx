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
      <h1 className="text-xl font-semibold text-gray-900">Tổng quan</h1>

      <PeriodNavigator period={period} onNavigate={navigate} onSetType={setPeriodType} />

      <SummaryCards result={result} />

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Theo danh mục</h2>
        <CategoryBreakdown result={result} />
      </div>
    </div>
  );
}
