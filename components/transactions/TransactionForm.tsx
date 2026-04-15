'use client';

import { useState } from 'react';
import type { Transaction, Category, TransactionType } from '../../lib/types';
import { validateAmount, MAX_AMOUNT } from '../../lib/utils/currency';
import { todayString } from '../../lib/utils/date';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export interface TransactionFormProps {
  categories: Category[];
  initial?: Partial<Transaction>;
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function TransactionForm({
  categories,
  initial,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initial?.type ?? 'expense');
  const [amountStr, setAmountStr] = useState(initial?.amount ? String(initial.amount) : '');
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId ?? 'cat-default-unclassified',
  );
  const [date, setDate] = useState(initial?.date ?? todayString());
  const [note, setNote] = useState(initial?.note ?? '');
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const compatibleCategories = categories.filter(
    (c) => c.type === type || c.type === 'both',
  );

  function validate(): boolean {
    const errs: Partial<Record<string, string>> = {};
    const amountError = validateAmount(Number(amountStr));
    if (amountError) errs.amount = amountError;
    if (!date) errs.date = 'Vui lòng chọn ngày';
    if (!categoryId) errs.categoryId = 'Vui lòng chọn danh mục';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      type,
      amount: Number(amountStr),
      categoryId,
      date,
      note: note.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Type toggle */}
      <div className="flex p-1 rounded-xl gap-1" style={{ background: 'var(--color-border)' }}>
        {([ ['expense', 'Chi tiêu', '#dc2626'], ['income', 'Thu nhập', '#16a34a'] ] as const).map(
          ([val, label, color]) => (
            <button
              key={val}
              type="button"
              onClick={() => setType(val)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={
                type === val
                  ? { background: color, color: 'white', boxShadow: 'var(--shadow-sm)' }
                  : { color: 'var(--color-muted)' }
              }
            >
              {label}
            </button>
          ),
        )}
      </div>

      <Input
        label="Số tiền (VND)"
        type="number"
        min={1}
        max={MAX_AMOUNT}
        step={1}
        value={amountStr}
        onChange={(e) => setAmountStr(e.target.value)}
        error={errors.amount}
        placeholder="Ví dụ: 50000"
        required
      />

      <Select
        label="Danh mục"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        error={errors.categoryId}
        options={compatibleCategories.map((c) => ({ value: c.id, label: c.name }))}
      />

      <Input
        label="Ngày"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
        required
      />

      <Input
        label="Ghi chú (tuỳ chọn)"
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Thêm ghi chú..."
        maxLength={200}
      />

      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">Lưu giao dịch</Button>
      </div>
    </form>
  );
}
