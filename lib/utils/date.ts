import {
  parseISO,
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  isWithinInterval,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Period, PeriodType } from '../types';

/**
 * Get the inclusive start/end Date range for a given Period.
 * Weeks start on Monday (ISO standard).
 */
export function resolvePeriod(period: Period): { start: Date; end: Date } {
  const ref = parseISO(period.date);
  const weekOptions = { weekStartsOn: 1 as const };

  switch (period.type) {
    case 'day':
      return { start: startOfDay(ref), end: endOfDay(ref) };
    case 'week':
      return { start: startOfWeek(ref, weekOptions), end: endOfWeek(ref, weekOptions) };
    case 'month':
      return { start: startOfMonth(ref), end: endOfMonth(ref) };
  }
}

/**
 * Move a period forward (+1) or backward (-1) by one unit.
 */
export function navigatePeriod(period: Period, direction: 1 | -1): Period {
  const ref = parseISO(period.date);
  let next: Date;
  switch (period.type) {
    case 'day':
      next = addDays(ref, direction);
      break;
    case 'week':
      next = addWeeks(ref, direction);
      break;
    case 'month':
      next = addMonths(ref, direction);
      break;
  }
  return { type: period.type, date: format(next, 'yyyy-MM-dd') };
}

/**
 * Human-readable label for a period, in Vietnamese.
 * e.g. "Thứ Hai, 15 tháng 4, 2026" / "Tuần 14/04 – 20/04" / "Tháng 4, 2026"
 */
export function formatPeriodLabel(period: Period): string {
  const { start, end } = resolvePeriod(period);
  switch (period.type) {
    case 'day':
      return format(start, "EEEE, d MMMM, yyyy", { locale: vi });
    case 'week':
      return `Tuần ${format(start, 'dd/MM')} – ${format(end, 'dd/MM')}`;
    case 'month':
      return format(start, "MMMM, yyyy", { locale: vi });
  }
}

/**
 * Check if a 'YYYY-MM-DD' date string falls within a Period.
 */
export function isDateInPeriod(dateStr: string, period: Period): boolean {
  const date = parseISO(dateStr);
  const { start, end } = resolvePeriod(period);
  return isWithinInterval(date, { start, end });
}

/** Return today as a 'YYYY-MM-DD' string. */
export function todayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/** Returns a Period representing the current month. */
export function currentMonthPeriod(): Period {
  return { type: 'month', date: todayString() };
}
