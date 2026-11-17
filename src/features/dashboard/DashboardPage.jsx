import { BookOpen, Plus, School, SquareCheck, Users } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import Button from '../../components/ui/Button.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import StudentsByYearChart from './components/StudentsByYearChart.jsx'
import StatusDonutChart from './components/StatusDonutChart.jsx'
import QuickActions from './components/QuickActions.jsx'
import RecentActivities from './components/RecentActivities.jsx'
import { STUDENTS_BY_YEAR, SUBJECT_STATS } from '../../data/mock/dashboard.js'
import { COMING_SOON } from '../../constants/navigation.js'
import { formatLongDate, formatNumber, formatPercent } from '../../utils/format.js'

// Năm học bắt đầu từ 01/08
function schoolYearStart(now = new Date()) {
  const y = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1
  return `${y}-08-01`
}

function Delta({ value, tone, children }) {
  return (
    <span className="flex gap-[5px]">
      <span className={`font-semibold ${tone}`}>{value}</span>
      <span className="text-muted">{children}</span>
    </span>
  )
}

export default function DashboardPage() {
  const { students, classes, activities, status } = useData()
  const ready = status === 'ready'
  const show = (v) => (ready ? v : '—')

  const since = schoolYearStart()
  const newStudents = students.filter((s) => s.enrollmentDate >= since).length
  const growth = students.length - newStudents ? newStudents / (students.length - newStudents) : 0
  const newClasses = classes.filter((c) => c.establishedAt >= since).length
  const studying = students.filter((s) => s.status === 'studying').length
  const currentYear = String(new Date().getFullYear())

  return (
    <div className="flex flex-col gap-5">
      {/* Lời chào quản trị viên */}
      <section className="flex min-h-[132px] items-center gap-5 rounded-xl border border-blue-border bg-tint p-6">
        <div className="flex-1">
          <h1 className="text-[26px] leading-[38px] font-semibold text-ink-strong">Xin chào, Admin!</h1>
          <p className="mt-[5px] text-[14px] leading-5 text-secondary">Chào mừng quay trở lại hệ thống quản lý sinh viên.</p>
          <p className="mt-[5px] text-[12px] leading-[17px] text-muted">Tổng quan hoạt động và dữ liệu đào tạo của bạn.</p>
        </div>
        <div className="flex flex-col items-end gap-3.5">
          <p className="text-[12px] leading-[17px] font-medium text-secondary">{formatLongDate()}</p>
          <div className="flex gap-2.5">
            <Button icon={Plus} to="/students/new">
              Thêm sinh viên
            </Button>
            <Button variant="secondary" title={COMING_SOON}>
              Xem báo cáo
            </Button>
          </div>
        </div>
      </section>

      {/* Chỉ số tổng quan */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          variant="dashboard"
          label="Tổng sinh viên"
          value={show(formatNumber(students.length))}
          sub={<Delta value={`+${formatPercent(growth)}`} tone="text-green">so với năm trước</Delta>}
          icon={Users}
          tone="blue"
        />
        <StatCard
          variant="dashboard"
          label="Tổng lớp học"
          value={show(formatNumber(classes.length))}
          sub={<Delta value={`+${newClasses} lớp`} tone="text-violet">trong năm học này</Delta>}
          icon={School}
          tone="violet"
        />
        <StatCard
          variant="dashboard"
          label="Tổng môn học"
          value={formatNumber(SUBJECT_STATS.total)}
          sub={<Delta value={`${SUBJECT_STATS.newThisYear} môn mới`} tone="text-amber">được mở năm nay</Delta>}
          icon={BookOpen}
          tone="amber"
        />
        <StatCard
          variant="dashboard"
          label="Sinh viên đang học"
          value={show(formatNumber(studying))}
          sub={<Delta value={formatPercent(students.length ? studying / students.length : 0)} tone="text-green">tổng số sinh viên</Delta>}
          icon={SquareCheck}
          tone="green"
        />
      </div>

      {/* Phân tích sinh viên */}
      <div className="grid grid-cols-[minmax(0,1fr)_470px] gap-5">
        <section className="flex flex-col gap-3 rounded-xl border border-line bg-white p-5">
          <div>
            <h2 className="text-[16px] leading-[22px] font-semibold text-ink-strong">Số lượng sinh viên theo năm học</h2>
            <p className="mt-[3px] text-[12px] leading-[17px] text-muted">Quy mô sinh viên tăng đều qua các năm</p>
          </div>
          <StudentsByYearChart data={STUDENTS_BY_YEAR} highlightYear={currentYear} />
        </section>
        <section className="flex flex-col gap-3 rounded-xl border border-line bg-white p-5">
          <div>
            <h2 className="text-[16px] leading-[22px] font-semibold text-ink-strong">Phân bố sinh viên theo trạng thái</h2>
            <p className="mt-[3px] text-[12px] leading-[17px] text-muted">
              Tổng cộng {formatNumber(students.length)} sinh viên trong hệ thống
            </p>
          </div>
          <div className="flex min-h-[198px] items-center">
            <StatusDonutChart students={students} />
          </div>
        </section>
      </div>

      {/* Thao tác nhanh và hoạt động gần đây */}
      <div className="flex gap-5">
        <QuickActions />
        <RecentActivities activities={activities} />
      </div>
    </div>
  )
}
