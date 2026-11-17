import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { STUDENT_STATUS } from '../../../constants/status.js'
import { formatNumber, formatPercent } from '../../../utils/format.js'

// Thứ tự hiển thị theo Figma
const ORDER = ['studying', 'graduated', 'reserved', 'suspended']

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="flex items-center gap-1.5 text-muted">
        <span className="size-2 rounded-full" style={{ background: d.color }} />
        {d.label}
      </p>
      <p className="font-semibold text-ink">
        {formatNumber(d.value)} sinh viên · {formatPercent(d.ratio)}
      </p>
    </div>
  )
}

export default function StatusDonutChart({ students }) {
  const total = students.length
  const data = ORDER.map((key) => {
    const value = students.filter((s) => s.status === key).length
    return { key, value, ratio: total ? value / total : 0, label: STUDENT_STATUS[key].label, color: STUDENT_STATUS[key].chart }
  })

  return (
    <div className="flex w-full items-center gap-[22px]">
      <div className="relative size-[168px] shrink-0">
        <PieChart width={168} height={168}>
          <Pie
            data={data.filter((d) => d.value > 0)}
            dataKey="value"
            nameKey="label"
            innerRadius={68}
            outerRadius={84}
            startAngle={90}
            endAngle={-270}
            stroke="#ffffff"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {data
              .filter((d) => d.value > 0)
              .map((d) => (
                <Cell key={d.key} fill={d.color} />
              ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} wrapperStyle={{ zIndex: 10 }} />
        </PieChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[27px] leading-[38px] font-semibold text-ink-strong">{formatNumber(total)}</p>
          <p className="text-[12px] leading-[17px] text-muted">Sinh viên</p>
        </div>
      </div>

      {/* Chú giải: luôn có nhãn + phần trăm, không chỉ dựa vào màu */}
      <ul className="flex min-w-0 flex-1 flex-col gap-3.5">
        {data.map((d) => (
          <li key={d.key} className="flex h-6 items-center gap-2 text-[12px] leading-[17px]">
            <span className="size-2 shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 text-secondary">{d.label}</span>
            <span className="font-semibold text-ink-strong">{formatPercent(d.ratio)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
