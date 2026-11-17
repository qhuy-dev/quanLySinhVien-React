import clsx from 'clsx'

/**
 * Nhãn + trường + gợi ý/lỗi.
 * variant 'student': nhãn 12px đậm vừa, dấu * đỏ (Figma sinh viên)
 * variant 'class'  : nhãn 13px màu phụ, dấu * cùng màu (Figma lớp học)
 */
export default function FormField({ label, htmlFor, required, hint, error, variant = 'student', className, children }) {
  const isClass = variant === 'class'
  return (
    <div className={clsx('flex min-w-0 flex-col', isClass ? 'gap-2' : 'gap-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={clsx('font-medium', isClass ? 'text-[13px] leading-5 text-secondary' : 'text-[12px] leading-[1.45] text-ink')}
        >
          {label}
          {required && <span className={clsx(isClass ? 'ml-1' : 'ml-[3px] text-danger')}>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className={clsx(isClass ? 'text-[11px] leading-[17px] text-danger-hover' : 'text-[10px] leading-[1.45] text-danger')}>{error}</p>
      ) : (
        hint && <p className={clsx('text-muted', isClass ? 'text-[11px] leading-[17px]' : 'text-[10px] leading-[1.45]')}>{hint}</p>
      )}
    </div>
  )
}
