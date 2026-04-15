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
      <div className="flex gap-2 justify-end pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setIsFormOpen(false);
            setEditing(null);
          }}
        >
          Hủy
        </Button>
        <Button type="submit">Lưu</Button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Danh mục</h1>
        <Button onClick={openAdd}>+ Thêm danh mục</Button>
      </div>

      <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="text-sm font-medium text-gray-900">{cat.name}</span>
              <span className="ml-2 text-xs text-gray-400">
                {TYPE_OPTIONS.find((o) => o.value === cat.type)?.label}
              </span>
              {cat.isDefault && (
                <span className="ml-2 text-xs text-blue-400">mặc định</span>
              )}
            </div>
            <div className="flex gap-2">
              {!cat.isProtected && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>
                    Sửa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(cat)}
                  >
                    Xoá
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="text-center text-sm text-gray-400 py-8">
            Chưa có danh mục nào.
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
