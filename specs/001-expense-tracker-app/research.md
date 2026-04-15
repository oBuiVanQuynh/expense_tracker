# Research: Expense Tracker App

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15

## Decision Log

---

### D-001: State Management Strategy

**Decision**: React built-in state + custom hooks (no external state library)

**Rationale**: Application scope is small (~3 entities, ~4 pages). Custom hooks (`useTransactions`, `useCategories`, `usePeriod`) colocate data-fetching, mutation, and localStorage sync cleanly. No cross-cutting global state that would justify Redux/Zustand overhead.

**Alternatives considered**:
- Zustand: Lightweight but adds a dependency. Overkill for single-user, single-tab app.
- Redux Toolkit: Excessive boilerplate for this scope.
- React Context: Viable, but hooks pattern is simpler and more testable in isolation.

---

### D-002: localStorage Data Layout

**Decision**: Two separate keys — `expense_tracker_transactions` and `expense_tracker_categories` — each storing a JSON array.

**Rationale**: Separate keys allow independent read/write without deserializing unrelated data. Prefixed keys avoid collision with other apps on the same origin. Array-of-objects is the simplest structure for this scale.

**Alternatives considered**:
- Single key with nested object: Requires full rewrite on every mutation; worse for partial updates.
- One key per record: Too many localStorage keys; poor manageability.
- IndexedDB: Rejected in clarification (Q1) in favour of simplicity.

**Size estimate**: 1000 transactions × ~200 bytes/record ≈ 200 KB. Well within 5 MB localStorage limit.

---

### D-003: ID Generation Strategy

**Decision**: `crypto.randomUUID()` (native browser API, no dependency)

**Rationale**: Available in all modern browsers (target: latest-2). Collision-free for single-user local data. Zero bytes added to bundle.

**Alternatives considered**:
- `uuid` npm package: Unnecessary dependency when native API suffices.
- Incremental integer: Risk of collision after data clear/reimport; not globally unique.
- `Date.now()` timestamp: Collides on rapid creation (same millisecond).

---

### D-004: Date Handling

**Decision**: Native `Date` object + `date-fns` library for period arithmetic

**Rationale**: `date-fns` is tree-shakeable, immutable, and handles week/month boundary calculations reliably across locales (including Vietnamese week start conventions). Avoids timezone bugs common with manual date math.

**Alternatives considered**:
- `dayjs`: Smaller, but plugin system adds complexity for week navigation.
- Moment.js: Deprecated, large bundle size.
- Native Date only: Week-start and month-boundary calculations are error-prone to implement manually.

**Key operations needed**:
- `startOfDay / endOfDay`
- `startOfWeek / endOfWeek` (week starts Monday for VN locale)
- `startOfMonth / endOfMonth`
- `addDays / addWeeks / addMonths` (period navigation)
- `isWithinInterval` (filter transactions by period)
- `format` (display dates in `dd/MM/yyyy`)

---

### D-005: CSV Export with Vietnamese Character Support

**Decision**: Manual CSV string generation with UTF-8 BOM prefix (`\uFEFF`)

**Rationale**: Excel on Windows requires a UTF-8 BOM to correctly detect encoding and display Vietnamese characters. This is a 3-byte prefix prepended to the CSV blob. No library needed — a simple template string join is sufficient for flat tabular data.

**Alternatives considered**:
- `papaparse` unparse: Adds ~25 KB dependency for a simple 5-column flat export.
- `xlsx` library: Overkill for CSV; adds >200 KB to bundle.

**Implementation pattern**:
```ts
const BOM = '\uFEFF';
const header = 'Ngày,Loại,Danh mục,Số tiền,Ghi chú\n';
const rows = transactions.map(t => [
  format(t.date, 'dd/MM/yyyy'),
  t.type === 'income' ? 'Thu' : 'Chi',
  t.categoryName,
  t.amount.toString(),
  `"${(t.note ?? '').replace(/"/g, '""')}"`,
].join(',')).join('\n');
const blob = new Blob([BOM + header + rows], { type: 'text/csv;charset=utf-8;' });
```

---

### D-006: VND Currency Formatting

**Decision**: `Intl.NumberFormat` with `vi-VN` locale and `VND` currency

**Rationale**: Native browser API, zero dependency, outputs correct Vietnamese number formatting (e.g., `1.500.000 ₫`). Available in all target browsers.

**Alternatives considered**:
- Manual string formatting: Error-prone, doesn't handle locale-specific separators.
- `currency.js`: Adds a dependency unnecessarily.

**Pattern**:
```ts
const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
fmt.format(1500000); // → "1.500.000 ₫"
```

---

### D-007: Default Categories Seed Strategy

**Decision**: Seed defaults on first load (check if `expense_tracker_categories` key is absent or empty); never re-seed if key exists.

**Rationale**: Allows users to delete default categories without them reappearing. Categories are user data once seeded.

**Default set**:
- **Chi (Expense)**: Ăn uống, Di chuyển, Mua sắm, Giải trí, Hoá đơn/Tiện ích, Sức khoẻ, Khác
- **Thu (Income)**: Lương, Thưởng, Đầu tư, Bán hàng, Thu nhập khác

---

### D-008: Testing Strategy

**Decision**: Jest + React Testing Library for unit and integration tests; no e2e for v1.

**Rationale**: Pure utility functions (`aggregation`, `currency`, `date`, `export`) are unit-testable without DOM. Hook tests use `renderHook` with a mocked localStorage. Component integration tests verify user flows without a browser. E2e (Playwright) deferred to post-v1 — setup cost is high relative to scope.

**localStorage mock pattern** (Jest):
```ts
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
```

---

### D-009: Navigation & Routing

**Decision**: Next.js App Router with `<Link>` for client-side navigation; no additional router library.

**Rationale**: Project already uses Next.js App Router. Four pages map naturally to four route segments. No dynamic data fetching — all rendering is client-side after hydration.

**Route map**:
| Route | Page | Description |
|---|---|---|
| `/` | Redirect | → `/dashboard` |
| `/dashboard` | Dashboard | Summary cards + period nav + category breakdown |
| `/transactions` | Transactions | List + filter + search + export |
| `/transactions/new` | New Transaction | Create form (modal or page) |
| `/transactions/[id]` | Edit Transaction | Edit form |
| `/categories` | Categories | CRUD management |

---

### D-010: Period Navigation Logic

**Decision**: Controlled `usePeriod` hook stores `{ mode: 'day'|'week'|'month', anchor: Date }` where `anchor` is the start of the current period.

**Rationale**: Decouples display logic from period arithmetic. `anchor` + `mode` uniquely determines the displayed period and enables clean prev/next navigation with `date-fns`.

**Navigation rules**:
- Day mode: anchor = the selected day; prev/next = `±1 day`
- Week mode: anchor = `startOfWeek(selected, { weekStartsOn: 1 })`; prev/next = `±1 week`
- Month mode: anchor = `startOfMonth(selected)`; prev/next = `±1 month`
