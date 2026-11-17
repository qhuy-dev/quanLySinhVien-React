import clsx from 'clsx'
import { CLASS_STATUS, STUDENT_STATUS } from '../../constants/status.js'

// kind 'student': có chấm tròn (Figma "04 · Trạng thái sinh viên")
// kind 'class'  : nhãn chữ trên nền nhạt, rộng cố định (Figma lớp học)
export default function StatusBadge({ status, kind = 'student', className }) {
  if (kind === 'class') {
    const s = CLASS_STATUS[status] ?? CLASS_STATUS.inactive
    return (
      <span
        className={clsx(
          'inline-flex h-[26px] w-[144px] items-center rounded-[6px] px-[9px] text-[11px] leading-[17px] font-medium whitespace-nowrap',
          s.bg,
          s.text,
          className,
        )}
      >
        {s.label}
      </span>
    )
  }
  const s = STUDENT_STATUS[status] ?? STUDENT_STATUS.studying
  return (
    <span
      className={clsx(
        'inline-flex h-[26px] items-center gap-[5px] rounded-[6px] px-[9px] text-[12px] leading-[1.4] font-medium whitespace-nowrap',
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={clsx('size-[5px] rounded-full', s.dot)} />
      {s.label}
    </span>
  )
}
