# Implementation Plan: Expense Tracker App

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-expense-tracker-app/spec.md`

## Summary

Xây dựng ứng dụng web theo dõi thu/chi cá nhân (single-user, offline-first) trên nền Next.js 16 + TypeScript + Tailwind CSS. Dữ liệu lưu trong localStorage. Người dùng tạo giao dịch (Transaction), gắn danh mục (Category), xem Dashboard tổng hợp theo ngày/tuần/tháng với phân bổ danh mục dạng progress bar, lọc/tìm kiếm, và export CSV.

## Technical Context

**Language/Version**: TypeScript 5 / Node.js 20  
**Framework**: Next.js 16.2.3 (App Router)  
**UI**: React 19 + Tailwind CSS v4  
**Storage**: localStorage (browser) — single-user, offline-first, no backend  
**Testing**: Jest + React Testing Library (unit & integration); Playwright (e2e optional)  
**Target Platform**: Modern desktop browsers (Chrome/Firefox/Edge/Safari latest-2)  
**Project Type**: Web application (single-page, client-side data)  
**Performance Goals**: Filter/search < 1s với 500+ giao dịch; list render < 2s với 1000 giao dịch  
**Constraints**: localStorage ~5–10 MB limit; offline-capable; no auth; max amount 10,000,000,000 VND  
**Scale/Scope**: Single user; ~4 pages/views; ~15 components; ~3 data entities

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No `constitution.md` found — no mandatory gates to check. Proceeding with standard quality guidelines:

- ✅ No unnecessary external backend dependencies (localStorage only)
- ✅ No over-engineering: single project, no monorepo needed
- ✅ Matches existing project stack (Next.js + TypeScript + Tailwind already bootstrapped)
- ✅ Offline-capable by design (no network calls for data)
- ✅ Performance goals measurable and realistic for localStorage scope

## Project Structure

### Documentation (this feature)

```text
specs/001-expense-tracker-app/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── localStorage-schema.md
│   └── csv-export-format.md
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                    # Root layout (existing)
├── globals.css                   # Global styles (existing)
├── page.tsx                      # Redirect → /dashboard
├── dashboard/
│   └── page.tsx                  # Dashboard view (ngày/tuần/tháng)
├── transactions/
│   ├── page.tsx                  # Transaction list + filter + search
│   └── [id]/
│       └── page.tsx              # Edit transaction
└── categories/
    └── page.tsx                  # Category management

lib/
├── types.ts                      # Shared TypeScript types (Transaction, Category, Period)
├── storage/
│   ├── index.ts                  # localStorage read/write helpers
│   ├── transactions.ts           # CRUD for transactions
│   └── categories.ts             # CRUD for categories + defaults
├── utils/
│   ├── currency.ts               # VND formatting, validation (max 10B)
│   ├── date.ts                   # Period helpers (day/week/month nav)
│   ├── aggregation.ts            # Sum, group-by-category for Dashboard
│   └── export.ts                 # CSV generation (UTF-8 BOM)
└── hooks/
    ├── useTransactions.ts        # React hook: transaction CRUD + filter/search
    ├── useCategories.ts          # React hook: category CRUD + defaults seed
    └── usePeriod.ts              # React hook: period state + navigation

components/
├── ui/                           # Generic reusable primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── Modal.tsx
├── transactions/
│   ├── TransactionForm.tsx       # Create/edit form
│   ├── TransactionList.tsx       # Sorted list with delete action
│   └── TransactionFilters.tsx    # Filter bar (category, type, date range)
├── dashboard/
│   ├── SummaryCards.tsx          # Tổng thu / Tổng chi / Số dư trong kỳ
│   ├── PeriodNavigator.tsx       # Day/Week/Month switcher + prev/next
│   └── CategoryBreakdown.tsx     # Progress bar list per category
└── categories/
    ├── CategoryList.tsx
    └── CategoryForm.tsx

public/                           # Static assets (existing)

__tests__/
├── unit/
│   ├── lib/
│   │   ├── aggregation.test.ts
│   │   ├── currency.test.ts
│   │   ├── date.test.ts
│   │   └── export.test.ts
│   └── hooks/
│       ├── useTransactions.test.ts
│       └── useCategories.test.ts
└── integration/
    ├── TransactionForm.test.tsx
    ├── Dashboard.test.tsx
    └── CategoryManagement.test.tsx
```

**Structure Decision**: Single Next.js web application (App Router). No backend, no API routes needed — all data operations are client-side via localStorage. Components split by feature domain. Pure utility functions in `lib/` are independently testable without React.

## Complexity Tracking

> No constitution violations to justify.
