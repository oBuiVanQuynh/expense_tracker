import { aggregateByPeriod } from '../../../lib/utils/aggregation';
import type { Transaction, Category, Period } from '../../../lib/types';

const MONTH: Period = { type: 'month', date: '2026-04-15' };

const categories: Category[] = [
  { id: 'cat-food', name: 'Ăn uống', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-salary', name: 'Lương', type: 'income', isDefault: true, isProtected: false },
];

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 200_000,
    categoryId: 'cat-food',
    date: '2026-04-10',
    note: '',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    type: 'income',
    amount: 1_000_000,
    categoryId: 'cat-salary',
    date: '2026-04-01',
    note: '',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '3',
    type: 'expense',
    amount: 50_000,
    categoryId: 'cat-food',
    date: '2026-03-31', // outside April
    note: '',
    createdAt: '',
    updatedAt: '',
  },
];

describe('aggregateByPeriod', () => {
  const result = aggregateByPeriod(transactions, categories, MONTH);

  it('sums income within period', () => {
    expect(result.totalIncome).toBe(1_000_000);
  });

  it('sums expense within period', () => {
    expect(result.totalExpense).toBe(200_000);
  });

  it('calculates balance as income - expense', () => {
    expect(result.balance).toBe(800_000);
  });

  it('excludes transactions outside the period', () => {
    // Only 2 transactions in April (ids 1 & 2)
    expect(result.categoryBreakdown.length).toBe(2);
  });

  it('sorts category breakdown by amount descending', () => {
    const amounts = result.categoryBreakdown.map((c) => c.amount);
    expect(amounts[0]).toBeGreaterThanOrEqual(amounts[1]);
  });

  it('returns 0 totals for empty period', () => {
    const empty = aggregateByPeriod([], categories, MONTH);
    expect(empty.totalIncome).toBe(0);
    expect(empty.totalExpense).toBe(0);
    expect(empty.balance).toBe(0);
    expect(empty.categoryBreakdown).toHaveLength(0);
  });
});
