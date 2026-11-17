import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import clsx from 'clsx'

// Tiêu đề trang + mô tả + nút hành động bên phải
export default function PageHeader({ title, description, actions, titleClassName, className }) {
  return (
    <div className={clsx('flex items-start justify-between gap-6', className)}>
      <div className="min-w-0">
        <h1 className={titleClassName ?? 'text-[27px] leading-[1.45] font-bold text-ink'}>{title}</h1>
        {description && <p className="mt-1 text-[13px] leading-[1.45] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  )
}

// "← Quay lại danh sách" dạng link chữ (Figma sinh viên)
export function BackLink({ to, children = 'Quay lại danh sách' }) {
  return (
    <Link to={to} className="inline-flex w-fit items-center gap-2 text-[12px] font-medium text-muted hover:text-ink">
      <ArrowLeft size={16} />
      {children}
    </Link>
  )
}

// "← Danh sách lớp học" dạng nút viền (Figma lớp học)
export function BackButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex h-[42px] w-fit items-center gap-2 rounded-lg border border-line bg-white px-4 text-[13px] font-semibold text-ink hover:bg-page"
    >
      <ArrowLeft size={14} />
      {children}
    </Link>
  )
}
