/**
 * Seed data generator — dùng trong SeedLoader component (dev only)
 * 200+ giao dịch trải đều 6 tháng gần nhất
 */

export interface SeedTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  categoryId: string;
  date: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeedCategory {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'both';
  isDefault: boolean;
  isProtected: boolean;
}

export const SEED_CATEGORIES: SeedCategory[] = [
  { id: 'cat-default-unclassified',  name: 'Chưa phân loại',  type: 'both',    isDefault: true,  isProtected: true  },
  { id: 'cat-default-food',          name: 'Ăn uống',          type: 'expense', isDefault: true,  isProtected: false },
  { id: 'cat-default-transport',     name: 'Đi lại',           type: 'expense', isDefault: true,  isProtected: false },
  { id: 'cat-default-shopping',      name: 'Mua sắm',          type: 'expense', isDefault: true,  isProtected: false },
  { id: 'cat-default-health',        name: 'Sức khoẻ',         type: 'expense', isDefault: true,  isProtected: false },
  { id: 'cat-default-entertainment', name: 'Giải trí',         type: 'expense', isDefault: true,  isProtected: false },
  { id: 'cat-default-salary',        name: 'Lương',            type: 'income',  isDefault: true,  isProtected: false },
  { id: 'cat-default-other-income',  name: 'Thu nhập khác',    type: 'income',  isDefault: true,  isProtected: false },
  { id: 'cat-custom-rent',           name: 'Thuê nhà',         type: 'expense', isDefault: false, isProtected: false },
  { id: 'cat-custom-utilities',      name: 'Điện nước',        type: 'expense', isDefault: false, isProtected: false },
  { id: 'cat-custom-education',      name: 'Học phí',          type: 'expense', isDefault: false, isProtected: false },
  { id: 'cat-custom-investment',     name: 'Đầu tư',           type: 'income',  isDefault: false, isProtected: false },
];

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function makeTx(
  daysAgo: number,
  type: 'income' | 'expense',
  amount: number,
  categoryId: string,
  note: string,
): SeedTransaction {
  const now = new Date().toISOString();
  // deterministic-ish id based on content (no crypto needed for seed)
  const id = `seed-${daysAgo}-${categoryId}-${amount}`;
  return { id, type, amount, categoryId, date: dateStr(daysAgo), note, createdAt: now, updatedAt: now };
}

