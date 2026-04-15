import type { Transaction, Category, Period, AggregationResult, CategoryBreakdownItem } from '../types';
import { isDateInPeriod } from './date';

/**
 * Aggregate transactions for a given period.
 * Returns totals + category breakdown sorted by amount descending.
 */
export function aggregateByPeriod(
  transactions: Transaction[],
  categories: Category[],
  period: Period,
): AggregationResult {
  const inPeriod = transactions.filter((t) => isDateInPeriod(t.date, period));

  let totalIncome = 0;
  let totalExpense = 0;

  const categoryMap = new Map<string, Category>(categories.map((c) => [c.id, c]));
  const categoryAmounts = new Map<string, number>();

  for (const t of inPeriod) {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }
    categoryAmounts.set(t.categoryId, (categoryAmounts.get(t.categoryId) ?? 0) + t.amount);
  }

  const totalAll = totalIncome + totalExpense;

  const categoryBreakdown: CategoryBreakdownItem[] = [];
  for (const [categoryId, amount] of categoryAmounts.entries()) {
    const cat = categoryMap.get(categoryId);
    const txn = inPeriod.find((t) => t.categoryId === categoryId);
    categoryBreakdown.push({
      categoryId,
      categoryName: cat?.name ?? 'Không rõ',
      type: txn?.type ?? 'expense',
      amount,
      percentage: totalAll > 0 ? Math.round((amount / totalAll) * 100) : 0,
    });
  }

  categoryBreakdown.sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryBreakdown,
  };
}
