import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatNumber } from '../../../utils/format.js'

const PRIMARY = '#2563eb'
const BAR = '#93c5fd'
const MUTED = '#64748b'

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { year, value } = payload[0].payload
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
      <p className="text-muted">Năm {year}</p>
      <p className="font-semibold text-ink">{formatNumber(value)} sinh viên</p>
    </div>
  )
}

// Biểu đồ cột — năm hiện tại tô đậm màu chính (Figma "Số lượng sinh viên theo năm học")
export default function StudentsByYearChart({ data, highlightYear }) {
  const isHi = (year) => year === highlightYear

  const YearTick = ({ x, y, payload }) => (
    <text
      x={x}
      y={y + 14}
      textAnchor="middle"
      fontSize={12}
      fill={isHi(payload.value) ? PRIMARY : MUTED}
      fontWeight={isHi(payload.value) ? 600 : 400}
    >
      {payload.value}
    </text>
  )

  return (
    <ResponsiveContainer width="100%" height={196}>
      <BarChart data={data} margin={{ top: 24, right: 0, left: -8, bottom: 0 }} barCategoryGap="38%">
        <CartesianGrid vertical={false} stroke="#e2e8f0" />
        <YAxis
          domain={[0, 3000]}
          ticks={[0, 1000, 2000, 3000]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: MUTED }}
          width={48}
        />
        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={<YearTick />} height={30} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={46} isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.year} fill={isHi(d.year) ? PRIMARY : BAR} />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            offset={6}
            content={({ x, y, width, value, index }) => {
              const hi = isHi(data[index].year)
              return (
                <text
                  x={x + width / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={hi ? 600 : 500}
                  fill={hi ? PRIMARY : '#475569'}
                >
                  {value}
                </text>
              )
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
