import { MOCK_STUDENTS } from '../data/mock/students.js'
import { MOCK_CLASSES } from '../data/mock/classes.js'
import { seedActivities } from '../data/mock/dashboard.js'

const KEY = 'sms:data:v1'

export function seedData() {
  return { students: MOCK_STUDENTS, classes: MOCK_CLASSES, activities: seedActivities() }
}

// Trả về dữ liệu đã lưu; nạp mock data ở lần chạy đầu. Ném lỗi nếu dữ liệu hỏng.
export function loadData() {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    const data = seedData()
    saveData(data)
    return data
  }
  const data = JSON.parse(raw)
  if (!Array.isArray(data?.students) || !Array.isArray(data?.classes)) {
    throw new Error('Dữ liệu lưu trữ không hợp lệ.')
  }
  return { activities: [], ...data }
}

export function saveData(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export function resetData() {
  localStorage.removeItem(KEY)
}
