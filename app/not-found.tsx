import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <p className="text-5xl">🔍</p>
      <h2 className="text-xl font-semibold text-gray-900">Không tìm thấy trang</h2>
      <p className="text-sm text-gray-500">Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link
        href="/dashboard"
        className="mt-2 text-sm text-blue-600 hover:underline font-medium"
      >
        ← Về trang tổng quan
      </Link>
    </div>
  );
}
