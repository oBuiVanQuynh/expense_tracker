'use client';

import React, { useEffect } from 'react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(15,15,30,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 animate-[slideUp_.22s_ease-out]"
        style={{ boxShadow: 'var(--shadow-lg)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 id="modal-title" className="text-base font-bold text-[var(--color-text)]">
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Đóng"
            className="w-7 h-7 !p-0 rounded-full text-lg leading-none">
            ×
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
