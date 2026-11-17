import { Search } from 'lucide-react'
import clsx from 'clsx'

export default function SearchInput({ value, onChange, placeholder, withIcon = true, className, autoFocus }) {
  return (
    <div className={clsx('relative', className)}>
      {withIcon && <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />}
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={clsx(
          'h-[42px] w-full rounded-lg border border-line bg-white pr-3 text-[13px] text-ink outline-none placeholder:text-muted',
          'focus:border-primary focus:ring-1 focus:ring-primary',
          withIcon ? 'pl-[38px]' : 'pl-3',
        )}
      />
    </div>
  )
}
