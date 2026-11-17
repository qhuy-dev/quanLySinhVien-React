# Student Management System

Giao diện quản lý sinh viên (React + Vite + Tailwind CSS), dựng theo thiết kế Figma.
Gồm 3 chức năng: **Dashboard**, **Quản lý sinh viên**, **Quản lý lớp học**.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production vào dist/
```

## Dữ liệu

- Không có backend. Lần chạy đầu, mock data (`src/data/mock/`) được nạp vào `localStorage` (khóa `sms:data:v1`).
- Thêm / sửa / xóa đều lưu vào `localStorage` và ghi vào "Hoạt động gần đây" trên Dashboard.
- Muốn khôi phục dữ liệu mẫu: xóa khóa `sms:data:v1` trong DevTools → Application → Local Storage rồi tải lại trang.

## Cấu trúc

```
src/
├─ components/   layout (Sidebar, Header…), ui (Button, Input, Select, Modal…), table (Pagination, trạng thái bảng…)
├─ features/     dashboard · students · classes (pages + components riêng)
├─ context/      DataContext (dữ liệu + localStorage) · ToastContext
├─ data/         mock data, ảnh đại diện
├─ hooks/        usePagination, useSelection
├─ constants/    trạng thái, điều hướng
└─ utils/        định dạng, kiểm tra dữ liệu, xuất CSV
```

## Quy tắc nghiệp vụ đã cài đặt

- Mã sinh viên tự sinh, không sửa được; mã lớp duy nhất (≤ 20 ký tự), khóa sau khi tạo.
- Lớp chỉ hiển thị theo khoa đã chọn; khóa học của sinh viên lấy theo niên khóa của lớp.
- Không thêm sinh viên vào lớp đã đủ sĩ số; sĩ số tối đa 1–200 và không thấp hơn sĩ số hiện tại.
- Không xóa được lớp còn sinh viên.
- "Xuất Excel" xuất file CSV (UTF-8 BOM, mở được bằng Excel).
