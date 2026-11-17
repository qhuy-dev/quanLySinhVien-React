import clsx from 'clsx'

const TONES = {
  blue: 'bg-tint text-primary',
  violet: 'bg-violet-tint text-violet',
  amber: 'bg-amber-tint text-amber',
  green: 'bg-green-tint text-green',
}

/**
 * Thẻ chỉ số. variant theo từng màn Figma:
 *  - dashboard: nhãn 12px, số 28px, bo 12px, có bóng nhẹ
 *  - student  : nhãn 12px, số 27px, chú thích 10px
 *  - class    : nhãn 13px, số 30px, chú thích 11px
 */
export default function StatCard({ label, value, sub, icon: Icon, tone = 'blue', variant = 'student' }) {
  const v = {
    dashboard: {
      box: 'rounded-xl p-[18px] shadow-[0_2px_3px_rgba(15,23,41,0.04)] min-h-[112px]',
      label: 'text-[12px] leading-[17px] font-medium',
      value: 'text-[28px] leading-[41px] text-ink-strong',
      sub: 'text-[12px] leading-[17px]',
      icon: 'rounded-[9px]',
    },
    student: {
      box: 'rounded-[10px] px-[18px] pt-4 pb-[18px] min-h-[104px]',
      label: 'text-[12px] leading-[1.45] font-medium',
      value: 'text-[27px] leading-[1.2] text-ink mt-1',
      sub: 'text-[10px] leading-[1.45] text-subtle mt-2',
      icon: 'rounded-[9px]',
    },
    class: {
      box: 'rounded-[10px] px-[19px] pt-4 pb-4 min-h-[126px]',
      label: 'text-[13px] leading-5 font-medium',
      value: 'text-[30px] leading-[45px] text-ink-strong mt-1.5',
      sub: 'text-[11px] leading-[17px] text-muted mt-1',
      icon: 'rounded-lg',
    },
  }[variant]

  return (
    <div className={clsx('flex min-w-0 flex-1 items-start gap-3 border border-line bg-white', v.box)}>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={clsx('text-muted', v.label)}>{label}</p>
        <p className={clsx('font-semibold', v.value)}>{value}</p>
        {sub && <div className={clsx(v.sub)}>{sub}</div>}
      </div>
      {Icon && (
        <div className={clsx('flex size-9 shrink-0 items-center justify-center', v.icon, TONES[tone])}>
          <Icon size={19} />
        </div>
      )}
    </div>
  )
}
