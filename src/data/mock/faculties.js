export const FACULTIES = [
  { id: 'cntt', name: 'Công nghệ thông tin' },
  { id: 'qtkd', name: 'Quản trị kinh doanh' },
  { id: 'mkt', name: 'Marketing' },
  { id: 'kt', name: 'Kế toán' },
  { id: 'nna', name: 'Ngôn ngữ Anh' },
  { id: 'tcnh', name: 'Tài chính – Ngân hàng' },
]

export const FACULTY_OPTIONS = FACULTIES.map((f) => ({ value: f.id, label: f.name }))

export function facultyName(id) {
  return FACULTIES.find((f) => f.id === id)?.name ?? '—'
}

// Khóa học (K2022…) và niên khóa tương ứng
export const COURSES = [2021, 2022, 2023, 2024, 2025, 2026].map((y) => ({
  value: `K${y}`,
  label: `K${y}`,
  years: `${y} – ${y + 4}`,
}))

export const COURSE_OPTIONS = COURSES.map(({ value, label }) => ({ value, label }))
export const COHORT_OPTIONS = COURSES.map((c) => ({ value: c.years, label: c.years }))

export function cohortOfCourse(course) {
  return COURSES.find((c) => c.value === course)?.years ?? ''
}
