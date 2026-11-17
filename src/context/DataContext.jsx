import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { loadData, saveData } from '../services/storage.js'
import { todayISO } from '../utils/format.js'

const DataContext = createContext(null)

const LOAD_DELAY = 400 // giả lập độ trễ tải để hiển thị trạng thái "Đang tải"
const MAX_ACTIVITIES = 20

// Ghi thêm một mục vào "Hoạt động gần đây"
const log = (prev, type, title, description) => ({
  ...prev,
  activities: [
    { id: crypto.randomUUID(), type, title, description, createdAt: new Date().toISOString() },
    ...prev.activities,
  ].slice(0, MAX_ACTIVITIES),
})

export function DataProvider({ children }) {
  const [data, setData] = useState({ students: [], classes: [], activities: [] })
  const [status, setStatus] = useState('loading') // loading | ready | error
  const loaded = useRef(false)

  const load = useCallback(() => {
    setStatus('loading')
    const t = setTimeout(() => {
      try {
        setData(loadData())
        loaded.current = true
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    }, LOAD_DELAY)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => load(), [load])

  useEffect(() => {
    if (loaded.current) saveData(data)
  }, [data])

  const nextStudentId = useCallback(() => {
    const max = data.students.reduce((m, s) => Math.max(m, Number(s.id.replace(/\D/g, '')) || 0), 2024000)
    return `SV${max + 1}`
  }, [data.students])

  const actions = useMemo(
    () => ({
      addStudent: (student) =>
        setData((p) => log({ ...p, students: [student, ...p.students] }, 'student-add', student.fullName, 'Đã thêm sinh viên mới')),
      updateStudent: (student) =>
        setData((p) =>
          log(
            { ...p, students: p.students.map((s) => (s.id === student.id ? student : s)) },
            'student-update',
            student.fullName,
            'Cập nhật thông tin sinh viên',
          ),
        ),
      deleteStudent: (id) =>
        setData((p) => {
          const s = p.students.find((x) => x.id === id)
          return log({ ...p, students: p.students.filter((x) => x.id !== id) }, 'student-delete', s?.fullName ?? id, 'Đã xóa sinh viên')
        }),
      addClass: (cls) =>
        setData((p) =>
          log({ ...p, classes: [...p.classes, { ...cls, establishedAt: todayISO() }] }, 'class-add', `Lớp ${cls.id}`, 'Đã thêm lớp học mới'),
        ),
      updateClass: (cls) =>
        setData((p) => {
          // Đổi niên khóa của lớp -> cập nhật khóa học của sinh viên thuộc lớp
          const students = p.students.map((s) => (s.classId === cls.id ? { ...s, cohort: cls.cohort } : s))
          return log(
            { ...p, students, classes: p.classes.map((c) => (c.id === cls.id ? cls : c)) },
            'class-update',
            `Lớp ${cls.id}`,
            'Cập nhật thông tin lớp học',
          )
        }),
      deleteClass: (id) =>
        setData((p) => log({ ...p, classes: p.classes.filter((c) => c.id !== id) }, 'class-delete', `Lớp ${id}`, 'Đã xóa lớp học')),
    }),
    [],
  )

  const classSizes = useMemo(() => {
    const m = {}
    for (const s of data.students) m[s.classId] = (m[s.classId] || 0) + 1
    return m
  }, [data.students])

  const value = useMemo(
    () => ({ ...data, status, retry: load, classSizes, nextStudentId, ...actions }),
    [data, status, load, classSizes, nextStudentId, actions],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
