# Contract: CSV Export Format

**Branch**: `001-expense-tracker-app` | **Date**: 2026-04-15

## Overview

Defines the exact format of the CSV file produced by the export feature (FR-014, FR-015). Any change to this format is a breaking change for users who have existing import pipelines (e.g., Excel macros).

---

## File Properties

| Property | Value |
|---|---|
| Encoding | UTF-8 with BOM (`\uFEFF` prefix) |
| Line ending | `\r\n` (CRLF) for maximum Excel compatibility |
| Delimiter | `,` (comma) |
| MIME type | `text/csv;charset=utf-8;` |
| Filename pattern | `expense-tracker-YYYY-MM-DD.csv` (date of export) |

---

## Columns

| # | Header | Source field | Format | Notes |
|---|---|---|---|---|
| 1 | `Ngày` | `transaction.date` | `dd/MM/yyyy` | e.g. `15/04/2026` |
| 2 | `Loại` | `transaction.type` | `Thu` or `Chi` | Human-readable Vietnamese |
| 3 | `Danh mục` | `category.name` | Plain string | Resolved from categoryId |
| 4 | `Số tiền` | `transaction.amount` | Integer, no formatting | e.g. `85000` (not `85,000`) |
| 5 | `Ghi chú` | `transaction.note` | Quoted string | Always double-quoted; internal `"` escaped as `""` |

---

## Example Output

```
Ngày,Loại,Danh mục,Số tiền,Ghi chú
15/04/2026,Chi,Ăn uống,85000,"Phở bò"
15/04/2026,Thu,Lương,15000000,"Lương tháng 4"
14/04/2026,Chi,Di chuyển,45000,""
13/04/2026,Chi,Ăn uống,120000,"Tiệc sinh nhật, bạn bè"
```

---

## Escaping Rules

- The `Ghi chú` column is always wrapped in double-quotes
- Any `"` character within the note is escaped as `""`
- Commas within the note are safe because the field is quoted
- Newlines within the note are stripped (replace `\n` with space)

---

## Row Order

Rows appear in the same order as the currently displayed transaction list (after any active filters/search are applied), which is: **date descending, then createdAt descending**.

---

## Empty Export

If the filtered transaction list is empty, export is disabled (button greyed out). No file is generated.
