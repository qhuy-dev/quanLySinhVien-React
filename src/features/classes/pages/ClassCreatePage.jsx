import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import { BackButton } from '../../../components/layout/PageHeader.jsx'
import { TableSkeleton } from '../../../components/table/TableStates.jsx'
import ClassForm, { EMPTY_CLASS } from '../components/ClassForm.jsx'
import { CreateClassTips } from '../components/ClassFormAside.jsx'

export default function ClassCreatePage() {
  const navigate = useNavigate()
  const { status, addClass } = useData()
  const { show } = useToast()

  const submit = (cls) => {
    addClass(cls)
    show('Thêm lớp học thành công.', 'class')
    navigate('/classes')
  }

  return (
    <div className="flex flex-col">
      <BackButton to="/classes">Danh sách lớp học</BackButton>
      <h1 className="mt-6 text-[28px] leading-[42px] font-semibold text-ink-strong">Thêm lớp học</h1>
      <p className="mt-0.5 text-[13px] leading-5 text-muted">Tạo lớp học mới và thiết lập thông tin quản lý.</p>
      {status === 'ready' ? (
        <div className="mt-7 grid grid-cols-[minmax(0,1fr)_342px] items-start gap-6">
          <ClassForm mode="create" initial={EMPTY_CLASS} onSubmit={submit} onCancel={() => navigate('/classes')} />
          <CreateClassTips />
        </div>
      ) : (
        <TableSkeleton rows={4} />
      )}
      <p className="mt-6 text-[12px] leading-[18px] text-muted">Thông tin chỉ được lưu khi bạn chọn “Lưu lớp học”.</p>
    </div>
  )
}
