import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import { BackLink } from '../../../components/layout/PageHeader.jsx'
import { TableSkeleton } from '../../../components/table/TableStates.jsx'
import StudentForm, { EMPTY_STUDENT } from '../components/StudentForm.jsx'

export default function StudentCreatePage() {
  const navigate = useNavigate()
  const { status, nextStudentId, addStudent } = useData()
  const { show } = useToast()

  const submit = (student) => {
    addStudent(student)
    show('Đã thêm sinh viên thành công.')
    navigate('/students')
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <BackLink to="/students" />
        <h1 className="text-[27px] leading-[1.45] font-bold text-ink">Thêm sinh viên</h1>
        <p className="text-[13px] text-muted">Tạo hồ sơ sinh viên mới. Các trường có dấu * là bắt buộc.</p>
      </div>
      {status === 'ready' ? (
        <StudentForm
          mode="create"
          initial={{ ...EMPTY_STUDENT, id: nextStudentId() }}
          onSubmit={submit}
          onCancel={() => navigate('/students')}
        />
      ) : (
        <TableSkeleton rows={4} />
      )}
    </div>
  )
}
