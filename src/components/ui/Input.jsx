import { forwardRef } from 'react'
import clsx from 'clsx'

// Trạng thái: mặc định / focus (viền xanh 2px) / lỗi (viền đỏ) / không khả dụng (nền xám)
export function fieldClasses({ error, disabled, className } = {}) {
  return clsx(
    'h-[42px] w-full rounded-lg border px-3 text-[13px] leading-[1.45] outline-none transition-colors',
    'placeholder:text-muted',
    error ? 'border-danger' : 'border-line',
    !error && 'focus:border-primary focus:ring-1 focus:ring-primary',
    disabled ? 'cursor-not-allowed bg-field-disabled text-muted' : 'bg-white text-ink',
    className,
  )
}

const Input = forwardRef(function Input({ error, className, disabled, ...props }, ref) {
  return (
    <input
      ref={ref}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      className={fieldClasses({ error, disabled, className })}
      {...props}
    />
  )
})

export default Input
