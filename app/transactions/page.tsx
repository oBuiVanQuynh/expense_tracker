'use client';

import { useState } from 'react';
import { useTransactions } from '../../lib/hooks/useTransactions';
import { useCategories } from '../../lib/hooks/useCategories';
import { TransactionForm } from '../../components/transactions/TransactionForm';
import { TransactionList } from '../../components/transactions/TransactionList';
import { TransactionFilters } from '../../components/transactions/TransactionFilters';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { exportToCSV, downloadCSV } from '../../lib/utils/export';
import type { Transaction } from '../../lib/types';

export default function TransactionsPage() {
  const { transactions, filters, setFilters, add, update, remove } = useTransactions();
  const { categories } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  function handleExport() {
    const categoryNameMap = new Map(categories.map((c) => [c.id, c.name]));
    const csv = exportToCSV(transactions, categoryNameMap);
    const now = new Date().toISOString().slice(0, 10);
    downloadCSV(csv, `giao-dich-${now}.csv`);
  }

  function handleAdd(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    add({ ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
    setIsFormOpen(false);
  }

  function handleUpdate(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!editing) return;
    update({ ...editing, ...data, updatedAt: new Date().toISOString() });
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!window.confirm('Xoá giao dịch này?')) return;
    remove(id);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Giao dịch</h1>
        <Button onClick={() => setIsFormOpen(true)}>+ Thêm giao dịch</Button>
      </div>

      <TransactionFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onExport={handleExport}
      />

      <div className="bg-white rounded-lg border border-gray-200 px-4">
        <TransactionList
          transactions={transactions}
          categories={categories}
          onEdit={(t) => setEditing(t)}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Thêm giao dịch"
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleAdd}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title="Chỉnh sửa giao dịch"
      >
        {editing && (
          <TransactionForm
            categories={categories}
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
}
