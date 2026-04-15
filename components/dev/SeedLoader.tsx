'use client';

import { useEffect } from 'react';
import { buildSeedTransactions, SEED_CATEGORIES } from '../../lib/dev/seedData';

const TX_KEY  = 'expense_tracker_transactions';
const CAT_KEY = 'expense_tracker_categories';
const FLAG    = 'expense_tracker_seeded_v2';

/**
 * Dev-only component. Mount once in layout.tsx wrapped in process.env check.
 * On first load it writes seed data to localStorage and refreshes the page.
 * Skips if data already seeded (checks FLAG key).
 */
export function SeedLoader() {
  useEffect(() => {
    if (localStorage.getItem(FLAG)) return;          // already seeded

    const transactions = buildSeedTransactions();
    localStorage.setItem(CAT_KEY, JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem(TX_KEY,  JSON.stringify(transactions));
    localStorage.setItem(FLAG, '1');

    console.info(`[seed] ✅ Loaded ${transactions.length} transactions + ${SEED_CATEGORIES.length} categories`);
    window.location.reload();
  }, []);

  return null;
}
