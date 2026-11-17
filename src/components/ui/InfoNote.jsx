import clsx from 'clsx'

const TONES = {
  info: 'bg-tint text-primary-hover',
  muted: 'bg-page text-muted',
  danger: 'bg-danger-tint text-danger',
}

export default function InfoNote({ icon: Icon, tone = 'info', className, children }) {
  return (
    <div className={clsx('flex items-start gap-2 rounded-lg p-2.5', TONES[tone], className)}>
      {Icon && <Icon size={tone === 'muted' ? 14 : 16} className="mt-px shrink-0" />}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
