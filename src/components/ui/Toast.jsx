import { CircleCheck, SquareCheck, X } from 'lucide-react'
import clsx from 'clsx'

// 'student': Figma "07 · Trạng thái & phản hồi"; 'class': Figma "Quản lý lớp học / Thông báo thành công"
export default function Toast({ message, variant = 'student', onClose }) {
  const isClass = variant === 'class'
  return (
    <div
      role="status"
      className={clsx(
        'animate-toast-in pointer-events-auto flex items-center gap-3 rounded-[10px] border bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]',
        isClass ? 'h-16 border-line' : 'h-[70px] border-green-border',
      )}
    >
      {isClass ? (
        <SquareCheck size={18} className="shrink-0 text-green" />
      ) : (
        <CircleCheck size={20} className="shrink-0 text-green" />
      )}
      <p className={clsx('flex-1 text-[13px] font-medium', isClass ? 'text-green' : 'text-ink')}>{message}</p>
      <button type="button" onClick={onClose} aria-label="Đóng thông báo" className="rounded p-1 text-muted hover:bg-page">
        <X size={16} />
      </button>
    </div>
  )
}
