import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { formatDate } from '../../utils/format.js'

// Trường ngày hiển thị dd/mm/yyyy kèm chevron như Figma; dùng date picker gốc của trình duyệt
export default function DateInput({ value, onChange, error, placeholder = 'dd/mm/yyyy', id, max, min }) {
  return (
    <div
      className={clsx(
        'relative flex h-[42px] w-full items-center justify-between rounded-lg border bg-white px-3 text-[13px] transition-colors',
        error ? 'border-danger' : 'border-line focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
      )}
    >
      <span className={value ? 'text-ink' : 'text-muted'}>{value ? formatDate(value) : placeholder}</span>
      <ChevronDown size={16} className="text-muted" />
      <input
        id={id}
        type="date"
        value={value || ''}
        min={min}
        max={max}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}
