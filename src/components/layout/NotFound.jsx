import { SearchX } from 'lucide-react'
import Button from '../ui/Button.jsx'

export default function NotFound({ title, description = 'Bản ghi không tồn tại hoặc đã bị xóa.', backTo, backLabel = 'Quay lại danh sách' }) {
  return (
    <div className="flex flex-col items-center rounded-[10px] border border-line bg-white px-6 py-16 text-center">
      <div className="flex size-[60px] items-center justify-center rounded-full bg-tint text-primary">
        <SearchX size={22} />
      </div>
      <p className="mt-4 text-[17px] font-semibold text-ink">{title}</p>
      <p className="mt-2 text-[12px] text-muted">{description}</p>
      <Button variant="secondary" className="mt-4" to={backTo}>
        {backLabel}
      </Button>
    </div>
  )
}
