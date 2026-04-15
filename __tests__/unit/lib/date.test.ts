import { resolvePeriod, navigatePeriod, formatPeriodLabel, isDateInPeriod } from '../../../lib/utils/date';
import type { Period } from '../../../lib/types';

const DAY: Period = { type: 'day', date: '2026-04-15' };
const WEEK: Period = { type: 'week', date: '2026-04-15' }; // Wednesday → week Mon 13 – Sun 19
const MONTH: Period = { type: 'month', date: '2026-04-15' };

describe('resolvePeriod', () => {
  it('day: start and end are same day', () => {
    const { start, end } = resolvePeriod(DAY);
    expect(start.getDate()).toBe(15);
    expect(end.getDate()).toBe(15);
    expect(start.getMonth()).toBe(3); // April = 3
    expect(end.getMonth()).toBe(3);
  });

  it('week: starts on Monday', () => {
    const { start } = resolvePeriod(WEEK);
    expect(start.getDay()).toBe(1); // Monday
  });

  it('month: starts on 1st', () => {
    const { start } = resolvePeriod(MONTH);
    expect(start.getDate()).toBe(1);
  });

  it('month: ends on 30th for April', () => {
    const { end } = resolvePeriod(MONTH);
    expect(end.getDate()).toBe(30);
  });
});

describe('navigatePeriod', () => {
  it('day: forward by 1', () => {
    const next = navigatePeriod(DAY, 1);
    expect(next.date).toBe('2026-04-16');
  });

  it('day: backward by 1', () => {
    const prev = navigatePeriod(DAY, -1);
    expect(prev.date).toBe('2026-04-14');
  });

  it('month: forward moves to May', () => {
    const next = navigatePeriod(MONTH, 1);
    expect(next.date.startsWith('2026-05')).toBe(true);
  });

  it('preserves period type', () => {
    expect(navigatePeriod(WEEK, 1).type).toBe('week');
  });
});

describe('isDateInPeriod', () => {
  it('returns true for date within month', () => {
    expect(isDateInPeriod('2026-04-01', MONTH)).toBe(true);
    expect(isDateInPeriod('2026-04-30', MONTH)).toBe(true);
  });

  it('returns false for date outside month', () => {
    expect(isDateInPeriod('2026-03-31', MONTH)).toBe(false);
    expect(isDateInPeriod('2026-05-01', MONTH)).toBe(false);
  });

  it('returns true for date within week', () => {
    expect(isDateInPeriod('2026-04-13', WEEK)).toBe(true);
    expect(isDateInPeriod('2026-04-19', WEEK)).toBe(true);
  });
});

describe('formatPeriodLabel', () => {
  it('month label contains month name and year', () => {
    const label = formatPeriodLabel(MONTH);
    expect(label).toMatch(/2026/);
  });

  it('week label contains date range', () => {
    const label = formatPeriodLabel(WEEK);
    expect(label).toContain('–');
  });

  it('day label contains date', () => {
    const label = formatPeriodLabel(DAY);
    expect(label).toMatch(/15/);
  });
});
