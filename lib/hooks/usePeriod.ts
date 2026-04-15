'use client';

import { useState, useCallback } from 'react';
import type { Period } from '../types';
import { navigatePeriod, currentMonthPeriod } from '../utils/date';

export function usePeriod(initial?: Period) {
  const [period, setPeriod] = useState<Period>(initial ?? currentMonthPeriod());

  const navigate = useCallback(
    (direction: 1 | -1) => setPeriod((p) => navigatePeriod(p, direction)),
    [],
  );

  const setPeriodType = useCallback((type: Period['type']) => {
    setPeriod((p) => ({ ...p, type }));
  }, []);

  return { period, navigate, setPeriodType };
}
