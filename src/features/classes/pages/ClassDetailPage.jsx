import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { useData } from '../../../context/DataContext.jsx'
import { BackButton } from '../../../components/layout/PageHeader.jsx'
import NotFound from '../../../components/layout/NotFound.jsx'
import Button from '../../../components/ui/Button.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'
import SearchInput from '../../../components/table/SearchInput.jsx'
import Pagination from '../../../components/table/Pagination.jsx'
import { EmptyState, TableSkeleton } from '../../../components/table/TableStates.jsx'
import usePagination from '../../../hooks/usePagination.js'
import { facultyName } from '../../../data/mock/faculties.js'
import { CLASS_STATUS } from '../../../constants/status.js'
import { formatDate, normalize } from '../../../utils/format.js'

function Info({ label, value, className }) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] leading-[18px] text-muted">{label}</p>
      <p className={clsx('mt-1.5 text-[13px] leading-5 font-medium', className ?? 'text-ink-strong')}>{value}</p>
    </div>
  )
}

const th = 'px-5 text-left text-[12px] leading-[18px] font-semibold text-secondary first:pl-5'
const td = 'px-5 text-[12px] leading-[18px] text-ink-strong'

export default function ClassDetailPage() {
  const { id } = useParams()
  const { status, classes, students } = useData()
  const [q, setQ] = useState('')
  const cls = classes.find((c) => c.id === id)

  const members = useMemo(() => students.filter((s) => s.classId === id).sort((a, b) => a.id.localeCompare(b.id)), [students, id])
  const filtered = useMemo(() => {
    const term = normalize(q)
    return term ? members.filter((s) => normalize(s.id).includes(term) || normalize(s.fullName).includes(term)) : members
  }, [members, q])
  const pager = usePagination(filtered, { resetKey: q })

  if (status === 'ready' && !cls) return <NotFound title="Không tìm thấy lớp học" backTo="/classes" />
  if (!cls) return <TableSkeleton rows={4} />

  const statusCfg = CLASS_STATUS[cls.status]

  return (
    <div className="flex flex-col">
      <BackButton to="/classes">Danh sách lớp học</BackButton>

      <div className="mt-[22px] flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[28px] leading-[42px] font-semibold text-ink-strong">{cls.name}</h1>
          <p className="mt-1 text-[13px] leading-5 whitespace-pre text-muted">
            {`${cls.id}  /  ${facultyName(cls.facultyId)}  /  Niên khóa ${cls.cohort}`}
          </p>
          <StatusBadge kind="class" status={cls.status} className="mt-3.5" />
        </div>
        <Button to={`/classes/${cls.id}/edit`} className="mt-[13px] mr-2.5">
          Chỉnh sửa lớp học
        </Button>
      </div>

      {/* Thông tin chung */}
      <section className="mt-[22px] rounded-[10px] border border-line bg-white px-[19px] pt-[17px] pb-9">
        <h2 className="text-[17px] leading-[26px] font-semibold text-ink-strong">Thông tin chung</h2>
        <div className="mt-5 grid grid-cols-4 gap-x-6 gap-y-[34px]">
          <Info label="Mã lớp" value={cls.id} />
          <Info label="Tên lớp" value={cls.name} />
          <Info label="Khoa phụ trách" value={facultyName(cls.facultyId)} />
          <Info label="Khóa học" value={cls.course} />
          <Info label="Sĩ số hiện tại" value={`${members.length} sinh viên`} />
          <Info label="Sĩ số tối đa" value={`${cls.maxSize} sinh viên`} />
          <Info label="Ngày thành lập lớp" value={formatDate(cls.establishedAt)} />
          <Info label="Trạng thái" value={statusCfg.label} className={statusCfg.text} />
        </div>
      </section>

      {/* Danh sách sinh viên */}
      <section className="mt-6 rounded-[10px] border border-line bg-white">
        <div className="flex items-center justify-between gap-4 py-[11px] pr-5 pl-[19px]">
          <div className="flex items-baseline gap-6">
            <h2 className="text-[17px] leading-[26px] font-semibold text-ink-strong">Danh sách sinh viên</h2>
            <span className="text-[12px] text-muted">{members.length} sinh viên</span>
          </div>
          <SearchInput value={q} onChange={setQ} withIcon={false} placeholder="Tìm mã hoặc tên sinh viên..." className="w-[310px]" />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-3 border-t border-line">
            <EmptyState
              title={members.length ? 'Không tìm thấy sinh viên' : 'Lớp chưa có sinh viên'}
              description={members.length ? 'Thử tìm với mã hoặc tên khác.' : 'Thêm sinh viên và chọn lớp này trong hồ sơ để hiển thị tại đây.'}
              onAction={q ? () => setQ('') : undefined}
              actionLabel="Xóa tìm kiếm"
            />
          </div>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead className="bg-page">
                <tr className="h-11">
                  <th className={`${th} w-[156px]`}>Mã sinh viên</th>
                  <th className={`${th} w-[274px]`}>Họ và tên</th>
                  <th className={`${th} w-[114px]`}>Giới tính</th>
                  <th className={th}>Email</th>
                  <th className={`${th} w-[188px]`}>Trạng thái học tập</th>
                </tr>
              </thead>
              <tbody>
                {pager.pageItems.map((s) => (
                  <tr key={s.id} className="h-[52px] hover:bg-page">
                    <td className={td}>
                      <Link to={`/students/${s.id}`} className="font-medium text-primary hover:underline">
                        {s.id}
                      </Link>
                    </td>
                    <td className={`${td} font-medium`}>{s.fullName}</td>
                    <td className={td}>{s.gender}</td>
                    <td className={td}>{s.email}</td>
                    <td className={td}>
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 px-[19px] py-5">
          <p className="text-[12px] text-muted">
            {pager.total
              ? `Hiển thị ${pager.from}–${pager.to} trong tổng số ${pager.total} sinh viên`
              : 'Hiển thị 0 sinh viên'}
          </p>
          <Pagination
            variant="boxed"
            page={pager.page}
            pageCount={pager.pageCount}
            onPageChange={pager.setPage}
            pageSize={pager.pageSize}
            onPageSizeChange={pager.setPageSize}
            pageSizeLabel=""
            pageSizeFormat={(n) => `${n} dòng`}
            pageSizeClassName="w-[112px]"
          />
        </div>
      </section>
    </div>
  )
}
