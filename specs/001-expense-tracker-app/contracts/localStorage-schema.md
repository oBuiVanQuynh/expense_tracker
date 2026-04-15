# Contract: localStorage Schema

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15

## Overview

All application data is stored client-side in the browser's `localStorage`. There is no server API. This document defines the storage contract that all `lib/storage/` modules must adhere to.

---

## Keys

### `expense_tracker_transactions`

Stores the full array of all transactions.

**Type**: `string` (JSON-serialized `Transaction[]`)

**Example value**:
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "type": "expense",
    "amount": 85000,
    "categoryId": "cat-default-food",
    "date": "2026-04-15",
    "note": "Phở bò",
    "createdAt": "2026-04-15T08:30:00.000Z",
    "updatedAt": "2026-04-15T08:30:00.000Z"
  }
]
```

**Invariants**:
- Array must never contain duplicate `id` values
- `amount` is always a positive integer ≤ 10,000,000,000
- `date` is always `YYYY-MM-DD` format
- `categoryId` always references a category that exists in `expense_tracker_categories`
- Missing key → treated as empty array `[]`

---

### `expense_tracker_categories`

Stores the full array of all categories (defaults + custom).

**Type**: `string` (JSON-serialized `Category[]`)

**Example value**:
```json
[
  {
    "id": "cat-default-food",
    "name": "Ăn uống",
    "type": "expense",
    "isDefault": true,
    "createdAt": "2026-04-15T00:00:00.000Z"
  },
  {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "Cafe",
    "type": "expense",
    "isDefault": false,
    "createdAt": "2026-04-15T09:00:00.000Z"
  }
]
```

**Invariants**:
- Must always contain `cat-default-unclassified` (cannot be removed)
- Array must never contain duplicate `id` or duplicate `name` (case-insensitive)
- Missing key or empty array → trigger default seed before any read
- `isDefault: true` records are seeded once; never re-seeded if key already exists

---

## Read/Write Protocol

All storage access goes through `lib/storage/` modules. Direct `localStorage.getItem/setItem` calls are forbidden outside these modules.

```
Read:  getItem(key) → JSON.parse() → typed array  (return [] on null or parse error)
Write: JSON.stringify(array) → setItem(key, value)
```

**Error handling**: If `JSON.parse` throws (corrupted data), log warning and return empty array. Do not throw to the UI.

---

## Size Budget

| Key | Estimated size | Notes |
|---|---|---|
| `expense_tracker_transactions` | ~200 KB at 1000 records | 200 bytes/record average |
| `expense_tracker_categories` | ~5 KB | ~25 categories max typical |
| **Total** | ~205 KB | Well within 5 MB localStorage limit |
