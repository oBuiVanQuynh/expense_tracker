# Quickstart: Expense Tracker App

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | 20+ | `node -v` |
| npm | 10+ | `npm -v` |

## 1. Install Dependencies

```bash
npm install
npm install date-fns
```

> `date-fns` is the only new runtime dependency added by this feature (period arithmetic + date formatting).

## 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`.

## 3. Run Tests

```bash
# Unit + integration tests
npm test

# Watch mode
npm test -- --watch
```

> Tests use Jest + React Testing Library. localStorage is mocked globally in `jest.setup.ts`.

## 4. Build for Production

```bash
npm run build
npm run start
```

## Project Layout (quick reference)

```
app/              → Next.js pages (App Router)
components/       → React components (by feature domain)
lib/
  types.ts        → Transaction, Category, Period interfaces
  storage/        → localStorage CRUD (only place allowed to touch localStorage)
  utils/          → Pure functions (aggregation, currency, date, export)
  hooks/          → React hooks (useTransactions, useCategories, usePeriod)
__tests__/        → Jest tests (unit + integration)
specs/            → Feature specs, plans, data models (documentation only)
```

## Key Conventions

- **localStorage access**: Only through `lib/storage/` — never call `localStorage` directly in components or hooks.
- **Amounts**: Always stored and computed as integers (VND). Format for display only using `lib/utils/currency.ts`.
- **Dates**: Stored as `YYYY-MM-DD` strings. Use `date-fns` for all arithmetic. Never construct `Date` objects from date strings manually (timezone pitfalls).
- **IDs**: Always `crypto.randomUUID()`. Never use timestamps or incrementing integers.
- **Category deletion**: Always reassign orphaned transactions to `cat-default-unclassified` before deleting a category.

## Data Reset (Development)

To clear all app data from the browser:

```js
// In browser DevTools console:
localStorage.removeItem('expense_tracker_transactions');
localStorage.removeItem('expense_tracker_categories');
location.reload(); // Triggers default category seeding
```

## Adding a New Default Category

1. Add entry to the `DEFAULT_CATEGORIES` array in `lib/storage/categories.ts`
2. Give it a fixed `id` prefixed with `cat-default-`
3. Set `isDefault: true`
4. Note: existing users who already have the categories key will **not** receive the new default automatically (by design — seeding runs only once)
