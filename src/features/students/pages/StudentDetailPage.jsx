import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import clsx from 'clsx'
import { useData } from '../../../context/DataContext.jsx'
import { BackLink } from '../../../components/layout/PageHeader.jsx'
import NotFound from '../../../components/layout/NotFound.jsx'
import Avatar from '../../../components/ui/Avatar.jsx'
import Button from '../../../components/ui/Button.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'
import { TableSkeleton } from '../../../components/table/TableStates.jsx'
import { AcademicInfoCard, AcademicResultCard, PersonalInfoCard } from '../components/StudentDetailCards.jsx'
import { facultyName } from '../../../data/mock/faculties.js'

const TABS = [
  { id: 'overview', label: 'Tổng quan', width: 'w-[102px]' },
  { id: 'personal', label: 'Thông tin cá nhân', width: 'w-[153px]' },
  { id: 'results', label: 'Kết quả học tập', width: 'w-[139px]' },
]

export default function StudentDetailPage() {
  const { id } = useParams()
  const { status, students } = useData()
  const [tab, setTab] = useState('overview')
  const s = students.find((x) => x.id === id)

  if (status === 'ready' && !s) return <NotFound title="Không tìm thấy sinh viên" backTo="/students" />

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <BackLink to="/students" />
        <h1 className="text-[27px] leading-[1.45] font-bold text-ink">Hồ sơ sinh viên</h1>
      </div>

      {!s ? (
        <TableSkeleton rows={4} />
      ) : (
        <>
          {/* Tóm tắt hồ sơ */}
          <section className="flex min-h-[146px] items-center gap-6 rounded-[10px] border border-line bg-white p-6">
            <Avatar avatar={s.avatar} name={s.fullName} size={88} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-3.5">
                <h2 className="text-[25px] leading-[1.45] font-semibold text-ink">{s.fullName}</h2>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-[12px] font-medium whitespace-pre text-muted">
                {`${s.id}  •  Lớp ${s.classId}  •  Khóa ${s.cohort}`}
              </p>
              <p className="text-[12px] text-muted">Khoa {facultyName(s.facultyId)}</p>
            </div>
            <Button to={`/students/${s.id}/edit`} className="mr-20">
              Chỉnh sửa
            </Button>
          </section>

          {/* Tabs */}
          <div role="tablist" className="flex gap-7 border-b border-line">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={clsx(
                  '-mb-px h-12 border-b-2 text-[13px] transition-colors',
                  t.width,
                  tab === t.id ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="flex flex-col gap-5">
            {tab === 'overview' && (
              <>
                <div className="grid grid-cols-[minmax(0,1fr)_434px] gap-6">
                  <PersonalInfoCard student={s} />
                  <AcademicInfoCard student={s} />
                </div>
                <AcademicResultCard student={s} />
              </>
            )}
            {tab === 'personal' && <PersonalInfoCard student={s} />}
            {tab === 'results' && <AcademicResultCard student={s} />}
          </div>

          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <ShieldCheck size={14} /> Thông tin hồ sơ chỉ hiển thị với người dùng được phân quyền.
          </p>
        </>
      )}
    </div>
  )
}
