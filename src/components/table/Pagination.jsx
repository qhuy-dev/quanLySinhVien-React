import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import Select from '../ui/Select.jsx'
import { PAGE_SIZE_OPTIONS } from '../../constants/status.js'

// 1 2 3 … N — luôn giữ trang đầu, trang cuối và các trang quanh trang hiện tại
export function pageItems(page, count) {
  if (count <= 1) return [1]
  const set = new Set([1, count, page - 1, page, page + 1])
  if (page <= 3) [2, 3].forEach((p) => set.add(p))
  if (page >= count - 2) [count - 1, count - 2].forEach((p) => set.add(p))
  const pages = [...set].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b)
  const out = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) out.push('…')
    out.push(p)
  })
  return out
}

/**
 * variant 'plain' : số trang trơn (Figma sinh viên)
 * variant 'boxed' : ô có viền 36px (Figma lớp học)
 */
export default function Pagination({
  page,
  pageCount,
  onPageChange,
  pageSize,
  onPageSizeChange,
  variant = 'plain',
  pageSizeLabel = 'Số dòng mỗi trang',
  pageSizeFormat = (n) => String(n),
  pageSizeClassName,
}) {
  const boxed = variant === 'boxed'
  const base = clsx(
    'flex items-center justify-center rounded-md text-[12px] font-medium transition-colors',
    boxed ? 'size-9 border' : 'h-[30px] min-w-[30px] px-1.5',
  )
  const idle = boxed ? 'border-line bg-white' : ''
  const go = (p) => p >= 1 && p <= pageCount && p !== page && onPageChange(p)

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {onPageSizeChange && (
        <div className="flex items-center gap-2.5">
          {pageSizeLabel && <span className="text-[12px] text-muted">{pageSizeLabel}</span>}
          <Select
            size={boxed ? 'md' : 'sm'}
            value={pageSize}
            onChange={onPageSizeChange}
            options={PAGE_SIZE_OPTIONS.map((n) => ({ value: n, label: pageSizeFormat(n) }))}
            className={pageSizeClassName ?? (boxed ? 'w-[70px]' : 'w-[66px]')}
            menuClassName="bottom-full mb-1 mt-0"
            aria-label={pageSizeLabel || 'Số dòng mỗi trang'}
          />
        </div>
      )}
      <nav className={clsx('flex items-center', boxed ? 'gap-2' : 'gap-1.5')} aria-label="Phân trang">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Trang trước"
          className={clsx(base, idle, 'text-secondary hover:bg-page disabled:text-line-strong')}
        >
          <ChevronLeft size={16} />
        </button>
        {pageItems(page, pageCount).map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className={clsx(base, idle, 'text-muted')}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-current={p === page ? 'page' : undefined}
              className={clsx(
                base,
                p === page ? 'border-primary bg-primary text-white' : clsx(idle, 'text-secondary hover:bg-page'),
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page >= pageCount}
          aria-label="Trang sau"
          className={clsx(base, idle, 'text-secondary hover:bg-page disabled:text-line-strong')}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  )
}
