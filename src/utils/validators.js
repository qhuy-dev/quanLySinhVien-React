const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^0\d{9,10}$/

export function validateStudent(values) {
  const e = {}
  if (!values.fullName?.trim()) e.fullName = 'Vui lòng nhập họ và tên.'
  if (!values.dob) e.dob = 'Vui lòng chọn ngày sinh.'
  if (!values.gender) e.gender = 'Vui lòng chọn giới tính.'
  if (!values.email?.trim()) e.email = 'Vui lòng nhập email.'
  else if (!EMAIL_RE.test(values.email.trim())) e.email = 'Email không hợp lệ. Ví dụ: ten@sv.edu.vn'
  if (values.phone && !PHONE_RE.test(values.phone.replace(/\s/g, '')))
    e.phone = 'Số điện thoại không hợp lệ.'
  if (!values.facultyId) e.facultyId = 'Vui lòng chọn khoa.'
  if (!values.classId) e.classId = 'Vui lòng chọn lớp.'
  if (!values.cohort) e.cohort = 'Vui lòng chọn khóa học.'
  if (!values.enrollmentDate) e.enrollmentDate = 'Vui lòng chọn ngày nhập học.'
  if (!values.status) e.status = 'Vui lòng chọn trạng thái học tập.'
  return e
}

export function validateClass(values, { existingIds = [], isEdit = false, currentSize = 0 } = {}) {
  const e = {}
  const id = values.id?.trim() || ''
  if (!isEdit) {
    if (!id) e.id = 'Vui lòng nhập mã lớp.'
    else if (id.length > 20) e.id = 'Mã lớp tối đa 20 ký tự.'
    else if (existingIds.some((x) => x.toLowerCase() === id.toLowerCase())) e.id = 'Mã lớp đã tồn tại.'
  }
  if (!values.name?.trim()) e.name = 'Vui lòng nhập tên lớp học.'
  if (!values.facultyId) e.facultyId = 'Vui lòng chọn khoa phụ trách.'
  if (!values.course) e.course = 'Vui lòng chọn khóa học.'
  const max = Number(values.maxSize)
  if (!Number.isInteger(max) || max < 1 || max > 200) e.maxSize = 'Số nguyên từ 1 đến 200 sinh viên.'
  else if (max < currentSize) e.maxSize = `Sĩ số tối đa không thấp hơn số sinh viên hiện tại (${currentSize}).`
  return e
}

export const AVATAR_MAX_BYTES = 2 * 1024 * 1024
export const AVATAR_TYPES = ['image/jpeg', 'image/png']
