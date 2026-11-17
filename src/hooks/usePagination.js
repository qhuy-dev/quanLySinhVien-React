import { useEffect, useMemo, useState } from 'react'

// Phân trang phía client; tự về trang 1 khi bộ lọc (resetKey) đổi
export default function usePagination(items, { initialSize = 10, resetKey } = {}) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialSize)
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))

  useEffect(() => {
    setPage(1)
  }, [resetKey, pageSize])
  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize])
  const from = items.length ? (page - 1) * pageSize + 1 : 0
  const to = Math.min(page * pageSize, items.length)

  return { page, setPage, pageSize, setPageSize, pageCount, pageItems, from, to, total: items.length }
}
