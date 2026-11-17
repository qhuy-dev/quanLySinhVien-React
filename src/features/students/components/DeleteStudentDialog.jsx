import { ShieldAlert, TriangleAlert } from 'lucide-react'
import Modal from '../../../components/ui/Modal.jsx'
import Button from '../../../components/ui/Button.jsx'
import InfoNote from '../../../components/ui/InfoNote.jsx'

export default function DeleteStudentDialog({ student, onClose, onConfirm }) {
  return (
    <Modal open={!!student} onClose={onClose} labelledBy="delete-student-title">
      {student && (
        <>
          <div className="flex size-[52px] items-center justify-center rounded-full bg-danger-tint text-danger">
            <TriangleAlert size={24} />
          </div>
          <h2 id="delete-student-title" className="mt-4 text-[20px] leading-[1.45] font-semibold text-ink">
            Xác nhận xóa sinh viên?
          </h2>
          <p className="mt-3 text-[14px] leading-[1.45] text-secondary">
            Bạn có chắc chắn muốn xóa sinh viên {student.fullName} ({student.id})? Hành động này không thể hoàn tác.
          </p>
          <InfoNote icon={ShieldAlert} tone="danger" className="mt-4 text-[11px]">
            Hồ sơ sinh viên sẽ bị xóa khỏi hệ thống.
          </InfoNote>
          <div className="mt-4 flex justify-end gap-2.5">
            <Button variant="secondary" onClick={onClose} data-autofocus>
              Hủy
            </Button>
            <Button variant="danger" onClick={() => onConfirm(student)}>
              Xác nhận xóa
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}
