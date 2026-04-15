'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Transaction, TransactionFilters } from '../types';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../storage/transactions';

function applyFilters(transactions: Transaction[], filters: TransactionFilters): Transaction[] {
  return transactions.filter((t) => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.categoryId && t.categoryId !== filters.categoryId) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!t.note.toLowerCase().includes(q)) return false;
    }
    if (filters.dateFrom) {
      if (t.date < filters.dateFrom) return false;
    }
    if (filters.dateTo) {
      if (t.date > filters.dateTo) return false;
    }
    return true;
  });
}

export function useTransactions() {
  const [all, setAll] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({});

  const reload = useCallback(() => {
    setAll(getTransactions());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const filtered = useMemo(
    () => applyFilters(all, filters).sort((a, b) => b.date.localeCompare(a.date)),
    [all, filters],
  );

  const add = useCallback(
    (transaction: Transaction) => {
      addTransaction(transaction);
      reload();
    },
    [reload],
  );

  const update = useCallback(
    (transaction: Transaction) => {
      updateTransaction(transaction);
      reload();
    },
    [reload],
  );

  const remove = useCallback(
    (id: string) => {
      deleteTransaction(id);
      reload();
    },
    [reload],
  );

  return { transactions: filtered, all, filters, setFilters, add, update, remove };
}
