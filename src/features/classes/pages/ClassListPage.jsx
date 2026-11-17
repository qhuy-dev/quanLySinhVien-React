import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
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
import ClassStats from '../components/ClassStats.jsx'
import ClassTable from '../components/ClassTable.jsx'
import DeleteClassDialog from '../components/DeleteClassDialog.jsx'
import { FACULTY_OPTIONS, facultyName } from '../../../data/mock/faculties.js'
import { CLASS_STATUS, CLASS_STATUS_OPTIONS } from '../../../constants/status.js'
import { formatNumber, normalize } from '../../../utils/format.js'
import { exportCsv } from '../../../utils/exportCsv.js'

export default function ClassListPage() {
  const { classes, students, classSizes, status, retry, deleteClass } = useData()
  const { show } = useToast()
  const [q, setQ] = useState('')
  const [faculty, setFaculty] = useState('')
  const [st, setSt] = useState('')
  const [toDelete, setToDelete] = useState(null)
  const selection = useSelection()

  const filtered = useMemo(() => {
    const term = normalize(q)
    return classes.filter(
      (c) =>
        (!term || normalize(c.id).includes(term) || normalize(c.name).includes(term)) &&
        (!faculty || c.facultyId === faculty) &&
        (!st || c.status === st),
    )
  }, [classes, q, faculty, st])

  const pager = usePagination(filtered, { resetKey: `${q}|${faculty}|${st}` })
  const hasFilter = q || faculty || st
  const clearFilters = () => {
    setQ('')
    setFaculty('')
    setSt('')
  }

  const confirmDelete = (c) => {
    deleteClass(c.id)
    setToDelete(null)
    show('Xóa lớp học thành công.', 'class')
  }

  const onExport = () =>
    exportCsv('danh-sach-lop-hoc.csv', [
      { header: 'Mã lớp', value: (c) => c.id },
      { header: 'Tên lớp', value: (c) => c.name },
      { header: 'Khoa phụ trách', value: (c) => facultyName(c.facultyId) },
      { header: 'Khóa học', value: (c) => c.course },
      { header: 'Niên khóa', value: (c) => c.cohort },
      { header: 'Sĩ số hiện tại', value: (c) => classSizes[c.id] || 0 },
      { header: 'Sĩ số tối đa', value: (c) => c.maxSize },
      { header: 'Trạng thái', value: (c) => CLASS_STATUS[c.status]?.label },
    ], filtered)

  const countLabel = status === 'loading' ? 'Đang tải...' : status === 'error' ? 'Không có dữ liệu' : `${formatNumber(filtered.length)} lớp học`

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý lớp học"
        titleClassName="text-[28px] font-semibold leading-[42px] text-ink-strong"
        description="Quản lý thông tin lớp học, khoa phụ trách và danh sách sinh viên."
        className="items-center"
        actions={
          <>
            <Button variant="secondary" onClick={onExport} disabled={status !== 'ready'}>
              Xuất Excel
            </Button>
            <Button icon={Plus} to="/classes/new" className="mr-[19px]">
              Thêm lớp học
            </Button>
          </>
        }
      />

      <ClassStats classes={classes} students={students} />

      <section className="rounded-[10px] border border-line bg-white">
        <div className="flex items-baseline gap-5 px-[19px] pt-[17px]">
          <h2 className="text-[17px] leading-[26px] font-semibold text-ink-strong">Danh sách lớp học</h2>
          <span className="text-[12px] text-muted">{countLabel}</span>
        </div>
        <div className="flex gap-4 px-[19px] pt-[22px] pb-[22px]">
          <SearchInput value={q} onChange={setQ} withIcon={false} placeholder="Tìm theo mã lớp hoặc tên lớp..." className="flex-1" />
          <Select value={faculty} onChange={setFaculty} options={[{ value: '', label: 'Tất cả các khoa' }, ...FACULTY_OPTIONS]} placeholder="Lọc theo khoa" className="w-[245px]" aria-label="Lọc theo khoa" />
          <Select value={st} onChange={setSt} options={[{ value: '', label: 'Tất cả trạng thái' }, ...CLASS_STATUS_OPTIONS]} placeholder="Lọc theo trạng thái" className="w-[245px]" aria-label="Lọc theo trạng thái" />
          <Button variant="secondary" onClick={clearFilters} className="w-[132px]">
            Xóa bộ lọc
          </Button>
        </div>

        {status === 'loading' && <TableSkeleton label="Đang tải danh sách lớp học..." />}
        {status === 'error' && (
          <ErrorState title="Không thể tải danh sách lớp học" description="Kết nối bị gián đoạn. Vui lòng thử lại." onRetry={retry} />
        )}
        {status === 'ready' && filtered.length === 0 && (
          <EmptyState
            title="Không tìm thấy lớp học"
            description="Thử từ khóa khác hoặc xóa bộ lọc để xem tất cả lớp."
            onAction={hasFilter ? clearFilters : undefined}
          />
        )}
        {status === 'ready' && filtered.length > 0 && (
          <ClassTable
            rows={pager.pageItems}
            startIndex={pager.from}
            classSizes={classSizes}
            selection={selection}
            onDelete={setToDelete}
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 px-[19px] py-5">
          <p className="text-[12px] text-muted">
            {status === 'loading'
              ? 'Đang tải dữ liệu...'
              : status === 'error'
                ? 'Vui lòng thử tải lại dữ liệu'
                : pager.total
                  ? `Hiển thị ${pager.from}–${pager.to} trong tổng số ${formatNumber(pager.total)} lớp học`
                  : 'Hiển thị 0 lớp học'}
          </p>
          <Pagination
            variant="boxed"
            page={pager.page}
            pageCount={pager.pageCount}
            onPageChange={pager.setPage}
            pageSize={pager.pageSize}
            onPageSizeChange={pager.setPageSize}
          />
        </div>
      </section>

      <p className="-mt-2 text-[11px] text-muted">Dữ liệu được cập nhật theo thời gian thực</p>

      <DeleteClassDialog
        cls={toDelete}
        size={toDelete ? classSizes[toDelete.id] || 0 : 0}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
