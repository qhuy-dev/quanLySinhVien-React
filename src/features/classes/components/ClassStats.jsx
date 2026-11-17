import { LayoutGrid, School, SquareCheck, Users } from 'lucide-react'
import StatCard from '../../../components/ui/StatCard.jsx'
import { FACULTIES } from '../../../data/mock/faculties.js'
import { formatNumber } from '../../../utils/format.js'

export default function ClassStats({ classes, students }) {
  const active = classes.filter((c) => c.status === 'active').length
  const inactive = classes.length - active
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard variant="class" label="Tổng số lớp" value={formatNumber(classes.length)} sub="Tất cả các khóa học" icon={School} tone="blue" />
      <StatCard variant="class" label="Tổng sinh viên" value={formatNumber(students.length)} sub="Sinh viên thuộc các lớp" icon={Users} tone="violet" />
      <StatCard variant="class" label="Khoa đang quản lý" value={formatNumber(FACULTIES.length)} sub="Khoa và đơn vị đào tạo" icon={LayoutGrid} tone="amber" />
      <StatCard variant="class" label="Lớp đang hoạt động" value={formatNumber(active)} sub={`${inactive} lớp ngừng hoạt động`} icon={SquareCheck} tone="green" />
    </div>
  )
}
