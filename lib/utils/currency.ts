/** Max allowed VND amount (10 tỷ) */
export const MAX_AMOUNT = 10_000_000_000;

/**
 * Format an integer VND amount for display.
 * e.g. 1500000 → "1.500.000 ₫"
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate an amount value.
 * Returns null if valid, or an error message string if invalid.
 */
export function validateAmount(value: unknown): string | null {
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Số tiền không hợp lệ';
  if (!Number.isInteger(n)) return 'Số tiền phải là số nguyên (VND)';
  if (n <= 0) return 'Số tiền phải lớn hơn 0';
  if (n > MAX_AMOUNT) return `Số tiền không được vượt quá ${formatVND(MAX_AMOUNT)}`;
  return null;
}
