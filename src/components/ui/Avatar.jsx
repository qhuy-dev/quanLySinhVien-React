import clsx from 'clsx'
import { resolveAvatar } from '../../data/avatars.js'

function initials(name = '') {
  const parts = name.trim().split(/\s+/)
  return ((parts.at(-2)?.[0] ?? '') + (parts.at(-1)?.[0] ?? '')).toUpperCase()
}

export default function Avatar({ src, avatar, name, size = 26, className }) {
  const url = src ?? resolveAvatar(avatar, size > 52)
  const style = { width: size, height: size }
  if (url) {
    return <img src={url} alt={name || ''} style={style} className={clsx('shrink-0 rounded-full object-cover', className)} />
  }
  return (
    <span
      style={{ ...style, fontSize: Math.max(10, size * 0.36) }}
      className={clsx('flex shrink-0 items-center justify-center rounded-full bg-tint font-semibold text-primary', className)}
      aria-label={name}
    >
      {initials(name)}
    </span>
  )
}
