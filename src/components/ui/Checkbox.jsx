import { Check, Minus } from 'lucide-react'
import clsx from 'clsx'

export default function Checkbox({ checked, indeterminate, onChange, 'aria-label': ariaLabel }) {
  const on = checked || indeterminate
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : !!checked}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!checked)}
      className={clsx(
        'flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        on ? 'border-primary bg-primary text-white' : 'border-line-strong bg-white hover:border-primary',
      )}
    >
      {indeterminate ? <Minus size={12} strokeWidth={3} /> : checked && <Check size={12} strokeWidth={3} />}
    </button>
  )
}
