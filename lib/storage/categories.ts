import type { Category } from '../types';
import { readKey, writeKey } from './index';

const KEY = 'expense_tracker_categories';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-default-unclassified', name: 'Chưa phân loại', type: 'both', isDefault: true, isProtected: true },
  { id: 'cat-default-food', name: 'Ăn uống', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-default-transport', name: 'Đi lại', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-default-shopping', name: 'Mua sắm', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-default-health', name: 'Sức khoẻ', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-default-entertainment', name: 'Giải trí', type: 'expense', isDefault: true, isProtected: false },
  { id: 'cat-default-salary', name: 'Lương', type: 'income', isDefault: true, isProtected: false },
  { id: 'cat-default-other-income', name: 'Thu nhập khác', type: 'income', isDefault: true, isProtected: false },
];

export function getCategories(): Category[] {
  return readKey<Category[]>(KEY, []);
}

export function saveCategories(categories: Category[]): void {
  writeKey(KEY, categories);
}

export function seedDefaultCategories(): void {
  const existing = getCategories();
  if (existing.length === 0) {
    saveCategories(DEFAULT_CATEGORIES);
  }
}

export function addCategory(category: Category): void {
  const all = getCategories();
  saveCategories([...all, category]);
}

export function updateCategory(updated: Category): void {
  const all = getCategories();
  saveCategories(all.map((c) => (c.id === updated.id ? updated : c)));
}

export function deleteCategory(id: string): void {
  const all = getCategories();
  saveCategories(all.filter((c) => c.id !== id));
}
