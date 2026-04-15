'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Category } from '../types';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  seedDefaultCategories,
} from '../storage/categories';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const reload = useCallback(() => {
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    seedDefaultCategories();
    reload();
  }, [reload]);

  const add = useCallback(
    (category: Category) => {
      addCategory(category);
      reload();
    },
    [reload],
  );

  const update = useCallback(
    (category: Category) => {
      updateCategory(category);
      reload();
    },
    [reload],
  );

  const remove = useCallback(
    (id: string) => {
      deleteCategory(id);
      reload();
    },
    [reload],
  );

  return { categories, add, update, remove };
}
