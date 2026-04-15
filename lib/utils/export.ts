import type { Transaction } from '../types';
import { formatVND } from './currency';

/** UTF-8 BOM for Excel compatibility */
const BOM = '\uFEFF';

const HEADERS = ['Ngày', 'Loại', 'Danh mục', 'Số tiền', 'Ghi chú'];

function escapeCell(value: string): string {
  // RFC 4180: wrap in double-quotes if contains comma, double-quote, or newline
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Export transactions to a UTF-8 BOM CSV string with CRLF line endings.
 * Category names must be resolved before calling (pass as categoryNameMap).
 */
export function exportToCSV(
  transactions: Transaction[],
  categoryNameMap: Map<string, string>,
): string {
  const lines: string[] = [HEADERS.map(escapeCell).join(',')];

  for (const t of transactions) {
    const row = [
      t.date,
      t.type === 'income' ? 'Thu' : 'Chi',
      categoryNameMap.get(t.categoryId) ?? 'Không rõ',
      String(t.amount),
      t.note,
    ];
    lines.push(row.map(escapeCell).join(','));
  }

  return BOM + lines.join('\r\n');
}

/**
 * Trigger a browser download of the CSV file.
 */
export function downloadCSV(csv: string, filename: string = 'giao-dich.csv'): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
