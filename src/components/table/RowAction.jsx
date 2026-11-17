import { Link } from 'react-router-dom'
import clsx from 'clsx'

// Nút icon trong cột "Thao tác" (xem / sửa / xóa)
export default function RowAction({ label, to, onClick, icon: Icon, danger, size = 'sm' }) {
  const cls = clsx(
    'flex items-center justify-center rounded-md transition-colors',
    size === 'sm' ? 'size-7' : 'h-8 w-[30px]',
    danger ? 'text-danger hover:bg-danger-tint' : 'text-secondary hover:bg-page hover:text-ink',
  )
  return to ? (
    <Link to={to} aria-label={label} title={label} className={cls}>
      <Icon size={16} />
    </Link>
  ) : (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={cls}>
      <Icon size={16} />
    </button>
  )
}
