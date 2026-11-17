import { Link } from 'react-router-dom'
import { BookOpen, ChartColumn, Download, Plus, School, Users } from 'lucide-react'
import { COMING_SOON } from '../../../constants/navigation.js'

const ACTIONS = [
  { label: 'Thêm sinh viên', icon: Plus, to: '/students/new' },
  { label: 'Danh sách sinh viên', icon: Users, to: '/students' },
  { label: 'Quản lý lớp học', icon: School, to: '/classes' },
  { label: 'Quản lý môn học', icon: BookOpen, to: null },
  { label: 'Báo cáo thống kê', icon: ChartColumn, to: null },
  { label: 'Xuất dữ liệu', icon: Download, to: null },
]

const tile =
  'flex h-[86px] flex-col justify-center gap-2.5 rounded-lg border border-line bg-page px-3 text-left text-[13px] text-ink transition-colors'

export default function QuickActions() {
  return (
    <section className="flex w-[550px] shrink-0 flex-col gap-3 rounded-xl border border-line bg-white p-5">
      <div>
        <h2 className="text-[16px] leading-[22px] font-semibold text-ink-strong">Thao tác nhanh</h2>
        <p className="mt-[3px] text-[12px] leading-[17px] text-muted">Truy cập các chức năng thường dùng</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map(({ label, icon: Icon, to }) =>
          to ? (
            <Link key={label} to={to} className={`${tile} hover:border-primary hover:bg-tint`}>
              <Icon size={20} className="text-primary" />
              {label}
            </Link>
          ) : (
            <button key={label} type="button" title={COMING_SOON} aria-disabled="true" className={`${tile} cursor-default`}>
              <Icon size={20} className="text-primary" />
              {label}
            </button>
          ),
        )}
      </div>
    </section>
  )
}
