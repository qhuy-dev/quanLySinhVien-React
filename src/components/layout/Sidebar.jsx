import { NavLink } from 'react-router-dom'
import { CircleHelp, GraduationCap, LogOut } from 'lucide-react'
import clsx from 'clsx'
import { COMING_SOON, NAV_ITEMS } from '../../constants/navigation.js'
import { ADMIN_AVATAR_SIDEBAR } from '../../data/avatars.js'

const itemBase = 'flex h-11 w-full items-center gap-3 rounded-lg p-3 text-[13px] leading-[1.45] transition-colors'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[244px] shrink-0 flex-col gap-6 border-r border-line bg-white px-4">
      {/* Logo */}
      <div className="flex h-20 items-center gap-2.5 p-2">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-primary text-white">
          <GraduationCap size={23} />
        </div>
        <div className="leading-[1.45]">
          <p className="text-[12px] font-bold text-ink">Student Management</p>
          <p className="text-[10px] font-semibold tracking-[1.6px] text-muted">SYSTEM</p>
        </div>
      </div>

      {/* Điều hướng chính */}
      <nav className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto" aria-label="Điều hướng chính">
        <p className="text-[10px] leading-[1.45] font-semibold text-subtle">KHÔNG GIAN QUẢN TRỊ</p>
        {NAV_ITEMS.map(({ label, icon: Icon, to, end }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(itemBase, isActive ? 'bg-tint font-semibold text-primary' : 'font-medium text-muted hover:bg-page hover:text-ink')
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ) : (
            <button
              key={label}
              type="button"
              aria-disabled="true"
              title={COMING_SOON}
              className={clsx(itemBase, 'cursor-default font-medium text-muted')}
            >
              <Icon size={19} />
              {label}
            </button>
          ),
        )}
      </nav>

      {/* Trợ giúp */}
      <div className="flex h-[98px] flex-col gap-1.5 rounded-[10px] bg-page p-3.5">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
          <CircleHelp size={18} className="text-primary" />
          Bạn cần hỗ trợ?
        </div>
        <button type="button" title={COMING_SOON} className="w-fit text-left text-[12px] font-medium text-primary hover:underline">
          Trung tâm trợ giúp&nbsp;&nbsp;↗
        </button>
      </div>

      {/* Tài khoản */}
      <div className="flex h-[76px] items-center gap-2.5 border-t border-line p-2">
        <img src={ADMIN_AVATAR_SIDEBAR} alt="" className="size-8 rounded-full" />
        <div className="min-w-0 flex-1 leading-[1.45]">
          <p className="truncate text-[12px] font-semibold text-ink">Nguyễn Hoàng</p>
          <p className="text-[11px] text-muted">Quản trị viên</p>
        </div>
        <button type="button" title={`Đăng xuất — ${COMING_SOON}`} aria-label="Đăng xuất" className="rounded p-1 text-secondary hover:bg-page">
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  )
}
