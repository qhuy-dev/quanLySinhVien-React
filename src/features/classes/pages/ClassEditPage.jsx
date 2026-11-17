import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../../context/DataContext.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import { BackButton } from '../../../components/layout/PageHeader.jsx'
import NotFound from '../../../components/layout/NotFound.jsx'
import { TableSkeleton } from '../../../components/table/TableStates.jsx'
import ClassForm from '../components/ClassForm.jsx'
import { CurrentClassInfo } from '../components/ClassFormAside.jsx'
import { formatDate } from '../../../utils/format.js'

export default function ClassEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status, classes, classSizes, updateClass } = useData()
  const { show } = useToast()
  const cls = classes.find((c) => c.id === id)

  if (status === 'ready' && !cls) {
    return <NotFound title="Không tìm thấy lớp học" backTo="/classes" />
  }

  const submit = (data) => {
    updateClass({ ...data, updatedAt: new Date().toISOString() })
    show('Cập nhật lớp học thành công.', 'class')
    navigate('/classes')
  }

  return (
    <div className="flex flex-col">
      <BackButton to="/classes">Danh sách lớp học</BackButton>
      <h1 className="mt-6 text-[28px] leading-[42px] font-semibold text-ink-strong">Chỉnh sửa lớp học</h1>
      {cls && <p className="mt-0.5 text-[13px] leading-5 text-muted">Cập nhật thông tin lớp {cls.name}.</p>}
      {cls ? (
        <div className="mt-7 grid grid-cols-[minmax(0,1fr)_342px] items-start gap-6">
          <ClassForm key={cls.id} mode="edit" initial={cls} onSubmit={submit} onCancel={() => navigate('/classes')} />
          <CurrentClassInfo cls={cls} size={classSizes[cls.id] || 0} />
        </div>
      ) : (
        <TableSkeleton rows={4} />
      )}
      {cls && (
        <p className="mt-6 text-[12px] leading-[18px] text-muted">
          Lần cập nhật gần nhất: {formatDate(cls.updatedAt ?? cls.establishedAt)} · Nguyễn Hoàng
        </p>
      )}
    </div>
  )
}
