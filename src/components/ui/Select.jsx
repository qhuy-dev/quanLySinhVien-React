import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

/**
 * Dropdown tùy biến theo Figma (trạng thái "Mở bộ lọc khoa", "Mở số dòng").
 * options: [{ value, label }]
 */
export default function Select({
  value,
  onChange,
  options,
  placeholder = 'Chọn',
  error,
  disabled,
  size = 'md',
  className,
  menuClassName,
  valueClassName,
  'aria-label': ariaLabel,
  id,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const autoId = useId()
  const listId = `${id || autoId}-list`
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (v) => {
    onChange?.(v)
    setOpen(false)
  }

  return (
    <div ref={ref} className={clsx('relative', className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={error ? true : undefined}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'flex w-full items-center justify-between gap-2 rounded-lg border bg-white text-left leading-[1.45] outline-none transition-colors',
          size === 'sm' ? 'h-9 px-2.5 text-[12px]' : 'h-[42px] px-3 text-[13px]',
          error ? 'border-danger' : open ? 'border-primary ring-1 ring-primary' : 'border-line',
          !error && 'focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary',
          disabled && 'cursor-not-allowed bg-field-disabled',
        )}
      >
        <span className={clsx('truncate', selected ? (valueClassName ?? 'text-ink') : 'text-muted')}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} className={clsx('shrink-0 text-muted transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          className={clsx(
            'absolute left-0 z-30 mt-1 max-h-64 min-w-full overflow-auto rounded-lg border border-line bg-white py-1 shadow-[0_8px_24px_rgba(15,23,42,0.12)]',
            menuClassName,
          )}
        >
          {options.map((o) => {
            const active = o.value === value
            return (
              <li key={String(o.value)} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => pick(o.value)}
                  className={clsx(
                    'block w-full px-3 py-2 text-left whitespace-nowrap',
                    size === 'sm' ? 'text-[12px]' : 'text-[13px]',
                    active ? 'bg-tint font-medium text-primary' : 'text-ink hover:bg-page',
                  )}
                >
                  {o.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
