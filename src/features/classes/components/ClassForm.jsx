import { useState } from 'react'
import { useData } from '../../../context/DataContext.jsx'
import Button from '../../../components/ui/Button.jsx'
import Input from '../../../components/ui/Input.jsx'
import Select from '../../../components/ui/Select.jsx'
import FormField from '../../../components/ui/FormField.jsx'
import { COURSE_OPTIONS, FACULTY_OPTIONS, cohortOfCourse } from '../../../data/mock/faculties.js'
import { CLASS_STATUS_OPTIONS } from '../../../constants/status.js'
import { validateClass } from '../../../utils/validators.js'

export const EMPTY_CLASS = {
  id: '',
  name: '',
  facultyId: 'cntt',
  course: 'K2026',
  cohort: cohortOfCourse('K2026'),
  maxSize: 50,
  status: 'active',
}

/** Form dùng chung cho "Thêm lớp học" và "Chỉnh sửa lớp học" */
export default function ClassForm({ initial, mode, onSubmit, onCancel }) {
  const isEdit = mode === 'edit'
  const { classes, classSizes } = useData()
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})

  const set = (key) => (value) => {
    setV((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const text = (key) => (e) => set(key)(e.target.value)

  // Chọn khóa học -> tự điền niên khóa
  const onCourse = (course) => {
    setV((p) => ({ ...p, course, cohort: cohortOfCourse(course) || p.cohort }))
    setErrors((e) => ({ ...e, course: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validateClass(v, {
      existingIds: classes.map((c) => c.id),
      isEdit,
      currentSize: isEdit ? classSizes[v.id] || 0 : 0,
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSubmit({ ...v, id: v.id.trim(), name: v.name.trim(), cohort: v.cohort.trim(), maxSize: Number(v.maxSize) })
  }

  return (
    <form onSubmit={submit} noValidate className="overflow-hidden rounded-[10px] border border-line bg-white">
      <div className="px-[23px] pt-[21px] pb-6">
        <h2 className="text-[18px] leading-[27px] font-semibold text-ink-strong">Thông tin lớp học</h2>
        <p className="mt-1 text-[12px] leading-[18px] text-muted">Các trường có dấu * là bắt buộc.</p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-[18px]">
          <FormField
            variant="class"
            label="Mã lớp"
            required
            htmlFor="lh-id"
            error={errors.id}
            hint={isEdit ? 'Mã lớp không thể thay đổi sau khi tạo.' : 'Mã duy nhất, tối đa 20 ký tự.'}
            className="min-h-[104px]"
          >
            <Input id="lh-id" value={v.id} onChange={text('id')} disabled={isEdit} maxLength={20} placeholder="VD: LH009" error={errors.id} />
          </FormField>
          <FormField
            variant="class"
            label="Tên lớp"
            required
            htmlFor="lh-name"
            error={errors.name}
            hint={isEdit ? 'Tên lớp hiển thị trong toàn hệ thống.' : undefined}
            className="min-h-[104px]"
          >
            <Input id="lh-name" value={v.name} onChange={text('name')} placeholder="Nhập tên lớp học" error={errors.name} />
          </FormField>
          <FormField variant="class" label="Khoa phụ trách" required error={errors.facultyId} className="min-h-[80px]">
            <Select value={v.facultyId} onChange={set('facultyId')} options={FACULTY_OPTIONS} placeholder="Chọn khoa" error={errors.facultyId} aria-label="Khoa phụ trách" />
          </FormField>
          <FormField variant="class" label="Khóa học" required error={errors.course} className="min-h-[80px]">
            <Select value={v.course} onChange={onCourse} options={COURSE_OPTIONS} placeholder="Chọn khóa học" error={errors.course} aria-label="Khóa học" />
          </FormField>
          <FormField variant="class" label="Niên khóa" htmlFor="lh-cohort" className="min-h-[104px]">
            <Input id="lh-cohort" value={v.cohort} onChange={text('cohort')} placeholder="VD: 2024 – 2028" />
          </FormField>
          <FormField
            variant="class"
            label="Sĩ số tối đa"
            htmlFor="lh-max"
            error={errors.maxSize}
            hint="Số nguyên từ 1 đến 200 sinh viên."
            className="min-h-[104px]"
          >
            <Input id="lh-max" type="number" min={1} max={200} step={1} value={v.maxSize} onChange={text('maxSize')} error={errors.maxSize} />
          </FormField>
          <FormField variant="class" label="Trạng thái lớp học" className="col-span-2">
            <Select
              value={v.status}
              onChange={set('status')}
              options={CLASS_STATUS_OPTIONS}
              valueClassName={isEdit && v.status === 'active' ? 'text-green' : 'text-ink'}
              aria-label="Trạng thái lớp học"
            />
          </FormField>
        </div>
      </div>

      <div className="flex h-[72px] items-center justify-end gap-6 bg-page px-[76px]">
        <Button variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">{isEdit ? 'Lưu thay đổi' : 'Lưu lớp học'}</Button>
      </div>
    </form>
  )
}
