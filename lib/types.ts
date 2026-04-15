// T009: Shared TypeScript interfaces

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  /** Integer VND, max 10_000_000_000 */
  amount: number;
  categoryId: string;
  /** 'YYYY-MM-DD' */
  date: string;
  note: string;
  /** ISO timestamp */
  createdAt: string;
  /** ISO timestamp */
  updatedAt: string;
}

export type CategoryType = 'income' | 'expense' | 'both';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  isDefault: boolean;
  /** True for cat-default-unclassified; cannot be deleted or renamed */
  isProtected: boolean;
}

export type PeriodType = 'day' | 'week' | 'month';

export interface Period {
  type: PeriodType;
  /** Reference date as 'YYYY-MM-DD' */
  date: string;
}

export interface AggregationResult {
  totalIncome: number;
  totalExpense: number;
  /** totalIncome - totalExpense within the period */
  balance: number;
  categoryBreakdown: CategoryBreakdownItem[];
}

export interface CategoryBreakdownItem {
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  amount: number;
  percentage: number;
}

export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
