// Trạng thái sinh viên — badge theo Figma "04 · Trạng thái sinh viên"
export const STUDENT_STATUS = {
  studying: { label: 'Đang học', bg: 'bg-success-tint', text: 'text-success', dot: 'bg-success', chart: '#2563eb' },
  reserved: { label: 'Bảo lưu', bg: 'bg-amber-tint', text: 'text-amber-text', dot: 'bg-amber-text', chart: '#f59e0b' },
  graduated: { label: 'Đã tốt nghiệp', bg: 'bg-tint', text: 'text-primary', dot: 'bg-primary', chart: '#22c55e' },
  suspended: { label: 'Đình chỉ', bg: 'bg-danger-tint', text: 'text-danger', dot: 'bg-danger', chart: '#94a3b8' },
}

export const STUDENT_STATUS_OPTIONS = Object.entries(STUDENT_STATUS).map(([value, s]) => ({
  value,
  label: s.label,
}))

// Trạng thái lớp học
export const CLASS_STATUS = {
  active: { label: 'Đang hoạt động', bg: 'bg-green-tint', text: 'text-green' },
  inactive: { label: 'Ngừng hoạt động', bg: 'bg-field-disabled', text: 'text-secondary' },
}

export const CLASS_STATUS_OPTIONS = Object.entries(CLASS_STATUS).map(([value, s]) => ({
  value,
  label: s.label,
}))

export const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
]

export const PAGE_SIZE_OPTIONS = [10, 20, 50]
