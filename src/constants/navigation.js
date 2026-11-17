import {
  BookOpen,
  ChartColumn,
  LayoutGrid,
  School,
  Settings,
  SquareCheck,
  Users,
  ChartNoAxesColumn,
} from 'lucide-react'

// `to: null` = chức năng ngoài phạm vi, hiển thị theo thiết kế nhưng chưa điều hướng
export const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/', end: true },
  { label: 'Quản lý sinh viên', icon: Users, to: '/students' },
  { label: 'Quản lý lớp học', icon: School, to: '/classes' },
  { label: 'Quản lý môn học', icon: BookOpen, to: null },
  { label: 'Quản lý điểm', icon: ChartColumn, to: null },
  { label: 'Quản lý điểm danh', icon: SquareCheck, to: null },
  { label: 'Báo cáo thống kê', icon: ChartNoAxesColumn, to: null },
  { label: 'Cài đặt', icon: Settings, to: null },
]

export const HOME_LABEL = 'Dashboard'
export const COMING_SOON = 'Chức năng đang được phát triển'
