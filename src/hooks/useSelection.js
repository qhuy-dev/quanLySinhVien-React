import { useCallback, useState } from 'react'

// Chọn dòng trong bảng (chỉ hiển thị — thiết kế chưa có thao tác hàng loạt)
export default function useSelection() {
  const [selected, setSelected] = useState(() => new Set())

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const toggleAll = useCallback((ids, on) => {
    setSelected((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => (on ? next.add(id) : next.delete(id)))
      return next
    })
  }, [])

  const headerState = (ids) => {
    const n = ids.filter((id) => selected.has(id)).length
    return { checked: n > 0 && n === ids.length, indeterminate: n > 0 && n < ids.length }
  }

  return { selected, toggle, toggleAll, headerState }
}