// Spread ~35 expense transactions per month, 2 salary + occasional extra income
export function buildSeedTransactions(): SeedTransaction[] {
  return [
    /* ── Tháng này (0–29 ngày trước) ─────────────────────────── */
    makeTx(0,  'income',  18_000_000, 'cat-default-salary',        'Lương tháng 4/2026'),
    makeTx(0,  'expense',     85_000, 'cat-default-food',           'Phở bò sáng nay'),
    makeTx(1,  'expense',     45_000, 'cat-default-transport',      'Grab về nhà'),
    makeTx(1,  'expense',     65_000, 'cat-default-food',           'Cơm trưa văn phòng'),
    makeTx(2,  'expense',    350_000, 'cat-default-shopping',       'Áo thun Uniqlo'),
    makeTx(2,  'expense',     30_000, 'cat-default-transport',      'Vé xe buýt'),
    makeTx(3,  'expense',    120_000, 'cat-default-food',           'Bún bò chiều'),
    makeTx(3,  'expense',     55_000, 'cat-default-entertainment',  'Netflix tháng 4'),
    makeTx(4,  'expense',    200_000, 'cat-default-health',         'Khám nha khoa'),
    makeTx(4,  'expense',     48_000, 'cat-default-food',           'Bánh mì thịt'),
    makeTx(5,  'income',  1_500_000, 'cat-default-other-income',   'Freelance UI design'),
    makeTx(5,  'expense',     35_000, 'cat-default-transport',      'Đổ xăng'),
    makeTx(6,  'expense',    180_000, 'cat-default-food',           'Lẩu cuối tuần'),
    makeTx(6,  'expense',    499_000, 'cat-default-shopping',       'Sách lập trình x2'),
    makeTx(7,  'expense',     75_000, 'cat-default-food',           'Café + bánh'),
    makeTx(7,  'expense',    150_000, 'cat-default-entertainment',  'Xem phim rạp'),
    makeTx(8,  'expense',    600_000, 'cat-custom-utilities',       'Tiền điện tháng 4'),
    makeTx(8,  'expense',     22_000, 'cat-default-transport',      'Gửi xe ngày'),
    makeTx(9,  'expense',     90_000, 'cat-default-food',           'Trà sữa team'),
    makeTx(9,  'expense',    200_000, 'cat-custom-rent',            'Thuê nhà (đặt cọc thêm)'),
    makeTx(10, 'expense',    130_000, 'cat-default-food',           'Tối với bạn bè'),
    makeTx(10, 'expense',     40_000, 'cat-default-transport',      'Grab đi làm'),
    makeTx(11, 'expense',    250_000, 'cat-default-health',         'Vitamin tổng hợp'),
    makeTx(11, 'income',    500_000, 'cat-custom-investment',      'Cổ tức tháng 4'),
    makeTx(12, 'expense',     70_000, 'cat-default-food',           'Cháo sáng'),
    makeTx(12, 'expense',    420_000, 'cat-default-shopping',       'Quần jeans'),
    makeTx(13, 'expense',     55_000, 'cat-default-transport',      'Taxi sân bay nội địa'),
    makeTx(13, 'expense',    160_000, 'cat-default-entertainment',  'Escape room'),
    makeTx(14, 'expense',     95_000, 'cat-default-food',           'Hủ tiếu Nam Vang'),
    makeTx(15, 'expense',    320_000, 'cat-custom-education',       'Khoá Udemy'),
    makeTx(16, 'expense',     42_000, 'cat-default-transport',      'Xe buýt 2 chiều'),
    makeTx(17, 'expense',    110_000, 'cat-default-food',           'Buffet trưa'),
    makeTx(18, 'expense',     85_000, 'cat-default-entertainment',  'Spotify + YouTube Premium'),
    makeTx(19, 'expense',    180_000, 'cat-default-health',         'Khám mắt'),
    makeTx(20, 'expense',     60_000, 'cat-default-food',           'Bánh cuốn sáng'),
    makeTx(21, 'expense',    550_000, 'cat-default-shopping',       'Bàn phím cơ'),
    makeTx(22, 'expense',     35_000, 'cat-default-transport',      'Xăng xe'),
    makeTx(22, 'income',  2_000_000, 'cat-default-other-income',   'Bán laptop cũ'),
    makeTx(23, 'expense',    210_000, 'cat-default-food',           'Pizza tối'),
    makeTx(24, 'expense',     80_000, 'cat-default-entertainment',  'Board game cafe'),
    makeTx(25, 'expense',    400_000, 'cat-custom-utilities',       'Tiền nước + internet'),
    makeTx(26, 'expense',    145_000, 'cat-default-food',           'Cơm gia đình cuối tuần'),
    makeTx(27, 'expense',     50_000, 'cat-default-transport',      'Grab đi chợ'),
    makeTx(28, 'expense',    280_000, 'cat-default-health',         'Thuốc cảm cúm'),
    makeTx(29, 'expense',    175_000, 'cat-default-food',           'Ăn tối ngoài'),

    /* ── Tháng trước (30–59 ngày) ─────────────────────────────── */
    makeTx(30, 'income',  18_000_000, 'cat-default-salary',        'Lương tháng 3/2026'),
    makeTx(30, 'expense',  6_000_000, 'cat-custom-rent',            'Thuê nhà tháng 3'),
    makeTx(31, 'expense',     95_000, 'cat-default-food',           'Bún bò Huế'),
    makeTx(31, 'expense',     60_000, 'cat-default-transport',      'Taxi sân bay'),
    makeTx(32, 'expense',    240_000, 'cat-default-shopping',       'Cáp sạc + hub USB'),
    makeTx(32, 'income',    800_000, 'cat-default-other-income',   'Bán đồ cũ Chợ Tốt'),
    makeTx(33, 'expense',    175_000, 'cat-default-food',           'Buffet sinh nhật bạn'),
    makeTx(33, 'expense',     45_000, 'cat-default-entertainment',  'Spotify tháng 3'),
    makeTx(34, 'expense',    320_000, 'cat-default-health',         'Thuốc + toa bác sĩ'),
    makeTx(34, 'expense',     30_000, 'cat-default-transport',      'Gửi xe tháng 3'),
    makeTx(35, 'expense',    550_000, 'cat-default-shopping',       'Bàn phím cơ 2'),
    makeTx(36, 'expense',     80_000, 'cat-default-food',           'Cơm gà xối mỡ'),
    makeTx(36, 'expense',    500_000, 'cat-custom-education',       'Khoá học React Native'),
    makeTx(37, 'expense',    160_000, 'cat-default-entertainment',  'Game Steam'),
    makeTx(37, 'expense',     70_000, 'cat-default-transport',      'Đổ xăng'),
    makeTx(38, 'expense',    210_000, 'cat-default-food',           'Đặt pizza'),
    makeTx(38, 'income',    300_000, 'cat-custom-investment',      'Cổ tức tháng 3'),
    makeTx(39, 'expense',    600_000, 'cat-custom-utilities',       'Điện nước tháng 3'),
    makeTx(40, 'expense',     55_000, 'cat-default-food',           'Café sáng'),
    makeTx(40, 'expense',    400_000, 'cat-default-shopping',       'Giày thể thao'),
    makeTx(41, 'expense',    120_000, 'cat-default-health',         'Kem chống nắng'),
    makeTx(42, 'expense',     35_000, 'cat-default-transport',      'Vé xe buýt'),
    makeTx(43, 'expense',    185_000, 'cat-default-food',           'Cơm rang hải sản'),
    makeTx(44, 'expense',    250_000, 'cat-default-entertainment',  'Xem phim + bắp'),
    makeTx(45, 'expense',     90_000, 'cat-default-food',           'Bún chả Hà Nội'),
    makeTx(46, 'expense',     48_000, 'cat-default-transport',      'Grab'),
    makeTx(47, 'expense',    350_000, 'cat-default-shopping',       'Sơ mi công sở'),
    makeTx(48, 'expense',    150_000, 'cat-default-health',         'Vitamins D3'),
    makeTx(49, 'expense',    220_000, 'cat-default-food',           'Lẩu hải sản'),
    makeTx(50, 'expense',     65_000, 'cat-default-transport',      'Grab đi tiệc'),
    makeTx(51, 'expense',    280_000, 'cat-custom-education',       'Sách Effective TypeScript'),
    makeTx(52, 'expense',    130_000, 'cat-default-food',           'Cháo + dimsum'),
    makeTx(53, 'expense',     40_000, 'cat-default-entertainment',  'Truyện tranh'),
    makeTx(54, 'expense',    180_000, 'cat-default-health',         'Khám định kỳ'),
    makeTx(55, 'expense',     75_000, 'cat-default-food',           'Phở + đá chanh'),
    makeTx(56, 'expense',    440_000, 'cat-default-shopping',       'Túi đeo chéo'),
    makeTx(57, 'income',  1_200_000, 'cat-default-other-income',   'Dạy kèm tháng 3'),
    makeTx(58, 'expense',     50_000, 'cat-default-transport',      'Xăng xe'),
    makeTx(59, 'expense',    190_000, 'cat-default-food',           'Tối bạn bè'),

    /* ── Tháng -2 (60–89 ngày) ────────────────────────────────── */
    makeTx(60, 'income',  18_000_000, 'cat-default-salary',        'Lương tháng 2/2026'),
    makeTx(60, 'income',  2_000_000, 'cat-default-other-income',   'Thưởng dự án Q1'),
    makeTx(60, 'expense',  6_000_000, 'cat-custom-rent',            'Thuê nhà tháng 2'),
    makeTx(61, 'expense',    110_000, 'cat-default-food',           'Bún chả Hà Nội'),
    makeTx(61, 'expense',     50_000, 'cat-default-transport',      'Xe ôm'),
    makeTx(62, 'expense',    890_000, 'cat-default-shopping',       'Giày thể thao Nike'),
    makeTx(63, 'expense',    300_000, 'cat-default-health',         'Kiểm tra sức khoẻ'),
    makeTx(63, 'expense',    600_000, 'cat-custom-utilities',       'Điện nước tháng 2'),
    makeTx(64, 'expense',     55_000, 'cat-default-entertainment',  'Mua sách Kindle'),
    makeTx(65, 'expense',    145_000, 'cat-default-food',           'Ăn tối đồng nghiệp'),
    makeTx(65, 'income',    400_000, 'cat-custom-investment',      'Cổ tức tháng 2'),
    makeTx(66, 'expense',     28_000, 'cat-default-transport',      'Bãi đậu xe'),
    makeTx(67, 'expense',    420_000, 'cat-default-shopping',       'Quần jogger'),
    makeTx(68, 'expense',     65_000, 'cat-default-food',           'Café làm việc'),
    makeTx(69, 'expense',    190_000, 'cat-default-entertainment',  'Escape room 2'),
    makeTx(70, 'expense',    100_000, 'cat-default-health',         'Kem chống nắng SPF50'),
    makeTx(70, 'expense',    450_000, 'cat-custom-education',       'Udemy Cloud AWS'),
    makeTx(71, 'expense',     85_000, 'cat-default-food',           'Bún bò + trà đào'),
    makeTx(72, 'expense',     40_000, 'cat-default-transport',      'Xe buýt'),
    makeTx(73, 'expense',    230_000, 'cat-default-food',           'Buffet BBQ'),
    makeTx(74, 'expense',    380_000, 'cat-default-shopping',       'Áo khoác nhẹ'),
    makeTx(75, 'expense',    170_000, 'cat-default-health',         'Omega 3 + B12'),
    makeTx(76, 'expense',     60_000, 'cat-default-transport',      'Grab đêm'),
    makeTx(77, 'expense',    120_000, 'cat-default-food',           'Bún riêu cua'),
    makeTx(78, 'expense',    300_000, 'cat-default-entertainment',  'Concert nhạc'),
    makeTx(79, 'income',    700_000, 'cat-default-other-income',   'Bán sách cũ'),
    makeTx(80, 'expense',     95_000, 'cat-default-food',           'Dimsum sáng'),
    makeTx(81, 'expense',    560_000, 'cat-default-shopping',       'Đồng hồ casio'),
    makeTx(82, 'expense',     45_000, 'cat-default-transport',      'Xăng'),
    makeTx(83, 'expense',    280_000, 'cat-default-health',         'Khám tai mũi họng'),
    makeTx(84, 'expense',    140_000, 'cat-default-food',           'Cơm niêu sài gòn'),
    makeTx(85, 'expense',     70_000, 'cat-default-entertainment',  'YouTube Premium'),
    makeTx(86, 'expense',    195_000, 'cat-default-food',           'Lẩu thái cuối tuần'),
    makeTx(87, 'expense',     55_000, 'cat-default-transport',      'Taxi'),
    makeTx(88, 'expense',    340_000, 'cat-default-shopping',       'Balo laptop'),
    makeTx(89, 'expense',    220_000, 'cat-default-food',           'Bít tết tối'),

    /* ── Tháng -3 (90–119 ngày) ───────────────────────────────── */
    makeTx(90, 'income',  18_000_000, 'cat-default-salary',        'Lương tháng 1/2026'),
    makeTx(90, 'expense',  6_000_000, 'cat-custom-rent',            'Thuê nhà tháng 1'),
    makeTx(91, 'expense',    600_000, 'cat-custom-utilities',       'Điện nước tháng 1'),
    makeTx(92, 'expense',    250_000, 'cat-default-food',           'Tiệc tất niên'),
    makeTx(93, 'expense',    180_000, 'cat-default-shopping',       'Quà tết đồng nghiệp'),
    makeTx(94, 'expense',  1_200_000, 'cat-default-shopping',       'Quần áo tết'),
    makeTx(95, 'expense',    400_000, 'cat-default-food',           'Giỏ quà tết'),
    makeTx(96, 'income',  3_000_000, 'cat-default-other-income',   'Lì xì tết'),
    makeTx(97, 'income',    500_000, 'cat-custom-investment',      'Cổ tức tháng 1'),
    makeTx(98, 'expense',    350_000, 'cat-default-food',           'Đặc sản quê'),
    makeTx(99, 'expense',    150_000, 'cat-default-transport',      'Vé xe về quê'),
    makeTx(100,'expense',    200_000, 'cat-default-health',         'Thuốc cúm mùa'),
    makeTx(101,'expense',     80_000, 'cat-default-food',           'Cháo gà'),
    makeTx(102,'expense',    500_000, 'cat-custom-education',       'Khoá Figma Advanced'),
    makeTx(103,'expense',    450_000, 'cat-default-shopping',       'Chuột Logitech'),
    makeTx(104,'expense',    130_000, 'cat-default-food',           'Bánh chưng mua về'),
    makeTx(105,'expense',     60_000, 'cat-default-transport',      'Grab sân bay'),
    makeTx(106,'expense',    270_000, 'cat-default-health',         'Collagen + vit C'),
    makeTx(107,'expense',    185_000, 'cat-default-food',           'Cà ri bò'),
    makeTx(108,'expense',     40_000, 'cat-default-transport',      'Vé xe buýt'),
    makeTx(109,'income',  1_000_000, 'cat-default-other-income',   'Freelance logo'),
    makeTx(110,'expense',    320_000, 'cat-default-entertainment',  'Vé xem nhạc kịch'),
    makeTx(111,'expense',     90_000, 'cat-default-food',           'Bún mộc'),
    makeTx(112,'expense',    680_000, 'cat-default-shopping',       'Tai nghe Sony'),
    makeTx(113,'expense',     55_000, 'cat-default-transport',      'Xăng'),
    makeTx(114,'expense',    210_000, 'cat-default-food',           'Hải sản cuối tuần'),
    makeTx(115,'expense',    170_000, 'cat-default-health',         'Kính mắt mới'),
    makeTx(116,'expense',     75_000, 'cat-default-food',           'Súp nấm sáng'),

    /* ── Tháng -4 (120–149 ngày) ──────────────────────────────── */
    makeTx(120,'income',  18_000_000, 'cat-default-salary',        'Lương tháng 12/2025'),
    makeTx(120,'income',  3_600_000, 'cat-default-other-income',   'Thưởng cuối năm'),
    makeTx(120,'expense',  6_000_000, 'cat-custom-rent',            'Thuê nhà tháng 12'),
    makeTx(121,'expense',    600_000, 'cat-custom-utilities',       'Điện nước tháng 12'),
    makeTx(122,'expense',    850_000, 'cat-default-shopping',       'Áo len + giày bốt'),
    makeTx(123,'expense',    300_000, 'cat-default-food',           'Tiệc cuối năm'),
    makeTx(124,'expense',    450_000, 'cat-default-entertainment',  'Vé đêm nhạc Noel'),
    makeTx(125,'expense',    200_000, 'cat-default-health',         'Khám định kỳ cuối năm'),
    makeTx(126,'income',    600_000, 'cat-custom-investment',      'Cổ tức Q4'),
    makeTx(127,'expense',    160_000, 'cat-default-food',           'Gà nướng Noel'),
    makeTx(128,'expense',     55_000, 'cat-default-transport',      'Grab đêm Noel'),
    makeTx(129,'expense',    720_000, 'cat-default-shopping',       'Quà giáng sinh'),
    makeTx(130,'expense',    130_000, 'cat-default-food',           'Lẩu 31/12'),
    makeTx(131,'expense',    250_000, 'cat-default-entertainment',  'Tiệc đếm ngược'),
    makeTx(132,'expense',     80_000, 'cat-default-transport',      'Taxi đêm giao thừa'),
    makeTx(133,'expense',    480_000, 'cat-custom-education',       'Pluralsight 1 năm'),
    makeTx(134,'expense',    195_000, 'cat-default-food',           'Dimsum thứ 7'),
    makeTx(135,'expense',     45_000, 'cat-default-transport',      'Xe buýt'),
    makeTx(136,'expense',    310_000, 'cat-default-health',         'Mua kính áp tròng'),
    makeTx(137,'expense',    140_000, 'cat-default-food',           'Cơm gia đình'),

    /* ── Tháng -5 (150–179 ngày) ──────────────────────────────── */
    makeTx(150,'income',  18_000_000, 'cat-default-salary',        'Lương tháng 11/2025'),
    makeTx(150,'expense',  6_000_000, 'cat-custom-rent',            'Thuê nhà tháng 11'),
    makeTx(151,'expense',    600_000, 'cat-custom-utilities',       'Điện nước tháng 11'),
    makeTx(152,'expense',    900_000, 'cat-default-shopping',       'Black Friday — quần áo'),
    makeTx(153,'expense',    650_000, 'cat-default-shopping',       'Black Friday — thiết bị'),
    makeTx(154,'expense',    175_000, 'cat-default-food',           'Cơm niêu cuối tuần'),
    makeTx(155,'expense',     50_000, 'cat-default-transport',      'Xe buýt'),
    makeTx(156,'expense',    230_000, 'cat-default-health',         'Vitamin tổng hợp 3 tháng'),
    makeTx(157,'income',  1_500_000, 'cat-default-other-income',   'Freelance mockup'),
    makeTx(158,'income',    400_000, 'cat-custom-investment',      'Cổ tức tháng 11'),
    makeTx(159,'expense',    120_000, 'cat-default-food',           'Bún ốc'),
    makeTx(160,'expense',     65_000, 'cat-default-transport',      'Grab'),
    makeTx(161,'expense',    270_000, 'cat-default-entertainment',  'Museum + triển lãm'),
    makeTx(162,'expense',    380_000, 'cat-default-shopping',       'Ví da'),
    makeTx(163,'expense',    155_000, 'cat-default-food',           'Cá kho tộ'),
    makeTx(164,'expense',    500_000, 'cat-custom-education',       'Khoá Docker + K8s'),
    makeTx(165,'expense',     85_000, 'cat-default-food',           'Bún thịt nướng'),
    makeTx(166,'expense',     40_000, 'cat-default-transport',      'Xăng'),
    makeTx(167,'expense',    290_000, 'cat-default-health',         'Khám da liễu'),
    makeTx(168,'expense',    210_000, 'cat-default-food',           'Cơm tối gia đình'),
  ];
}
