import { formatVND, validateAmount, MAX_AMOUNT } from '../../../lib/utils/currency';

describe('formatVND', () => {
  it('formats zero', () => {
    expect(formatVND(0)).toMatch(/0/);
  });

  it('formats a typical amount', () => {
    expect(formatVND(1_500_000)).toMatch(/1.500.000/);
  });

  it('formats max amount', () => {
    expect(formatVND(MAX_AMOUNT)).toMatch(/10.000.000.000/);
  });
});

describe('validateAmount', () => {
  it('returns null for a valid amount', () => {
    expect(validateAmount(50_000)).toBeNull();
  });

  it('rejects non-finite values', () => {
    expect(validateAmount('abc')).not.toBeNull();
    expect(validateAmount(NaN)).not.toBeNull();
    expect(validateAmount(Infinity)).not.toBeNull();
  });

  it('rejects zero', () => {
    expect(validateAmount(0)).not.toBeNull();
  });

  it('rejects negative numbers', () => {
    expect(validateAmount(-1)).not.toBeNull();
  });

  it('rejects non-integer', () => {
    expect(validateAmount(1.5)).not.toBeNull();
  });

  it('rejects amounts above max', () => {
    expect(validateAmount(MAX_AMOUNT + 1)).not.toBeNull();
  });

  it('accepts MAX_AMOUNT exactly', () => {
    expect(validateAmount(MAX_AMOUNT)).toBeNull();
  });
});
