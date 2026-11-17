import { Plus, School, SquareCheck, Trash2, Users } from 'lucide-react'
import clsx from 'clsx'
import { timeAgo } from '../../../utils/format.js'

const TYPES = {
  'student-add': { icon: Plus, cls: 'bg-tint text-primary' },
  'student-update': { icon: Users, cls: 'bg-violet-tint text-violet' },
  'student-delete': { icon: Trash2, cls: 'bg-danger-tint text-danger' },
  'class-add': { icon: School, cls: 'bg-amber-tint text-amber' },
  'class-update': { icon: School, cls: 'bg-amber-tint text-amber' },
  'class-delete': { icon: School, cls: 'bg-danger-tint text-danger' },
  academic: { icon: SquareCheck, cls: 'bg-green-tint text-green' },
}

export default function RecentActivities({ activities }) {
  const items = activities.slice(0, 4)
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-line bg-white p-5">
      <div className="flex h-[25px] items-center gap-2.5">
        <h2 className="flex-1 text-[16px] leading-[22px] font-semibold text-ink-strong">Hoạt động gần đây</h2>
        <span className="text-[11px] font-medium text-muted">Hôm nay</span>
      </div>
      {items.length === 0 ? (
        <p className="py-8 text-center text-[12px] text-muted">Chưa có hoạt động nào.</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((a) => {
            const t = TYPES[a.type] ?? TYPES.academic
            const Icon = t.icon
            return (
              <li key={a.id} className="flex h-[50px] items-center gap-3">
                <span className={clsx('flex size-8 shrink-0 items-center justify-center rounded-lg', t.cls)}>
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1 text-[12px] leading-[17px]">
                  <p className="truncate font-semibold text-ink-strong">{a.title}</p>
                  <p className="truncate text-muted">{a.description}</p>
                </div>
                <span className="shrink-0 text-[11px] leading-[15px] text-muted">{timeAgo(a.createdAt)}</span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
