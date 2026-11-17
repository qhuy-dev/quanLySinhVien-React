import { CircleCheck, GraduationCap, Pause, Users } from 'lucide-react'
import StatCard from '../../../components/ui/StatCard.jsx'
import { formatNumber, formatPercent } from '../../../utils/format.js'

export default function StudentStats({ students }) {
  const total = students.length
  const count = (st) => students.filter((s) => s.status === st).length
  const pct = (n) => `${formatPercent(total ? n / total : 0, 2)} tổng số sinh viên`
  const studying = count('studying')
  const graduated = count('graduated')
  const reserved = count('reserved')

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Tổng số sinh viên" value={formatNumber(total)} sub="Toàn trường" icon={Users} />
      <StatCard label="Đang học" value={formatNumber(studying)} sub={pct(studying)} icon={CircleCheck} />
      <StatCard label="Đã tốt nghiệp" value={formatNumber(graduated)} sub={pct(graduated)} icon={GraduationCap} />
      <StatCard label="Đang bảo lưu" value={formatNumber(reserved)} sub={pct(reserved)} icon={Pause} />
    </div>
  )
}
