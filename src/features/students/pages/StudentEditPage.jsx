import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../../context/DataContext.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import { BackLink } from '../../../components/layout/PageHeader.jsx'
import { TableSkeleton } from '../../../components/table/TableStates.jsx'
import NotFound from '../../../components/layout/NotFound.jsx'
import StudentForm from '../components/StudentForm.jsx'

export default function StudentEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status, students, updateStudent } = useData()
  const { show } = useToast()
  const student = students.find((s) => s.id === id)

  if (status === 'ready' && !student) {
    return <NotFound title="Không tìm thấy sinh viên" backTo="/students" />
  }

  const submit = (data) => {
    updateStudent(data)
    show('Đã cập nhật sinh viên thành công.')
    navigate('/students')
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <BackLink to="/students" />
        <h1 className="text-[27px] leading-[1.45] font-bold text-ink">Chỉnh sửa sinh viên</h1>
        {student && (
          <p className="text-[13px] text-muted">
            Cập nhật hồ sơ của {student.fullName} · {student.id}
          </p>
        )}
      </div>
      {student ? (
        <StudentForm key={student.id} mode="edit" initial={student} onSubmit={submit} onCancel={() => navigate('/students')} />
      ) : (
        <TableSkeleton rows={4} />
      )}
    </div>
  )
}
