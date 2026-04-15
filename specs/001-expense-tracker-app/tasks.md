---
description: "Task list for Expense Tracker App implementation"
---

# Tasks: Expense Tracker App

**Input**: Design documents from `/specs/001-expense-tracker-app/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅ | quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: User story this task belongs to (US1–US4)
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Configure project dependencies and folder structure per `plan.md`

- [ ] T001 Install `date-fns` dependency: `npm install date-fns`
- [ ] T002 Install Jest + React Testing Library: `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest @types/jest`
- [ ] T003 Create `jest.config.ts` at repository root with jsdom environment and path alias `@/*`
- [ ] T004 Create `jest.setup.ts` at repository root — add localStorage mock and `@testing-library/jest-dom` import
- [ ] T005 [P] Create directory structure: `components/ui/`, `components/transactions/`, `components/dashboard/`, `components/categories/`
- [ ] T006 [P] Create directory structure: `lib/storage/`, `lib/utils/`, `lib/hooks/`
- [ ] T007 [P] Create directory structure: `__tests__/unit/lib/`, `__tests__/unit/hooks/`, `__tests__/integration/`
- [ ] T008 [P] Create directory structure: `app/dashboard/`, `app/transactions/[id]/`, `app/categories/`

**Checkpoint**: All directories exist, `npm test` runs without error (zero tests pass is OK)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, storage layer, and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Define shared TypeScript types in `lib/types.ts`: `Transaction`, `Category`, `Period`, `ResolvedPeriod`, `TransactionType`, `CategoryType` — match exactly the interfaces in `data-model.md`
- [ ] T010 [P] Implement localStorage read/write helpers in `lib/storage/index.ts`: `readKey<T>()`, `writeKey<T>()` with JSON parse error handling (return `[]` on error, log warning)
- [ ] T011 Implement category storage CRUD in `lib/storage/categories.ts`: `DEFAULT_CATEGORIES` seed array (13 defaults from `data-model.md`), `getCategories()`, `saveCategories()`, `seedDefaultsIfEmpty()`, `addCategory()`, `updateCategory()`, `deleteCategory()` — `cat-default-unclassified` must be protected from deletion; orphaned transactions reassigned via callback
- [ ] T012 Implement transaction storage CRUD in `lib/storage/transactions.ts`: `getTransactions()`, `saveTransactions()`, `addTransaction()`, `updateTransaction()`, `deleteTransaction()` (hard delete) — validate `categoryId` exists, fallback to `cat-default-unclassified`
- [ ] T013 [P] Implement VND currency utilities in `lib/utils/currency.ts`: `formatVND(amount: number): string` using `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`, `validateAmount(value: unknown): number | null` (positive integer, max 10,000,000,000)
- [ ] T014 [P] Implement date/period utilities in `lib/utils/date.ts` using `date-fns`: `resolvePeriod(period: Period): ResolvedPeriod`, `navigatePeriod(period: Period, direction: 1 | -1): Period`, `formatPeriodLabel(period: Period): string` (e.g. "15/04/2026", "14/04 – 20/04/2026", "Tháng 4/2026"), `isTransactionInPeriod(date: string, period: ResolvedPeriod): boolean` — week starts Monday
- [ ] T015 [P] Implement aggregation utilities in `lib/utils/aggregation.ts`: `aggregateByPeriod(transactions: Transaction[], period: ResolvedPeriod): { totalIncome, totalExpense, balance, categoryBreakdown[] }` — `balance = totalIncome - totalExpense`; `categoryBreakdown` sorted desc by total; percentage = `(total / totalExpense) * 100` (0 if `totalExpense === 0`)
- [ ] T016 [P] Write unit tests for `lib/utils/currency.ts` in `__tests__/unit/lib/currency.test.ts`: format 0, format 1500000, validate edge cases (negative, zero, over 10B, non-number)
- [ ] T017 [P] Write unit tests for `lib/utils/date.ts` in `__tests__/unit/lib/date.test.ts`: period resolution for all 3 modes, navigation forward/back, label formatting, Vietnamese week start (Monday)
- [ ] T018 [P] Write unit tests for `lib/utils/aggregation.ts` in `__tests__/unit/lib/aggregation.test.ts`: empty period, income-only, expense-only, mixed, percentage calculation, category sort order, balance can be negative

**Checkpoint**: `npm test` passes all foundational unit tests. `lib/types.ts` and all `lib/storage/` + `lib/utils/` modules compile without TypeScript errors.

---

## Phase 3: User Story 1 — Record a Transaction (Priority: P1) 🎯 MVP

**Goal**: Người dùng có thể tạo giao dịch (thu/chi), xem trong danh sách sắp xếp mới nhất trước, sửa và xoá.

**Independent Test**: Tạo giao dịch mới → xuất hiện trong danh sách với đúng thông tin. Xoá → biến mất. Sửa → cập nhật đúng. Không cần Dashboard hay Categories page.

- [ ] T019 [US1] Implement `useCategories` hook in `lib/hooks/useCategories.ts`: load from storage, expose `categories`, `addCategory`, `updateCategory`, `deleteCategory` — seed defaults on mount if empty; filter by `type` for dropdown use
- [ ] T020 [US1] Implement `useTransactions` hook in `lib/hooks/useTransactions.ts`: load from storage, expose `transactions` (sorted: date desc, createdAt desc), `addTransaction`, `updateTransaction`, `deleteTransaction`
- [ ] T021 [P] [US1] Build `components/ui/Button.tsx`: variants `primary | secondary | danger | ghost`, sizes `sm | md`, disabled state, `type` prop
- [ ] T022 [P] [US1] Build `components/ui/Input.tsx`: text/number input with label, error message display, required indicator
- [ ] T023 [P] [US1] Build `components/ui/Select.tsx`: dropdown with label, options array `{ value, label }`, error message display
- [ ] T024 [P] [US1] Build `components/ui/Modal.tsx`: overlay modal with title, children, close button, accessible (focus trap, Escape key close)
- [ ] T025 [US1] Build `components/transactions/TransactionForm.tsx` (depends on T021–T024): fields — type toggle (Thu/Chi), amount input (numeric, validates 1–10,000,000,000), category select (filtered by type), date input (defaults to today), note textarea (max 500 chars); submit calls `addTransaction` or `updateTransaction`; shows field-level validation errors
- [ ] T026 [US1] Build `components/transactions/TransactionList.tsx` (depends on T021): renders sorted list of `Transaction[]`; each row shows date (dd/MM/yyyy), type badge, category name, amount (formatted VND), note snippet; edit and delete actions; delete shows confirmation before calling `deleteTransaction` (hard delete, no undo)
- [ ] T027 [US1] Create `app/transactions/page.tsx`: uses `useTransactions` + `useCategories`; renders `TransactionList`; floating "Thêm giao dịch" button opens `TransactionForm` in `Modal`
- [ ] T028 [US1] Create `app/transactions/[id]/page.tsx`: loads transaction by id, renders `TransactionForm` pre-filled for editing; on save navigates back to `/transactions`
- [ ] T029 [US1] Update `app/page.tsx`: redirect to `/dashboard` using `next/navigation` `redirect()`
- [ ] T030 [US1] Create shared `components/layout/NavBar.tsx`: links to `/dashboard`, `/transactions`, `/categories`; highlight active route
- [ ] T031 [US1] Update `app/layout.tsx`: include `NavBar`, set `<html lang="vi">`, keep existing globals.css
- [ ] T032 [P] [US1] Write integration tests for `TransactionForm` in `__tests__/integration/TransactionForm.test.tsx`: submit with valid data saves to storage; submit with missing amount shows error; submit with amount > 10B shows error; date defaults to today; category dropdown filtered by type
- [ ] T033 [P] [US1] Write unit tests for `useTransactions` hook in `__tests__/unit/hooks/useTransactions.test.ts`: add/update/delete mutate localStorage; list sorted correctly; delete is permanent

**Checkpoint**: Navigate to `/transactions`, create a transaction, verify it appears. Edit it, verify it updates. Delete it, verify it disappears. No Dashboard needed yet.

---

## Phase 4: User Story 2 — View Dashboard by Time Period (Priority: P2)

**Goal**: Người dùng xem tổng thu, tổng chi, số dư trong kỳ, và phân bổ danh mục theo ngày/tuần/tháng với điều hướng tiến/lùi.

**Independent Test**: Tạo vài giao dịch ở Phase 3 rồi vào `/dashboard` → xác nhận tổng thu/chi/số dư khớp. Chuyển chế độ tuần/tháng → numbers cập nhật đúng. Không cần Categories page.

- [ ] T034 [US2] Implement `usePeriod` hook in `lib/hooks/usePeriod.ts`: state `{ mode: 'day'|'week'|'month', anchor: Date }` defaulting to current month; expose `period`, `resolvedPeriod`, `periodLabel`, `navigate(direction: 1 | -1)`, `setMode(mode)`
- [ ] T035 [P] [US2] Build `components/dashboard/PeriodNavigator.tsx`: mode selector tabs (Ngày / Tuần / Tháng), prev/next arrow buttons, current period label display; calls `setMode` and `navigate` from `usePeriod`
- [ ] T036 [P] [US2] Build `components/dashboard/SummaryCards.tsx`: three cards — Tổng thu (green), Tổng chi (red), Số dư trong kỳ (blue if positive, red if negative); amounts formatted with `formatVND`; accepts `{ totalIncome, totalExpense, balance }` props
- [ ] T037 [US2] Build `components/dashboard/CategoryBreakdown.tsx` (depends on T021): renders `categoryBreakdown[]` as list; each row: category name, formatted amount, percentage, progress bar (width = `percentage%`); empty state "Chưa có chi tiêu trong kỳ" when list is empty
- [ ] T038 [US2] Create `app/dashboard/page.tsx` (depends on T034–T037): uses `useTransactions`, `useCategories`, `usePeriod`; computes aggregation via `aggregateByPeriod`; renders `PeriodNavigator` + `SummaryCards` + `CategoryBreakdown`; empty state "Chưa có giao dịch trong kỳ" when no transactions in period
- [ ] T039 [P] [US2] Write integration tests for Dashboard in `__tests__/integration/Dashboard.test.tsx`: correct totals for date/week/month mode; navigate to prev period updates numbers; empty period shows empty state message; balance is negative when expense > income

**Checkpoint**: Navigate to `/dashboard`, verify tổng thu/chi/số dư đúng với giao dịch đã tạo ở US1. Chuyển chế độ ngày/tuần/tháng. Nhấn prev/next → numbers cập nhật.

---

## Phase 5: User Story 3 — Manage Categories (Priority: P3)

**Goal**: Người dùng tạo, sửa, xoá danh mục tuỳ chỉnh; xoá danh mục đang dùng reassigns transactions sang "Không phân loại".

**Independent Test**: Tạo danh mục "Cafe" → xuất hiện trong dropdown của `TransactionForm`. Xoá danh mục đang dùng → transactions được reassign. Không ảnh hưởng US1/US2.

- [ ] T040 [P] [US3] Build `components/categories/CategoryForm.tsx`: fields — name (1–50 chars, unique validation), type (Thu/Chi/Cả hai); submit creates or updates category; shows error if name already exists
- [ ] T041 [US3] Build `components/categories/CategoryList.tsx` (depends on T021, T040): list all categories grouped by type (Thu / Chi); each row: name, type badge, edit and delete buttons; default categories show lock icon (cannot delete name, can delete custom only with confirmation); delete protected `cat-default-unclassified` is disabled
- [ ] T042 [US3] Create `app/categories/page.tsx` (depends on T040–T041): uses `useCategories`; delete confirmation modal shows count of affected transactions; on confirm calls `deleteCategory` (which reassigns orphaned transactions in storage layer)
- [ ] T043 [P] [US3] Write integration tests for category management in `__tests__/integration/CategoryManagement.test.tsx`: create category appears in dropdown; delete category with transactions reassigns to unclassified; cannot delete cat-default-unclassified; duplicate name validation

**Checkpoint**: Navigate to `/categories`, create "Cafe", go to `/transactions` and create a transaction using "Cafe". Return to `/categories`, delete "Cafe" → confirm modal shows "1 giao dịch sẽ được chuyển sang Không phân loại". After confirm, verify transaction's category updated.

---

## Phase 6: User Story 4 — Filter, Search & Export CSV (Priority: P4)

**Goal**: Người dùng lọc giao dịch theo danh mục/loại/khoảng ngày, tìm theo ghi chú, và export CSV UTF-8 (chứa đúng filter đang active).

**Independent Test**: Tạo 5 giao dịch ở nhiều danh mục. Lọc theo "Ăn uống" → chỉ thấy đúng loại. Tìm kiếm từ khoá → kết quả đúng. Export CSV → mở bằng Excel hiển thị tiếng Việt đúng.

- [ ] T044 [US4] Implement CSV export utility in `lib/utils/export.ts`: `exportToCSV(transactions: Transaction[], categories: Category[]): void` — UTF-8 BOM + CRLF line endings; columns: Ngày (dd/MM/yyyy), Loại (Thu/Chi), Danh mục (resolved name), Số tiền (integer), Ghi chú (double-quoted, `"` escaped as `""`, newlines stripped); filename `expense-tracker-YYYY-MM-DD.csv`; no-op if array empty
- [ ] T045 [US4] Add filter + search state to `useTransactions` hook in `lib/hooks/useTransactions.ts`: expose `filters` state `{ categoryId?, type?, dateFrom?, dateTo?, keyword? }`, `setFilters()`, `filteredTransactions` (derived from `transactions` + `filters`); search matches `note` field case-insensitively
- [ ] T046 [US4] Build `components/transactions/TransactionFilters.tsx` (depends on T021–T023): filter bar with — category multi-select (or single), type toggle (All/Thu/Chi), date-from + date-to inputs, keyword search input; "Xoá bộ lọc" reset button; disabled Export button when `filteredTransactions` is empty
- [ ] T047 [US4] Update `app/transactions/page.tsx` (depends on T044–T046): add `TransactionFilters` above `TransactionList`; pass `filteredTransactions` to `TransactionList`; wire Export CSV button to `exportToCSV(filteredTransactions, categories)`
- [ ] T048 [P] [US4] Write unit tests for `lib/utils/export.ts` in `__tests__/unit/lib/export.test.ts`: UTF-8 BOM present; correct column headers; comma in note is safely quoted; `"` in note is escaped as `""`; Vietnamese characters preserved; empty array produces no output
- [ ] T049 [P] [US4] Write unit tests for filter logic in `useTransactions` in `__tests__/unit/hooks/useTransactions.test.ts` (extend existing file): filter by categoryId; filter by type; filter by date range; keyword search on note; combined filters; empty result set

**Checkpoint**: At `/transactions`, apply category filter → correct subset shown. Type keyword in search → live results. Click Export CSV → file downloads. Open in Excel → columns correct, tiếng Việt hiển thị đúng. Export disabled when no results.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: UX consistency, edge cases, and final validation

- [ ] T050 [P] Add empty state UI to `app/transactions/page.tsx`: "Chưa có giao dịch nào. Nhấn + để thêm mới." when `transactions` is empty
- [ ] T051 [P] Add localStorage error boundary: if `readKey` returns parse error on startup, show non-blocking toast/banner "Không thể đọc dữ liệu. Vui lòng xoá cache và thử lại." in `app/layout.tsx`
- [ ] T052 [P] Add amount display max-width guard in `components/transactions/TransactionList.tsx` and `components/dashboard/SummaryCards.tsx`: amounts ≥ 1,000,000,000 truncate with tooltip showing full value
- [ ] T053 [P] Validate future-date transactions display correctly on Dashboard: transaction dated tomorrow appears in "Tháng" view but not in "Hôm nay" view if today ≠ tomorrow
- [ ] T054 [P] Add `<title>` metadata to each page: "Dashboard | Expense Tracker", "Giao dịch | Expense Tracker", "Danh mục | Expense Tracker" using Next.js `metadata` export
- [ ] T055 Run `npm test` full suite — all tests pass
- [ ] T056 Run `npm run lint` — zero lint errors
- [ ] T057 Run `npm run build` — production build succeeds with zero TypeScript errors
- [ ] T058 Manual smoke test per `quickstart.md`: create transaction, view dashboard, manage categories, export CSV, verify tiếng Việt in CSV

**Checkpoint**: `npm test && npm run lint && npm run build` all pass. Manual smoke test complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Requires Phase 1 — **BLOCKS all user stories**
- **Phase 3 (US1)**: Requires Phase 2 — MVP deliverable
- **Phase 4 (US2)**: Requires Phase 2 + Phase 3 (uses `useTransactions` + `useCategories`)
- **Phase 5 (US3)**: Requires Phase 2 + Phase 3 (uses `useTransactions`, needs categories in dropdown)
- **Phase 6 (US4)**: Requires Phase 3 (extends `useTransactions` and `app/transactions/page.tsx`)
- **Phase 7 (Polish)**: Requires all user story phases

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependencies on other stories
- **US2 (P2)**: Can start after Phase 2 — reads from `useTransactions`/`useCategories` created in US1 (hooks must exist first)
- **US3 (P3)**: Can start after Phase 2 — integrates with `useCategories` from US1
- **US4 (P4)**: Can start after US1 — extends `useTransactions` hook and transactions page

### Within Each User Story

- Hooks → UI primitives (parallel) → Composite components → Pages
- Tests marked [P] can run in parallel with each other

---

## Parallel Execution Examples

### Phase 2 Foundational (all parallel after T009)

```
T009 lib/types.ts
  ├─ T010 [P] lib/storage/index.ts
  ├─ T013 [P] lib/utils/currency.ts  ──► T016 [P] currency.test.ts
  ├─ T014 [P] lib/utils/date.ts      ──► T017 [P] date.test.ts
  └─ T015 [P] lib/utils/aggregation.ts ► T018 [P] aggregation.test.ts
T010 ──► T011 lib/storage/categories.ts
T010 ──► T012 lib/storage/transactions.ts
```

### Phase 3 US1 (parallel UI primitives)

```
T019 useCategories.ts
T020 useTransactions.ts
T021 [P] Button.tsx ─────────────────────────────────────┐
T022 [P] Input.tsx  ──────────────────────────────────┐  │
T023 [P] Select.tsx ───────────────────────────────┐  │  │
T024 [P] Modal.tsx  ────────────────────────────┐  │  │  │
                                                └──┴──┴──┴──► T025 TransactionForm.tsx
                                                           └──► T026 TransactionList.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (~30 min)
2. Complete Phase 2: Foundational (~2–3h)
3. Complete Phase 3: US1 Record a Transaction (~3–4h)
4. **STOP and VALIDATE**: Create/edit/delete transactions at `/transactions`
5. Demo-ready MVP

### Incremental Delivery

| After Phase | What works | Demo-able? |
|---|---|---|
| Phase 1–2 | Types + storage + utils | No |
| Phase 3 | Create/edit/delete transactions | ✅ Yes (MVP) |
| Phase 4 | + Dashboard with period view | ✅ Yes |
| Phase 5 | + Category management | ✅ Yes |
| Phase 6 | + Filter, search, CSV export | ✅ Yes (v1 complete) |
| Phase 7 | Polish + all tests pass | ✅ Production-ready |

---

## Notes

- `[P]` tasks operate on different files — safe to parallelize
- `[US?]` label maps each task to its user story for traceability
- localStorage is only touched via `lib/storage/` — never directly in components or hooks
- All amounts are integers in VND throughout; format only at display layer
- `crypto.randomUUID()` for all IDs — no external package needed
- Commit after each checkpoint (7 natural commit points)
