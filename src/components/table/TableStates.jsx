import { CircleAlert, Search } from 'lucide-react'
import Button from '../ui/Button.jsx'

// 01 / LOADING
export function TableSkeleton({ rows = 5, label }) {
  return (
    <div className="px-6 py-6" aria-busy="true" aria-live="polite">
      {label && <p className="sr-only">{label}</p>}
      <div className="flex flex-col gap-6">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-3.5">
            <div className="size-[30px] rounded-full bg-page" />
            <div className="flex flex-col gap-2">
              <div className={`h-2.5 rounded bg-line ${i % 2 ? 'w-[200px]' : 'w-[260px]'}`} />
              <div className="h-2 w-[156px] rounded bg-page" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 02 / EMPTY STATE
export function EmptyState({ title, description, actionLabel = 'Xóa bộ lọc', onAction }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="flex size-[60px] items-center justify-center rounded-full bg-tint text-primary">
        <Search size={22} />
      </div>
      <p className="mt-4 text-[17px] font-semibold text-ink">{title}</p>
      <p className="mt-2 max-w-[380px] text-[12px] text-muted">{description}</p>
      {onAction && (
        <Button variant="secondary" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

// 03 / ERROR STATE
export function ErrorState({ title, description, onRetry }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="flex size-[60px] items-center justify-center rounded-full bg-danger-tint text-danger">
        <CircleAlert size={22} />
      </div>
      <p className="mt-4 text-[17px] font-semibold text-ink">{title}</p>
      <p className="mt-2 max-w-[380px] text-[12px] text-muted">{description}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  )
}
