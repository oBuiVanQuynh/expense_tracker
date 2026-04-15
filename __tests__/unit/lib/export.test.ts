import { exportToCSV } from '../../../lib/utils/export';
import type { Transaction } from '../../../lib/types';

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 50_000,
    categoryId: 'cat-food',
    date: '2026-04-15',
    note: 'Cơm trưa',
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
    amount: 200_000,
    categoryId: 'cat-other',
    date: '2026-04-10',
    note: 'Has "quotes", and comma',
    createdAt: '',
    updatedAt: '',
  },
];

const categoryNameMap = new Map([
  ['cat-food', 'Ăn uống'],
  ['cat-salary', 'Lương'],
]);

describe('exportToCSV', () => {
  it('starts with UTF-8 BOM', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });

  it('first line after BOM is the header', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    const firstLine = csv.slice(1).split('\r\n')[0];
    expect(firstLine).toBe('Ngày,Loại,Danh mục,Số tiền,Ghi chú');
  });

  it('uses CRLF line endings', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    expect(csv).toContain('\r\n');
  });

  it('includes correct data rows', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    expect(csv).toContain('2026-04-15,Chi,Ăn uống,50000,Cơm trưa');
    expect(csv).toContain('2026-04-01,Thu,Lương,1000000,');
  });

  it('falls back to "Không rõ" for unknown category', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    expect(csv).toContain('Không rõ');
  });

  it('RFC 4180: wraps cells with commas and quotes in double-quotes', () => {
    const csv = exportToCSV(transactions, categoryNameMap);
    expect(csv).toContain('"Has ""quotes"", and comma"');
  });

  it('returns only header for empty list', () => {
    const csv = exportToCSV([], categoryNameMap);
    const lines = csv.slice(1).split('\r\n');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toBe('Ngày,Loại,Danh mục,Số tiền,Ghi chú');
  });
});
