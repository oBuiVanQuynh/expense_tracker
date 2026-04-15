# Feature Specification: Expense Tracker App

**Feature Branch**: `001-expense-tracker-app`  
**Created**: 2026-04-15  
**Status**: Draft  
**Input**: User description: "Xây dựng ứng dụng theo dõi thu/chi, phân loại và báo cáo chi tiêu hằng tháng. Người dùng tạo Transactions (thu/chi), gắn Category, xem Dashboard theo ngày/tuần/tháng. Hỗ trợ lọc, tìm kiếm, và export CSV đơn giản."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Record a Transaction (Priority: P1)

Người dùng muốn ghi lại một khoản thu hoặc chi bằng cách điền số tiền, chọn loại (thu/chi), chọn danh mục, thêm ghi chú tuỳ chọn và lưu lại. Giao dịch xuất hiện ngay trong danh sách.

**Why this priority**: Đây là chức năng cốt lõi — không có giao dịch thì mọi tính năng khác đều vô nghĩa.

**Independent Test**: Có thể kiểm tra độc lập bằng cách tạo một giao dịch và xác nhận nó xuất hiện đúng trong danh sách với đầy đủ thông tin.

**Acceptance Scenarios**:

1. **Given** người dùng ở trang chính, **When** điền số tiền, chọn loại "chi", chọn danh mục "Ăn uống", nhấn Lưu, **Then** giao dịch xuất hiện trong danh sách với đúng số tiền, loại, và danh mục.
2. **Given** người dùng tạo giao dịch, **When** không điền số tiền, **Then** hệ thống hiển thị lỗi và không cho lưu.
3. **Given** người dùng tạo giao dịch, **When** điền số tiền âm hoặc bằng 0, **Then** hệ thống hiển thị lỗi.
4. **Given** người dùng tạo giao dịch, **When** không chọn ngày, **Then** hệ thống tự điền ngày hiện tại.

---

### User Story 2 - View Dashboard by Time Period (Priority: P2)

Người dùng muốn xem tổng quan thu chi theo ngày, tuần, hoặc tháng: tổng thu, tổng chi, số dư, và phân bổ theo danh mục.

**Why this priority**: Dashboard là lý do người dùng dùng ứng dụng — nó cho thấy bức tranh tổng thể về tài chính.

**Independent Test**: Có thể kiểm tra bằng cách tạo vài giao dịch rồi vào Dashboard xác nhận các con số tổng hợp khớp với dữ liệu đã nhập.

**Acceptance Scenarios**:

1. **Given** người dùng có giao dịch trong tháng, **When** vào Dashboard chọn chế độ "tháng", **Then** thấy tổng thu, tổng chi, số dư và phân bổ theo danh mục.
2. **Given** người dùng chọn chế độ "tuần", **When** chuyển sang tuần trước, **Then** dashboard cập nhật hiển thị dữ liệu của tuần đó.
3. **Given** không có giao dịch trong khoảng thời gian, **When** vào Dashboard, **Then** hiển thị thông báo "Chưa có giao dịch" thay vì số 0 trống.

---

### User Story 3 - Manage Categories (Priority: P3)

Người dùng muốn tạo, sửa, xoá danh mục tuỳ chỉnh để phân loại giao dịch theo nhu cầu cá nhân.

**Why this priority**: Danh mục mặc định đủ dùng cho MVP, nhưng tuỳ chỉnh giúp ứng dụng phù hợp với từng người dùng.

**Independent Test**: Có thể kiểm tra bằng cách tạo danh mục mới, gán vào giao dịch, xác nhận nó xuất hiện trong filter và dashboard.

**Acceptance Scenarios**:

1. **Given** người dùng ở trang quản lý danh mục, **When** tạo danh mục "Cafe" loại "chi", **Then** danh mục mới xuất hiện trong dropdown khi tạo giao dịch.
2. **Given** danh mục đang được gắn với giao dịch, **When** người dùng cố xoá danh mục đó, **Then** hệ thống cảnh báo và yêu cầu xác nhận.
3. **Given** người dùng xoá danh mục đang dùng và xác nhận, **Then** các giao dịch liên quan được chuyển sang danh mục "Không phân loại".

