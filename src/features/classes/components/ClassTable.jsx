import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import Checkbox from '../../../components/ui/Checkbox.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'
import RowAction from '../../../components/table/RowAction.jsx'
import { facultyName } from '../../../data/mock/faculties.js'

const th = 'px-2 text-left text-[11px] leading-[17px] font-semibold text-secondary'
const td = 'px-2 text-[12px] leading-[18px] whitespace-nowrap'

export default function ClassTable({ rows, startIndex, classSizes, selection, onDelete }) {
  const ids = rows.map((r) => r.id)
  const head = selection.headerState(ids)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead className="bg-page">
          <tr className="h-[52px]">
            <th className="w-[36px] pl-5">
              <Checkbox {...head} onChange={(on) => selection.toggleAll(ids, on)} aria-label="Chọn tất cả" />
            </th>
            <th className={`${th} w-[38px]`}>STT</th>
            <th className={`${th} w-[76px]`}>Mã lớp</th>
            <th className={th}>Tên lớp</th>
            <th className={th}>Khoa phụ trách</th>
            <th className={`${th} w-[84px]`}>Khóa học</th>
            <th className={`${th} w-[92px]`}>
              Số lượng
              <br />
              sinh viên
            </th>
            <th className={`${th} w-[164px]`}>Trạng thái</th>
            <th className={`${th} w-[140px]`}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c, i) => (
            <tr key={c.id} className="h-[66px] border-b border-line transition-colors hover:bg-tint/70">
              <td className="pl-5">
                <Checkbox checked={selection.selected.has(c.id)} onChange={() => selection.toggle(c.id)} aria-label={`Chọn lớp ${c.id}`} />
              </td>
              <td className={`${td} text-muted`}>{startIndex + i}</td>
              <td className={td}>
                <Link to={`/classes/${c.id}`} className="font-medium text-primary hover:underline">
                  {c.id}
                </Link>
              </td>
              <td className={`${td} font-medium text-ink-strong`}>{c.name}</td>
              <td className={`${td} text-ink-strong`}>{facultyName(c.facultyId)}</td>
              <td className={`${td} text-ink-strong`}>{c.course}</td>
              <td className={`${td} text-ink-strong`}>{classSizes[c.id] || 0} SV</td>
              <td className={td}>
                <StatusBadge kind="class" status={c.status} />
              </td>
              <td className={td}>
                <div className="flex items-center gap-0.5">
                  <RowAction size="md" label="Xem chi tiết" to={`/classes/${c.id}`} icon={Eye} />
                  <RowAction size="md" label="Chỉnh sửa" to={`/classes/${c.id}/edit`} icon={Pencil} />
                  <RowAction size="md" label="Xóa lớp học" onClick={() => onDelete(c)} icon={Trash2} danger />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
