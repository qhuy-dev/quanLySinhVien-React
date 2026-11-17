import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { useData } from '../../../context/DataContext.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import PageHeader from '../../../components/layout/PageHeader.jsx'
import Button from '../../../components/ui/Button.jsx'
import Select from '../../../components/ui/Select.jsx'
import SearchInput from '../../../components/table/SearchInput.jsx'
import Pagination from '../../../components/table/Pagination.jsx'
import { EmptyState, ErrorState, TableSkeleton } from '../../../components/table/TableStates.jsx'
import usePagination from '../../../hooks/usePagination.js'
import useSelection from '../../../hooks/useSelection.js'
import StudentStats from '../components/StudentStats.jsx'
import StudentTable from '../components/StudentTable.jsx'
import DeleteStudentDialog from '../components/DeleteStudentDialog.jsx'
import { FACULTY_OPTIONS, facultyName } from '../../../data/mock/faculties.js'
import { STUDENT_STATUS, STUDENT_STATUS_OPTIONS } from '../../../constants/status.js'
import { formatDate, formatNumber, normalize } from '../../../utils/format.js'
import { exportCsv } from '../../../utils/exportCsv.js'

export default function StudentListPage() {
  const { students, classes, status, retry, deleteStudent } = useData()
  const { show } = useToast()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [faculty, setFaculty] = useState('')
  const [classId, setClassId] = useState('')
  const [st, setSt] = useState('')
  const [toDelete, setToDelete] = useState(null)
  const selection = useSelection()

  const classOptions = useMemo(
    () => [
      { value: '', label: 'Tất cả lớp' },
      ...classes.filter((c) => !faculty || c.facultyId === faculty).map((c) => ({ value: c.id, label: c.id })),
    ],
    [classes, faculty],
  )

  const filtered = useMemo(() => {
    const term = normalize(q)
    return students.filter(
      (s) =>
        (!term || normalize(s.id).includes(term) || normalize(s.fullName).includes(term)) &&
        (!faculty || s.facultyId === faculty) &&
        (!classId || s.classId === classId) &&
        (!st || s.status === st),
    )
  }, [students, q, faculty, classId, st])

  const pager = usePagination(filtered, { resetKey: `${q}|${faculty}|${classId}|${st}` })
  const hasFilter = q || faculty || classId || st

  const clearFilters = () => {
    setQ('')
    setFaculty('')
    setClassId('')
    setSt('')
  }

  const onFaculty = (v) => {
    setFaculty(v)
    if (v && classId && classes.find((c) => c.id === classId)?.facultyId !== v) setClassId('')
  }

  const confirmDelete = (s) => {
    deleteStudent(s.id)
    setToDelete(null)
    show('Đã xóa sinh viên thành công.')
  }

  const onExport = () =>
    exportCsv('danh-sach-sinh-vien.csv', [
      { header: 'Mã sinh viên', value: (s) => s.id },
      { header: 'Họ và tên', value: (s) => s.fullName },
      { header: 'Giới tính', value: (s) => s.gender },
      { header: 'Ngày sinh', value: (s) => formatDate(s.dob) },
      { header: 'Email', value: (s) => s.email },
      { header: 'Số điện thoại', value: (s) => s.phone },
      { header: 'Lớp', value: (s) => s.classId },
      { header: 'Khoa', value: (s) => facultyName(s.facultyId) },
      { header: 'Khóa học', value: (s) => s.cohort },
      { header: 'Trạng thái', value: (s) => STUDENT_STATUS[s.status]?.label },
    ], filtered)

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Quản lý sinh viên"
        titleClassName="text-[28px] leading-[1.45] font-bold text-ink"
        description="Theo dõi và quản lý danh sách sinh viên toàn trường."
        actions={
          <>
            <Button variant="secondary" onClick={onExport} disabled={status !== 'ready'}>
              Xuất Excel
            </Button>
            <Button icon={Plus} to="/students/new">
              Thêm sinh viên
            </Button>
          </>
        }
      />

      <StudentStats students={students} />

      <section className="rounded-[10px] border border-line bg-white">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <SearchInput value={q} onChange={setQ} placeholder="Tìm theo mã sinh viên hoặc họ tên..." className="min-w-[260px] flex-1" />
          <Select value={faculty} onChange={onFaculty} options={[{ value: '', label: 'Tất cả khoa' }, ...FACULTY_OPTIONS]} className="w-[198px]" aria-label="Lọc theo khoa" />
          <Select value={classId} onChange={setClassId} options={classOptions} placeholder="Tất cả lớp" className="w-[126px]" aria-label="Lọc theo lớp" />
          <Select value={st} onChange={setSt} options={[{ value: '', label: 'Trạng thái' }, ...STUDENT_STATUS_OPTIONS]} className="w-[162px]" aria-label="Lọc theo trạng thái" />
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilter}
            className="flex h-[42px] items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-secondary hover:bg-page disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent"
          >
            <X size={16} /> Xóa bộ lọc
          </button>
        </div>

        {status === 'loading' && (
          <div className="border-t border-line">
            <TableSkeleton label="Đang tải danh sách sinh viên..." />
          </div>
        )}
        {status === 'error' && (
          <div className="border-t border-line">
            <ErrorState
              title="Không thể tải danh sách"
              description="Đã xảy ra lỗi khi tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại."
              onRetry={retry}
            />
          </div>
        )}
        {status === 'ready' && filtered.length === 0 && (
          <div className="border-t border-line">
            <EmptyState
              title="Không tìm thấy sinh viên"
              description="Không có sinh viên phù hợp. Thử tìm với từ khóa khác hoặc xóa bộ lọc."
              onAction={hasFilter ? clearFilters : undefined}
            />
          </div>
        )}
        {status === 'ready' && filtered.length > 0 && (
          <>
            <StudentTable rows={pager.pageItems} selection={selection} onDelete={setToDelete} />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-3.5">
              <p className="text-[11px] text-muted">
                Hiển thị {pager.from}–{pager.to} trong tổng số {formatNumber(pager.total)} sinh viên
              </p>
              <Pagination
                page={pager.page}
                pageCount={pager.pageCount}
                onPageChange={pager.setPage}
                pageSize={pager.pageSize}
                onPageSizeChange={pager.setPageSize}
              />
            </div>
          </>
        )}
      </section>

      <DeleteStudentDialog student={toDelete} onClose={() => setToDelete(null)} onConfirm={confirmDelete} />
    </div>
  )
}
