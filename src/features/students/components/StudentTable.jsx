import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import Avatar from '../../../components/ui/Avatar.jsx'
import Checkbox from '../../../components/ui/Checkbox.jsx'
import RowAction from '../../../components/table/RowAction.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'
import { facultyName } from '../../../data/mock/faculties.js'
import { formatDate } from '../../../utils/format.js'

const th = 'h-[42px] px-2 text-left text-[11px] font-semibold text-muted whitespace-nowrap'
const td = 'px-2 text-[11px] whitespace-nowrap'

export default function StudentTable({ rows, selection, onDelete }) {
  const ids = rows.map((r) => r.id)
  const head = selection.headerState(ids)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1080px] border-collapse">
        <thead className="border-y border-line">
          <tr>
            <th className="w-[48px] pl-4">
              <Checkbox {...head} onChange={(on) => selection.toggleAll(ids, on)} aria-label="Chọn tất cả" />
            </th>
            <th className={th}>Mã sinh viên</th>
            <th className={th}>Họ và tên</th>
            <th className={th}>Giới tính</th>
            <th className={th}>Ngày sinh</th>
            <th className={th}>Email</th>
            <th className={th}>Lớp</th>
            <th className={th}>Khoa</th>
            <th className={th}>Trạng thái</th>
            <th className={`${th} pr-4`}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="h-12 border-b border-line transition-colors last:border-b-0 hover:bg-[#f8fbff]">
              <td className="pl-4">
                <Checkbox checked={selection.selected.has(s.id)} onChange={() => selection.toggle(s.id)} aria-label={`Chọn ${s.fullName}`} />
              </td>
              <td className={td}>
                <Link to={`/students/${s.id}`} className="font-medium text-primary hover:underline">
                  {s.id}
                </Link>
              </td>
              <td className={td}>
                <div className="flex items-center gap-2">
                  <Avatar avatar={s.avatar} name={s.fullName} size={26} />
                  <span className="text-[12px] font-medium text-ink">{s.fullName}</span>
                </div>
              </td>
              <td className={`${td} text-ink`}>{s.gender}</td>
              <td className={`${td} text-muted`}>{formatDate(s.dob)}</td>
              <td className={`${td} text-muted`}>{s.email}</td>
              <td className={`${td} font-medium text-ink`}>{s.classId}</td>
              <td className={`${td} text-muted`}>{facultyName(s.facultyId)}</td>
              <td className={td}>
                <StatusBadge status={s.status} />
              </td>
              <td className={`${td} pr-4`}>
                <div className="flex items-center gap-1">
                  <RowAction label="Xem chi tiết" to={`/students/${s.id}`} icon={Eye} />
                  <RowAction label="Chỉnh sửa" to={`/students/${s.id}/edit`} icon={Pencil} />
                  <RowAction label="Xóa sinh viên" onClick={() => onDelete(s)} icon={Trash2} danger />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
