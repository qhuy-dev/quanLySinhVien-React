// Số liệu tĩnh theo Figma "02 · Dashboard" (không có dữ liệu lịch sử / môn học)
export const STUDENTS_BY_YEAR = [
  { year: '2022', value: 1820 },
  { year: '2023', value: 1975 },
  { year: '2024', value: 2100 },
  { year: '2025', value: 2264 },
  { year: '2026', value: 2450 },
]

export const SUBJECT_STATS = { total: 86, newThisYear: 6 }

// Hoạt động mẫu, thời gian tính lùi từ lúc khởi tạo dữ liệu
export function seedActivities(now = Date.now()) {
  const ago = (min) => new Date(now - min * 60000).toISOString()
  return [
    { id: 'a1', type: 'student-add', title: 'Nguyễn Minh Anh', description: 'Đã thêm sinh viên mới', createdAt: ago(5) },
    { id: 'a2', type: 'student-update', title: 'Trần Hoàng Nam', description: 'Cập nhật thông tin cá nhân', createdAt: ago(18) },
    { id: 'a3', type: 'class-update', title: 'Lớp LH001', description: 'Cập nhật danh sách lớp', createdAt: ago(45) },
    { id: 'a4', type: 'academic', title: 'Phòng đào tạo', description: 'Cập nhật kết quả học tập', createdAt: ago(60) },
  ]
}