---

### User Story 4 - Filter, Search & Export (Priority: P4)

Người dùng muốn lọc giao dịch theo danh mục, loại (thu/chi), khoảng ngày; tìm kiếm theo ghi chú; và xuất kết quả ra file CSV.

**Why this priority**: Hữu ích để tra cứu và chia sẻ dữ liệu, nhưng không ảnh hưởng đến chức năng cốt lõi.

**Independent Test**: Có thể kiểm tra bằng cách lọc giao dịch theo danh mục, xác nhận kết quả đúng, rồi export CSV và mở bằng Excel/Google Sheets.

**Acceptance Scenarios**:

1. **Given** danh sách giao dịch, **When** lọc theo danh mục "Ăn uống", **Then** chỉ hiển thị giao dịch thuộc danh mục đó.
2. **Given** danh sách giao dịch, **When** nhập từ khoá vào ô tìm kiếm, **Then** chỉ hiển thị giao dịch có ghi chú chứa từ khoá.
3. **Given** người dùng đang xem danh sách (có filter), **When** nhấn "Export CSV", **Then** tải về file CSV chứa đúng dữ liệu đang hiển thị với các cột: Ngày, Loại, Danh mục, Số tiền, Ghi chú.
4. **Given** kết quả filter rỗng, **When** nhấn "Export CSV", **Then** nút bị vô hiệu hoá hoặc hiển thị thông báo không có dữ liệu.

---

### Edge Cases

- Điều gì xảy ra khi người dùng nhập số tiền quá lớn? → Hệ thống từ chối và hiển thị lỗi nếu vượt 10,000,000,000 VND.
- Giao dịch bị xoá (hard delete) sẽ không còn xuất hiện trong bất kỳ báo cáo hay Dashboard nào — không có cơ chế undo.
- File CSV export có xử lý đúng ký tự tiếng Việt (UTF-8) không?
- Nếu không có danh mục nào tồn tại, form tạo giao dịch hiển thị như thế nào?
- Người dùng tạo giao dịch với ngày ở tương lai — hệ thống có xử lý đúng trong Dashboard không?

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI cho phép người dùng tạo giao dịch với các thông tin: số tiền, loại (thu/chi), danh mục, ngày, ghi chú (tuỳ chọn).
- **FR-002**: Hệ thống PHẢI validate số tiền là số dương, bắt buộc nhập, và không vượt quá **10,000,000,000 VND (10 tỷ)**. Nhập số ngoài khoảng hợp lệ phải hiển thị thông báo lỗi cụ thể.
- **FR-003**: Hệ thống PHẢI tự động điền ngày hiện tại nếu người dùng không chọn.
- **FR-004**: Người dùng PHẢI có thể chỉnh sửa và xoá giao dịch đã tạo. Xoá là **hard delete** — giao dịch bị xoá hoàn toàn khỏi storage và không còn được tính vào Dashboard hay lịch sử báo cáo.
- **FR-005**: Hệ thống PHẢI hiển thị danh sách giao dịch sắp xếp theo ngày mới nhất trước.
- **FR-006**: Hệ thống PHẢI cung cấp Dashboard với tổng thu, tổng chi, và **số dư trong kỳ** (tổng thu − tổng chi) cho khoảng thời gian được chọn. Mỗi kỳ được tính độc lập, không tích luỹ từ lịch sử.
- **FR-007**: Dashboard PHẢI hỗ trợ 3 chế độ xem: ngày, tuần, tháng; và cho phép điều hướng tiến/lùi trong cùng chế độ.
- **FR-008**: Dashboard PHẢI hiển thị phân bổ chi tiêu theo danh mục dưới dạng **danh sách có progress bar** — mỗi danh mục hiển thị tên, tổng tiền, và phần trăm so với tổng chi trong khoảng thời gian đang xem. Không yêu cầu thư viện chart.
- **FR-009**: Hệ thống PHẢI đi kèm bộ danh mục mặc định cho cả thu và chi.
- **FR-010**: Người dùng PHẢI có thể tạo, sửa, xoá danh mục tuỳ chỉnh.
- **FR-011**: Khi xoá danh mục đang được dùng, hệ thống PHẢI chuyển giao dịch liên quan sang danh mục "Không phân loại".
- **FR-012**: Người dùng PHẢI có thể lọc danh sách giao dịch theo: danh mục, loại (thu/chi), khoảng ngày.
- **FR-013**: Người dùng PHẢI có thể tìm kiếm giao dịch theo từ khoá trong trường ghi chú.
- **FR-014**: Người dùng PHẢI có thể export danh sách giao dịch đang hiển thị ra file CSV với encoding UTF-8.
- **FR-015**: File CSV PHẢI chứa các cột: Ngày, Loại, Danh mục, Số tiền, Ghi chú.

