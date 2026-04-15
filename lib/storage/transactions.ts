import type { Transaction } from '../types';
import { readKey, writeKey } from './index';

const KEY = 'expense_tracker_transactions';

export function getTransactions(): Transaction[] {
  return readKey<Transaction[]>(KEY, []);
}

export function saveTransactions(transactions: Transaction[]): void {
  writeKey(KEY, transactions);
}

export function addTransaction(transaction: Transaction): void {
  const all = getTransactions();
  saveTransactions([...all, transaction]);
}

export function updateTransaction(updated: Transaction): void {
  const all = getTransactions();
  saveTransactions(all.map((t) => (t.id === updated.id ? updated : t)));
}

export function deleteTransaction(id: string): void {
  const all = getTransactions();
  saveTransactions(all.filter((t) => t.id !== id));
}

export function getTransactionById(id: string): Transaction | undefined {
  return getTransactions().find((t) => t.id === id);
}
