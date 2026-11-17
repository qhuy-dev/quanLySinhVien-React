import { useMemo, useState } from 'react'
import { GraduationCap, Info, Lock, User } from 'lucide-react'
import { useData } from '../../../context/DataContext.jsx'
import Card, { CardTitle } from '../../../components/ui/Card.jsx'
import Button from '../../../components/ui/Button.jsx'
import Input from '../../../components/ui/Input.jsx'
import Select from '../../../components/ui/Select.jsx'
import DateInput from '../../../components/ui/DateInput.jsx'
import FormField from '../../../components/ui/FormField.jsx'
import InfoNote from '../../../components/ui/InfoNote.jsx'
import AvatarUpload from './AvatarUpload.jsx'
import { COHORT_OPTIONS, FACULTY_OPTIONS } from '../../../data/mock/faculties.js'
import { GENDER_OPTIONS, STUDENT_STATUS_OPTIONS } from '../../../constants/status.js'
import { validateStudent } from '../../../utils/validators.js'
import { todayISO } from '../../../utils/format.js'

export const EMPTY_STUDENT = {
  avatar: null,
  fullName: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  facultyId: '',
  classId: '',
  cohort: '',
  enrollmentDate: '',
  status: 'studying',
  gpa: null,
  credits: 0,
}

/** Form dùng chung cho "Thêm sinh viên" và "Chỉnh sửa sinh viên" */
export default function StudentForm({ initial, mode, onSubmit, onCancel }) {
  const isEdit = mode === 'edit'
  const { classes, classSizes } = useData()
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})

  const set = (key) => (value) => {
    setV((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const text = (key) => (e) => set(key)(e.target.value)

  const classOptions = useMemo(
    () =>
      classes
        .filter((c) => c.facultyId === v.facultyId)
        .map((c) => ({ value: c.id, label: `${c.id} · ${c.name}` })),
    [classes, v.facultyId],
  )

  const onFaculty = (facultyId) => {
    setV((p) => ({ ...p, facultyId, classId: classes.find((c) => c.id === p.classId)?.facultyId === facultyId ? p.classId : '' }))
    setErrors((e) => ({ ...e, facultyId: undefined }))
  }

  // Khóa học của sinh viên lấy theo niên khóa của lớp
  const onClass = (classId) => {
    const cls = classes.find((c) => c.id === classId)
    setV((p) => ({ ...p, classId, cohort: cls?.cohort ?? p.cohort }))
    setErrors((e) => ({ ...e, classId: undefined, cohort: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validateStudent(v)
    const cls = classes.find((c) => c.id === v.classId)
    const joining = !isEdit || initial.classId !== v.classId
    if (cls && joining && (classSizes[cls.id] || 0) >= cls.maxSize) {
      errs.classId = `Lớp ${cls.id} đã đủ sĩ số (${cls.maxSize} sinh viên).`
    }
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSubmit({
      ...v,
      fullName: v.fullName.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      address: v.address.trim(),
    })
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6">
        {/* Thông tin cá nhân */}
        <Card className="flex flex-col gap-3 p-6">
          <CardTitle icon={User} className="h-[34px]">
            Thông tin cá nhân
          </CardTitle>
          <AvatarUpload value={v.avatar} name={v.fullName} onChange={set('avatar')} />

          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <FormField
              label="Mã sinh viên"
              required
              htmlFor="sv-id"
              hint={isEdit ? 'Mã sinh viên không thể thay đổi.' : 'Mã sinh viên được tạo tự động.'}
              className="min-h-[90px]"
            >
              <Input id="sv-id" value={v.id} disabled readOnly className={isEdit ? '' : 'disabled:text-ink'} />
            </FormField>
            <FormField label="Họ và tên" required htmlFor="sv-name" error={errors.fullName} className="min-h-[90px]">
              <Input id="sv-name" value={v.fullName} onChange={text('fullName')} placeholder="Nhập họ và tên" error={errors.fullName} />
            </FormField>
            <FormField label="Ngày sinh" required htmlFor="sv-dob" error={errors.dob} className="min-h-[90px]">
              <DateInput id="sv-dob" value={v.dob} onChange={set('dob')} error={errors.dob} max={todayISO()} />
            </FormField>
            <FormField label="Giới tính" required error={errors.gender} className="min-h-[90px]">
              <Select value={v.gender} onChange={set('gender')} options={GENDER_OPTIONS} placeholder="Chọn giới tính" error={errors.gender} aria-label="Giới tính" />
            </FormField>
            <FormField label="Số điện thoại" htmlFor="sv-phone" error={errors.phone} className="min-h-[90px]">
              <Input id="sv-phone" type="tel" value={v.phone} onChange={text('phone')} placeholder="Nhập số điện thoại" error={errors.phone} />
            </FormField>
            <FormField label="Email" required htmlFor="sv-email" error={errors.email} className="min-h-[90px]">
              <Input id="sv-email" type="email" value={v.email} onChange={text('email')} placeholder="ten@sv.edu.vn" error={errors.email} />
            </FormField>
          </div>
          <FormField label="Địa chỉ" htmlFor="sv-address" className="min-h-[90px]">
            <Input id="sv-address" value={v.address} onChange={text('address')} placeholder="Nhập địa chỉ" />
          </FormField>

          <InfoNote icon={Lock} tone="muted" className="text-[10px]">
            Thông tin sinh viên được bảo mật và chỉ dành cho người có quyền truy cập.
          </InfoNote>
        </Card>

        {/* Thông tin học tập */}
        <Card className="flex flex-col gap-2.5 p-6">
          <CardTitle icon={GraduationCap} className="h-[34px]">
            Thông tin học tập
          </CardTitle>
          <FormField label="Khoa" required error={errors.facultyId} className="min-h-[90px]">
            <Select value={v.facultyId} onChange={onFaculty} options={FACULTY_OPTIONS} placeholder="Chọn khoa" error={errors.facultyId} aria-label="Khoa" />
          </FormField>
          <FormField label="Lớp" required error={errors.classId} hint="Chọn khoa trước để hiển thị lớp." className="min-h-[90px]">
            <Select
              value={v.classId}
              onChange={onClass}
              options={classOptions}
              placeholder="Chọn lớp"
              disabled={!v.facultyId}
              error={errors.classId}
              aria-label="Lớp"
            />
          </FormField>
          <FormField label="Khóa học" required error={errors.cohort} className="min-h-[90px]">
            <Select value={v.cohort} onChange={set('cohort')} options={COHORT_OPTIONS} placeholder="Chọn khóa học" error={errors.cohort} aria-label="Khóa học" />
          </FormField>
          <FormField label="Ngày nhập học" required htmlFor="sv-enroll" error={errors.enrollmentDate} className="min-h-[90px]">
            <DateInput id="sv-enroll" value={v.enrollmentDate} onChange={set('enrollmentDate')} error={errors.enrollmentDate} />
          </FormField>
          <FormField label="Trạng thái học tập" required error={errors.status} className="min-h-[90px]">
            <Select value={v.status} onChange={set('status')} options={STUDENT_STATUS_OPTIONS} error={errors.status} aria-label="Trạng thái học tập" />
          </FormField>
          <InfoNote icon={Info} tone="info" className="text-[11px]">
            Kiểm tra chính xác khoa và lớp trước khi lưu hồ sơ.
          </InfoNote>
        </Card>
      </div>

      {/* Thanh lưu biểu mẫu */}
      <Card className="flex h-16 items-center justify-between gap-4 py-[11px] pr-[11px] pl-3">
        {isEdit ? (
          <p className="flex items-center gap-2 text-[11px] text-muted">
            <Lock size={14} /> Mã sinh viên được khóa để đảm bảo tính nhất quán của hồ sơ.
          </p>
        ) : (
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="text-[12px] font-medium text-danger">*</span> Vui lòng điền đầy đủ các trường bắt buộc.
          </p>
        )}
        <div className="flex gap-2.5">
          <Button variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit">{isEdit ? 'Lưu thay đổi' : 'Lưu sinh viên'}</Button>
        </div>
      </Card>
    </form>
  )
}