### Key Entities

- **Transaction (Giao dịch)**: Đơn vị ghi nhận thu hoặc chi. Thuộc tính: số tiền, loại (thu/chi), danh mục, ngày, ghi chú. Là thực thể trung tâm của toàn ứng dụng.
- **Category (Danh mục)**: Nhãn phân loại giao dịch. Thuộc tính: tên, loại áp dụng (thu/chi/cả hai), cờ mặc định. Quan hệ 1-nhiều với Transaction.
- **Period (Khoảng thời gian)**: Tham số lọc cho Dashboard — một ngày, một tuần, hoặc một tháng cụ thể. Không lưu trữ.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Người dùng có thể tạo một giao dịch mới trong vòng dưới 30 giây kể từ khi mở form.
- **SC-002**: Dashboard hiển thị đúng tổng thu, tổng chi, và số dư trong kỳ (tổng thu − tổng chi) khớp 100% với tổng hợp thủ công từ dữ liệu giao dịch trong cùng khoảng thời gian.
- **SC-003**: Bộ lọc và tìm kiếm trả kết quả trong dưới 1 giây với ít nhất 500 giao dịch.
- **SC-004**: File CSV export mở được bình thường trên Excel và Google Sheets, hiển thị đúng tiếng Việt.
- **SC-005**: 90% người dùng mới có thể tạo giao dịch đầu tiên mà không cần hướng dẫn.
- **SC-006**: Danh sách giao dịch tải và hiển thị trong dưới 2 giây với ít nhất 1000 giao dịch.

---

## Clarifications

### Session 2026-04-15

- Q: Cơ chế lưu trữ dữ liệu cục bộ nào sẽ được dùng: localStorage hay IndexedDB? → A: localStorage
- Q: Khi xoá giao dịch, xoá hoàn toàn (hard delete) hay giữ lại ẩn (soft delete)? → A: Hard delete
- Q: Phân bổ chi tiêu theo danh mục trên Dashboard hiển thị dưới dạng nào? → A: Danh sách + progress bar (tên, tổng tiền, % so với tổng chi)
- Q: "Số dư" trên Dashboard được tính theo cách nào? → A: Số dư trong kỳ — Tổng thu − Tổng chi trong period đang xem, mỗi kỳ độc lập
- Q: Số tiền tối đa cho một giao dịch là bao nhiêu? → A: 10 tỷ VND (10,000,000,000 VND)

## Assumptions

- Ứng dụng dành cho một người dùng duy nhất (single-user); không có hệ thống đăng nhập/xác thực cho v1.
- Dữ liệu được lưu trữ trong **localStorage** của trình duyệt; không có backend server cho v1. Giới hạn ~5–10 MB đủ cho phạm vi v1 (vài trăm giao dịch).
- Đơn vị tiền tệ mặc định là VND; không hỗ trợ đa tiền tệ trong v1.
- Giao dịch có ngày ở tương lai được cho phép (ví dụ: ghi nhận hoá đơn trả trước).
- Ứng dụng chạy trên trình duyệt desktop hiện đại; responsive mobile là "nice-to-have" không bắt buộc cho v1.
- Danh mục mặc định bao gồm: Ăn uống, Di chuyển, Mua sắm, Giải trí, Hoá đơn/Tiện ích (chi); Lương, Thưởng, Đầu tư, Thu nhập khác (thu).
- Không có giới hạn số lượng giao dịch hoặc danh mục trong v1.
- Không yêu cầu import dữ liệu từ nguồn ngoài (chỉ export) trong v1.
