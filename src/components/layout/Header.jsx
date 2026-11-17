import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, ChevronRight, Search } from 'lucide-react'
import { ADMIN_AVATAR } from '../../data/avatars.js'
import { COMING_SOON, HOME_LABEL } from '../../constants/navigation.js'

const SECTIONS = {
  students: 'Quản lý sinh viên',
  classes: 'Quản lý lớp học',
}

function GlobalSearch() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    navigate(`/students${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }
  return (
    <form onSubmit={submit} role="search" className="flex items-center gap-2.5">
      <Search size={18} className="text-secondary" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm sinh viên, lớp học, môn học..."
        aria-label="Tìm kiếm toàn hệ thống"
        className="h-[42px] w-[340px] rounded-lg border border-line bg-white px-3 text-[13px] text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </form>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const section = SECTIONS[pathname.split('/')[1]]
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-6 border-b border-line bg-white px-8">
      {isHome ? (
        <p className="text-[13px] text-secondary">{HOME_LABEL}</p>
      ) : (
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[13px]">
          <Link to="/" className="text-muted hover:text-ink">
            {HOME_LABEL}
          </Link>
          <ChevronRight size={14} className="text-muted" />
          <span className="font-medium text-ink">{section}</span>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-4">
        {isHome && <GlobalSearch />}
        <button
          type="button"
          title={COMING_SOON}
          aria-label="Thông báo · 3 chưa đọc"
          className="relative flex size-9 items-center justify-center rounded-full text-secondary hover:bg-page"
        >
          <Bell size={20} />
          <span className="absolute top-[7px] right-[8px] size-[7px] rounded-full border border-white bg-primary" />
        </button>
        <button type="button" title={COMING_SOON} className="flex items-center gap-4 rounded-lg text-left">
          <img src={ADMIN_AVATAR} alt="" className="size-9 rounded-full" />
          <span className="w-[144px] leading-[1.45]">
            <span className="block text-[13px] font-semibold text-ink">Nguyễn Hoàng</span>
            <span className="block text-[11px] text-muted">Quản trị viên</span>
          </span>
          <ChevronDown size={16} className="text-secondary" />
        </button>
      </div>
    </header>
  )
}
