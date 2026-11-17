import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import Avatar from '../../../components/ui/Avatar.jsx'
import Button from '../../../components/ui/Button.jsx'
import { AVATAR_MAX_BYTES, AVATAR_TYPES } from '../../../utils/validators.js'
import { fileToAvatarDataUrl } from '../../../utils/image.js'

export default function AvatarUpload({ value, name, onChange }) {
  const input = useRef(null)
  const [error, setError] = useState('')

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!AVATAR_TYPES.includes(file.type)) return setError('Chỉ chấp nhận ảnh JPG hoặc PNG.')
    if (file.size > AVATAR_MAX_BYTES) return setError('Dung lượng ảnh vượt quá 2MB.')
    try {
      onChange(await fileToAvatarDataUrl(file))
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center gap-[18px] py-1">
      {value ? (
        <Avatar avatar={value} name={name} size={72} />
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          aria-label="Tải ảnh lên"
          className="flex size-[76px] shrink-0 items-center justify-center rounded-full border border-dashed border-line-strong bg-page text-muted hover:border-primary hover:text-primary"
        >
          <Upload size={24} />
        </button>
      )}
      <div className="flex flex-col gap-1.5">
        <p className="text-[12px] font-medium text-ink">Ảnh đại diện</p>
        <Button variant="secondary" className="w-fit" onClick={() => input.current?.click()}>
          {value ? 'Thay đổi ảnh' : 'Tải ảnh lên'}
        </Button>
        <p className={`text-[10px] ${error ? 'text-danger' : 'text-muted'}`}>{error || 'JPG hoặc PNG. Dung lượng tối đa 2MB.'}</p>
      </div>
      <input ref={input} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onFile} />
    </div>
  )
}
