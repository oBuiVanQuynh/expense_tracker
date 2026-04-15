/**
 * Dummy data seed script
 * Paste toàn bộ file này vào Browser DevTools Console khi app đang chạy ở localhost:3000
 * Sau đó reload trang để thấy dữ liệu.
 */

(() => {
  // ── Categories ────────────────────────────────────────────────
  const categories = [
    { id: 'cat-default-unclassified', name: 'Chưa phân loại', type: 'both',    isDefault: true,  isProtected: true  },
    { id: 'cat-default-food',         name: 'Ăn uống',         type: 'expense', isDefault: true,  isProtected: false },
    { id: 'cat-default-transport',    name: 'Đi lại',          type: 'expense', isDefault: true,  isProtected: false },
    { id: 'cat-default-shopping',     name: 'Mua sắm',         type: 'expense', isDefault: true,  isProtected: false },
    { id: 'cat-default-health',       name: 'Sức khoẻ',        type: 'expense', isDefault: true,  isProtected: false },
    { id: 'cat-default-entertainment',name: 'Giải trí',        type: 'expense', isDefault: true,  isProtected: false },
    { id: 'cat-default-salary',       name: 'Lương',           type: 'income',  isDefault: true,  isProtected: false },
    { id: 'cat-default-other-income', name: 'Thu nhập khác',   type: 'income',  isDefault: true,  isProtected: false },
  ];

  // ── Transactions — trải đều 3 tháng gần nhất ──────────────────
  // Hàm tạo ISO date string "YYYY-MM-DD" cách hôm nay N ngày
  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  }

  function uuid() {
    return crypto.randomUUID();
  }

  function tx(daysBack, type, amount, categoryId, note) {
    const now = new Date().toISOString();
    return { id: uuid(), type, amount, categoryId, date: daysAgo(daysBack), note, createdAt: now, updatedAt: now };
  }

  const transactions = [
    // ── Tháng này ──────────────────────────────────────────────
    tx(0,  'income',  15_000_000, 'cat-default-salary',        'Lương tháng 4'),
    tx(1,  'expense',    85_000,  'cat-default-food',           'Phở bò sáng'),
    tx(1,  'expense',    45_000,  'cat-default-transport',      'Grab về nhà'),
    tx(2,  'expense',   350_000,  'cat-default-shopping',       'Áo thun Uniqlo'),
    tx(3,  'expense',   120_000,  'cat-default-food',           'Cơm văn phòng x3 ngày'),
    tx(3,  'expense',    55_000,  'cat-default-entertainment',  'Netflix tháng'),
    tx(4,  'expense',   200_000,  'cat-default-health',         'Khám nha khoa'),
    tx(5,  'income',  1_500_000, 'cat-default-other-income',   'Freelance design'),
    tx(5,  'expense',    35_000,  'cat-default-transport',      'Xăng xe'),
    tx(6,  'expense',   180_000,  'cat-default-food',           'Lẩu cuối tuần'),
    tx(7,  'expense',    75_000,  'cat-default-food',           'Bánh mì + cafe'),
    tx(8,  'expense',   499_000,  'cat-default-shopping',       'Sách lập trình'),
    tx(9,  'expense',    22_000,  'cat-default-transport',      'Vé xe buýt'),
    tx(10, 'expense',   150_000,  'cat-default-entertainment',  'Xem phim rạp'),
    tx(11, 'expense',    90_000,  'cat-default-food',           'Trà sữa team building'),
    tx(12, 'expense',   600_000,  'cat-default-health',         'Mua vitamin C + omega'),
    tx(13, 'expense',   130_000,  'cat-default-food',           'Ăn tối với bạn bè'),

    // ── Tháng trước ────────────────────────────────────────────
    tx(30, 'income',  15_000_000, 'cat-default-salary',        'Lương tháng 3'),
    tx(31, 'expense',    95_000,  'cat-default-food',           'Bún bò Huế'),
    tx(32, 'expense',    60_000,  'cat-default-transport',      'Taxi sân bay'),
    tx(33, 'expense',   240_000,  'cat-default-shopping',       'Cáp sạc chính hãng'),
    tx(34, 'income',    800_000, 'cat-default-other-income',   'Bán đồ cũ Chợ Tốt'),
    tx(35, 'expense',   175_000,  'cat-default-food',           'Buffet sinh nhật'),
    tx(36, 'expense',    45_000,  'cat-default-entertainment',  'Spotify Premium'),
    tx(37, 'expense',   320_000,  'cat-default-health',         'Thuốc cảm cúm'),
    tx(38, 'expense',    30_000,  'cat-default-transport',      'Gửi xe tháng'),
    tx(40, 'expense',   550_000,  'cat-default-shopping',       'Bàn phím cơ'),
    tx(42, 'expense',    80_000,  'cat-default-food',           'Cơm gà xối mỡ'),
    tx(44, 'expense',   160_000,  'cat-default-entertainment',  'Game Steam sale'),
    tx(46, 'expense',    70_000,  'cat-default-transport',      'Đổ xăng'),
    tx(48, 'expense',   210_000,  'cat-default-food',           'Đặt pizza online'),

    // ── 2 tháng trước ──────────────────────────────────────────
    tx(60, 'income',  15_000_000, 'cat-default-salary',        'Lương tháng 2'),
    tx(61, 'income',  2_000_000, 'cat-default-other-income',   'Thưởng dự án Q1'),
    tx(62, 'expense',   110_000,  'cat-default-food',           'Bún chả Hà Nội'),
    tx(63, 'expense',    50_000,  'cat-default-transport',      'Xe ôm'),
    tx(64, 'expense',   890_000,  'cat-default-shopping',       'Giày thể thao'),
    tx(65, 'expense',   300_000,  'cat-default-health',         'Kiểm tra sức khoẻ định kỳ'),
    tx(66, 'expense',    55_000,  'cat-default-entertainment',  'Mua sách Kindle'),
    tx(68, 'expense',   145_000,  'cat-default-food',           'Đi ăn với đồng nghiệp'),
    tx(70, 'expense',    28_000,  'cat-default-transport',      'Bãi đậu xe'),
    tx(72, 'expense',   420_000,  'cat-default-shopping',       'Quần jeans'),
    tx(75, 'expense',    65_000,  'cat-default-food',           'Cafe làm việc'),
    tx(78, 'expense',   190_000,  'cat-default-entertainment',  'Escape room với bạn'),
    tx(80, 'expense',   100_000,  'cat-default-health',         'Kem chống nắng SPF50'),
  ];

  localStorage.setItem('expense_tracker_categories', JSON.stringify(categories));
  localStorage.setItem('expense_tracker_transactions', JSON.stringify(transactions));

  console.log(`✅ Seed xong: ${categories.length} danh mục, ${transactions.length} giao dịch`);
  console.log('👉 Reload trang để xem dữ liệu.');
})();
