'use client';

import { useState } from 'react';
import { useCategories } from '../../lib/hooks/useCategories';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import type { Category, CategoryType } from '../../lib/types';

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Chi tiêu' },
  { value: 'income', label: 'Thu nhập' },
  { value: 'both', label: 'Cả hai' },
];

interface CategoryFormState {
  name: string;
  type: CategoryType;
}

export default function CategoriesPage() {
  const { categories, add, update, remove } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryFormState>({ name: '', type: 'expense' });
  const [error, setError] = useState('');

  function openAdd() {
    setForm({ name: '', type: 'expense' });
    setError('');
    setIsFormOpen(true);
  }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({ name: cat.name, type: cat.type });
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    }
    if (editing) {
      update({ ...editing, name: form.name.trim(), type: form.type });
      setEditing(null);
    } else {
      const now = new Date().toISOString();
      add({
        id: crypto.randomUUID(),
        name: form.name.trim(),
        type: form.type,
        isDefault: false,
        isProtected: false,
      });
      setIsFormOpen(false);
    }
    setError('');
  }

  function handleDelete(cat: Category) {
    if (cat.isProtected) return;
    if (!window.confirm(`Xoá danh mục "${cat.name}"?`)) return;
    remove(cat.id);
  }

  const formModal = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Tên danh mục"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        error={error}
        placeholder="Ví dụ: Cafe, Thuê nhà..."
        required
      />
      <Select
        label="Loại"
        value={form.type}
        onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CategoryType }))}
        options={TYPE_OPTIONS}
      />
      <div className="flex gap-2 justify-end pt-1">
        <Button
          type="button"
          variant="secondary"
          onClick={() => { setIsFormOpen(false); setEditing(null); }}
        >
          Hủy
        </Button>
        <Button type="submit">Lưu danh mục</Button>
      </div>
    </form>
  );

  const typeLabel: Record<string, string> = {
    expense: 'Chi tiêu',
    income: 'Thu nhập',
    both: 'Cả hai',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Danh mục</h1>
          <p className="text-sm text-[var(--color-muted)] mt-0.5">{categories.length} danh mục</p>
        </div>
        <Button onClick={openAdd}>+ Thêm danh mục</Button>
      </div>

      <ul
        className="bg-white rounded-2xl divide-y divide-[var(--color-border)] overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}
      >
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between px-5 py-3.5 group hover:bg-[var(--color-bg)] transition-colors">
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: cat.type === 'income' ? '#dcfce7' : cat.type === 'expense' ? '#fee2e2' : '#e0e7ff',
                  color:      cat.type === 'income' ? '#16a34a' : cat.type === 'expense' ? '#dc2626' : '#4f46e5',
                }}
              >
                {cat.type === 'income' ? '↑' : cat.type === 'expense' ? '↓' : '↕'}
              </span>
              <div>
                <span className="text-sm font-semibold text-[var(--color-text)]">{cat.name}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-[var(--color-muted)]">{typeLabel[cat.type]}</span>
                  {cat.isDefault && (
                    <span className="text-xs px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-500 font-medium">
                      mặc định
                    </span>
                  )}
                  {cat.isProtected && (
                    <span className="text-xs px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-400 font-medium">
                      🔒
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!cat.isProtected && (
                <>
                  <button
                    onClick={() => openEdit(cat)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:text-red-600 hover:border-red-300 transition-colors"
                  >
                    Xoá
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="flex flex-col items-center py-12 gap-2">
            <span className="text-3xl">🏷️</span>
            <p className="text-sm text-[var(--color-muted)]">Chưa có danh mục nào.</p>
          </li>
        )}
      </ul>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Thêm danh mục">
        {formModal}
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Chỉnh sửa danh mục">
        {editing && formModal}
      </Modal>
    </div>
  );
}
