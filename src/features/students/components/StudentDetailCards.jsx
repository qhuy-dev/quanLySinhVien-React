import { ChartColumn, GraduationCap, User } from 'lucide-react'
import Card, { CardTitle } from '../../../components/ui/Card.jsx'
import { facultyName } from '../../../data/mock/faculties.js'
import { formatDate } from '../../../utils/format.js'

const TOTAL_CREDITS = 140

function Field({ label, value, className }) {
  return (
    <div className={`flex min-w-0 flex-col gap-[5px] ${className ?? ''}`}>
      <p className="text-[11px] text-muted">{label}</p>
      <p className="text-[13px] font-medium break-words text-ink">{value || '—'}</p>
    </div>
  )
}

export function PersonalInfoCard({ student }) {
  return (
    <Card className="flex flex-col gap-5 p-6">
      <CardTitle icon={User}>Thông tin cá nhân</CardTitle>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Ngày sinh" value={formatDate(student.dob)} />
        <Field label="Giới tính" value={student.gender} />
        <Field label="Email" value={student.email} />
        <Field label="Số điện thoại" value={student.phone} />
        <Field label="Địa chỉ" value={student.address} className="col-span-2" />
      </div>
    </Card>
  )
}

export function AcademicInfoCard({ student }) {
  return (
    <Card className="flex flex-col gap-5 p-6">
      <CardTitle icon={GraduationCap}>Thông tin học tập</CardTitle>
      <Field label="Khoa" value={facultyName(student.facultyId)} />
      <div className="grid grid-cols-2 gap-5">
        <Field label="Lớp" value={student.classId} />
        <Field label="Khóa học" value={student.cohort} />
      </div>
      <Field label="Ngày nhập học" value={formatDate(student.enrollmentDate)} />
    </Card>
  )
}

// Xếp loại theo GPA thang 4 (3.65 → "Giỏi" như Figma)
export function rankOf(gpa) {
  if (gpa == null) return '—'
  if (gpa >= 3.8) return 'Xuất sắc'
  if (gpa >= 3.2) return 'Giỏi'
  if (gpa >= 2.5) return 'Khá'
  if (gpa >= 2.0) return 'Trung bình'
  return 'Yếu'
}

export function AcademicResultCard({ student }) {
  const credits = student.credits || 0
  const pct = Math.min(100, (credits / TOTAL_CREDITS) * 100)
  return (
    <Card className="flex flex-col gap-5 p-6">
      <CardTitle icon={ChartColumn}>Kết quả học tập</CardTitle>
      <div className="grid grid-cols-3 gap-7">
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-muted">GPA tích lũy</p>
          <p className="flex items-center gap-1.5">
            <span className="text-[30px] leading-[1.2] font-semibold text-primary">
              {student.gpa != null ? student.gpa.toFixed(2) : '—'}
            </span>
            <span className="text-[14px] text-muted">/ 4.00</span>
          </p>
          <p className="text-[10px] text-subtle">Thang điểm 4</p>
        </div>
        <div className="flex flex-col gap-[7px]">
          <p className="text-[12px] text-muted">Tín chỉ tích lũy</p>
          <p className="flex items-center gap-1.5">
            <span className="text-[26px] leading-[1.2] font-semibold text-ink">{credits}</span>
            <span className="text-[12px] text-muted">/ {TOTAL_CREDITS} tín chỉ</span>
          </p>
          <div className="h-1.5 w-full max-w-[300px] overflow-hidden rounded bg-tint" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-muted">Xếp loại học lực</p>
          <p className="text-[26px] leading-[1.45] font-semibold text-ink">{rankOf(student.gpa)}</p>
          <p className="text-[10px] text-subtle">Theo kết quả học tập tích lũy</p>
        </div>
      </div>
    </Card>
  )
}
