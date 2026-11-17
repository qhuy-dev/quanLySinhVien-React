// Panel phải: "Lưu ý khi tạo lớp học" (Thêm) / "Thông tin hiện tại" (Sửa)
export function CreateClassTips() {
  return (
    <aside className="rounded-[10px] bg-tint p-6">
      <h3 className="text-[16px] leading-6 font-semibold text-ink-strong">Lưu ý khi tạo lớp học</h3>
      <p className="mt-3 text-[13px] leading-5 font-medium text-primary">Thiết lập lớp học chính xác</p>
      <p className="mt-[22px] text-[22px] leading-[33px] font-semibold text-ink-strong">01</p>
      <p className="mt-1 text-[13px] leading-5 text-secondary">Kiểm tra mã lớp để tránh trùng lặp.</p>
      <p className="mt-6 text-[22px] leading-[33px] font-semibold text-ink-strong">02</p>
      <p className="mt-1 text-[13px] leading-5 text-secondary">Chọn đúng khoa và khóa học trước khi lưu.</p>
      <p className="mt-9 text-[12px] leading-[18px] text-muted">Bạn có thể bổ sung sinh viên sau khi tạo lớp.</p>
    </aside>
  )
}

export function CurrentClassInfo({ cls, size }) {
  return (
    <aside className="min-h-[360px] rounded-[10px] bg-tint p-6">
      <h3 className="text-[16px] leading-6 font-semibold text-ink-strong">Thông tin hiện tại</h3>
      <p className="mt-3 text-[13px] leading-5 font-medium text-primary">{cls.id}</p>
      <p className="mt-6 text-[32px] leading-[45px] font-semibold text-ink-strong">
        {size} / {cls.maxSize}
      </p>
      <p className="text-[13px] leading-5 text-secondary">Sinh viên đang theo học</p>
      <p className="mt-5 text-[13px] leading-5 text-ink-strong">Không thể đặt sĩ số tối đa thấp hơn số sinh viên hiện tại.</p>
      <p className="mt-9 text-[13px] leading-5 text-secondary">Thay đổi khoa phụ trách không làm thay đổi danh sách sinh viên.</p>
    </aside>
  )
}
