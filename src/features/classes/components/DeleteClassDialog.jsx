import { CircleAlert, ShieldAlert } from 'lucide-react'
import Modal from '../../../components/ui/Modal.jsx'
import Button from '../../../components/ui/Button.jsx'
import InfoNote from '../../../components/ui/InfoNote.jsx'

// 2 trạng thái theo Figma: "Bị chặn" (lớp còn sinh viên) và "Được phép xóa"
export default function DeleteClassDialog({ cls, size = 0, onClose, onConfirm }) {
  const blocked = size > 0
  return (
    <Modal open={!!cls} onClose={onClose} labelledBy="delete-class-title">
      {cls && (
        <>
          <div className="flex size-12 items-center justify-center rounded-lg bg-amber-tint text-danger">
            <CircleAlert size={22} />
          </div>
          <h2 id="delete-class-title" className="mt-4 text-[22px] leading-[1.45] font-semibold text-ink-strong">
            Xác nhận xóa lớp học?
          </h2>
          <p className="mt-2 text-[14px] leading-[1.5] text-secondary">
            Bạn có chắc chắn muốn xóa lớp học này? Vui lòng kiểm tra dữ liệu sinh viên trước khi thực hiện.
          </p>
          <p className="mt-4 text-[13px] font-semibold text-ink-strong">
            {cls.id} · {cls.name}
          </p>
          {blocked ? (
            <div className="mt-4 rounded-lg bg-amber-tint px-4 py-4">
              <p className="text-[13px] font-semibold text-amber">Không thể xóa: lớp đang có {size} sinh viên.</p>
              <p className="mt-1.5 text-[11px] text-amber">
                Vui lòng chuyển lớp hoặc xử lý toàn bộ hồ sơ sinh viên trước khi xóa lớp học này.
              </p>
            </div>
          ) : (
            <InfoNote icon={ShieldAlert} tone="danger" className="mt-4 text-[12px]">
              Lớp học sẽ bị xóa khỏi hệ thống. Hành động này không thể hoàn tác.
            </InfoNote>
          )}
          <div className="mt-10 flex justify-end gap-6">
            <Button variant="secondary" onClick={onClose} data-autofocus>
              Hủy
            </Button>
            <Button variant="danger" disabled={blocked} onClick={() => onConfirm(cls)}>
              Xác nhận xóa
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}
