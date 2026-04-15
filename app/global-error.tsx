'use client';

import { useEffect } from 'react';
import { Button } from '../components/ui/Button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Đã có lỗi xảy ra</h2>
          <p className="text-sm text-gray-500 mb-6">{error.message}</p>
          <Button onClick={reset}>Thử lại</Button>
        </div>
      </body>
    </html>
  );
}
