import { Link } from 'react-router-dom'
import clsx from 'clsx'

// 4 biến thể × trạng thái mặc định / di chuột / focus — Figma "02 · Nút thao tác"
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover disabled:opacity-60 disabled:hover:bg-primary',
  secondary: 'bg-white text-ink border border-line hover:bg-page disabled:opacity-60 disabled:hover:bg-white',
  // Danger bị vô hiệu: nền đỏ nhạt như Figma "Xác nhận xóa lớp học — Bị chặn"
  danger: 'bg-danger text-white hover:bg-danger-hover disabled:bg-danger/40 disabled:hover:bg-danger/40',
  ghost: 'bg-transparent text-ink hover:bg-page disabled:opacity-60 disabled:hover:bg-transparent',
}

export default function Button({
  variant = 'primary',
  icon: Icon,
  children,
  to,
  className,
  type = 'button',
  ...props
}) {
  const cls = clsx(
    'inline-flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-[13px] leading-[1.45] font-semibold whitespace-nowrap transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    VARIANTS[variant],
    className,
  )
  const content = (
    <>
      {Icon && <Icon size={17} strokeWidth={2} />}
      {children}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} {...props}>
      {content}
    </button>
  )
}
