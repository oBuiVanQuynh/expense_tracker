# Data Model: Expense Tracker App

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15

## Entities

---

### Transaction

Core entity. Represents a single income or expense event.

```ts
interface Transaction {
  id: string;              // crypto.randomUUID() — immutable after creation
  type: 'income' | 'expense';
  amount: number;          // Positive integer, VND. 1 ≤ amount ≤ 10_000_000_000
  categoryId: string;      // FK → Category.id. Required.
  date: string;            // ISO 8601 date string "YYYY-MM-DD". Required.
  note: string;            // Optional free text. Default: "". Max 500 chars.
  createdAt: string;       // ISO 8601 datetime, set at creation, immutable.
  updatedAt: string;       // ISO 8601 datetime, updated on edit.
}
```

**Validation rules**:
- `id`: non-empty string, unique across all transactions
- `type`: must be `'income'` or `'expense'`
- `amount`: integer > 0 and ≤ 10,000,000,000
- `categoryId`: must reference an existing `Category.id`
- `date`: valid `YYYY-MM-DD` string; future dates allowed
- `note`: string, max 500 characters
- `createdAt` / `updatedAt`: valid ISO datetime strings

**Lifecycle**:
- Created via `TransactionForm` → persisted to localStorage → hard delete only (no soft delete)
- Editing creates a new `updatedAt` timestamp; all other fields mutable except `id` and `createdAt`
- Deletion: permanently removed from array; Dashboard recalculates on next render

**Sort order**: By `date` descending, then `createdAt` descending (stable sort for same-day transactions)

---

### Category

Classification label for transactions.

```ts
interface Category {
  id: string;              // crypto.randomUUID() for custom; fixed slugs for defaults
  name: string;            // Display name. 1–50 chars. Unique (case-insensitive).
  type: 'income' | 'expense' | 'both';  // Which transaction types it applies to
  isDefault: boolean;      // true = shipped with app, false = user-created
  createdAt: string;       // ISO 8601 datetime
}
```

**Validation rules**:
- `id`: non-empty string, unique across all categories
- `name`: 1–50 characters, must be unique case-insensitively
- `type`: `'income'`, `'expense'`, or `'both'`
- `isDefault`: boolean, set at seed time, cannot be changed by user

**Default categories** (seeded on first load):

| id | name | type | isDefault |
|---|---|---|---|
| `cat-default-food` | Ăn uống | expense | true |
| `cat-default-transport` | Di chuyển | expense | true |
| `cat-default-shopping` | Mua sắm | expense | true |
| `cat-default-entertainment` | Giải trí | expense | true |
| `cat-default-bills` | Hoá đơn/Tiện ích | expense | true |
| `cat-default-health` | Sức khoẻ | expense | true |
| `cat-default-other-exp` | Khác (chi) | expense | true |
| `cat-default-salary` | Lương | income | true |
| `cat-default-bonus` | Thưởng | income | true |
| `cat-default-investment` | Đầu tư | income | true |
| `cat-default-sales` | Bán hàng | income | true |
| `cat-default-other-inc` | Thu nhập khác | income | true |
| `cat-default-unclassified` | Không phân loại | both | true |

**Deletion rules**:
- If category has no linked transactions: delete immediately
- If category has linked transactions: prompt confirmation → on confirm, reassign all linked transactions to `cat-default-unclassified`, then delete
- `cat-default-unclassified` is protected: cannot be deleted or renamed

---

### Period (value object — not persisted)

Used by Dashboard and filter logic. Not stored in localStorage.

```ts
interface Period {
  mode: 'day' | 'week' | 'month';
  anchor: Date;  // Start of the period (startOfDay/startOfWeek/startOfMonth)
}

// Derived:
interface ResolvedPeriod {
  start: Date;   // Inclusive
  end: Date;     // Inclusive (end of day/week/month)
  label: string; // e.g. "15/04/2026", "14/04 – 20/04/2026", "Tháng 4/2026"
}
```

---

## Relationships

```
Category 1 ──── N Transaction
  (categoryId FK)

Category "Không phân loại" ← receives orphaned transactions on category delete
```

---

## localStorage Schema

| Key | Type | Description |
|---|---|---|
| `expense_tracker_transactions` | `Transaction[]` JSON | All transactions |
| `expense_tracker_categories` | `Category[]` JSON | All categories (defaults + custom) |

**Initialization**:
1. On app load, read both keys
2. If `expense_tracker_categories` is `null` or empty array → seed defaults
3. If `expense_tracker_transactions` is `null` → initialize as `[]`

**Integrity rule**: Before any transaction write, validate `categoryId` exists in current categories. If not (e.g., corrupted state), assign `cat-default-unclassified`.

---

## Aggregation Model (Dashboard)

Given a `ResolvedPeriod { start, end }`:

```
filteredTransactions = transactions.filter(t => isWithinInterval(parseISO(t.date), { start, end }))

totalIncome  = sum(filteredTransactions where type === 'income', t.amount)
totalExpense = sum(filteredTransactions where type === 'expense', t.amount)
balance      = totalIncome - totalExpense   // "Số dư trong kỳ" (can be negative)

categoryBreakdown = filteredTransactions
  .filter(t => t.type === 'expense')
  .groupBy(t.categoryId)
  .map(group => ({
    categoryId,
    categoryName,
    total: sum(group, t.amount),
    percentage: (total / totalExpense) * 100  // 0 if totalExpense === 0
  }))
  .sort(desc by total)
```
