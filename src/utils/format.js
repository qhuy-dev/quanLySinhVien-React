// ISO yyyy-mm-dd -> dd/mm/yyyy
export function formatDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.slice(0, 10).split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}

export function formatNumber(n) {
  return Number(n || 0).toLocaleString('vi-VN')
}

// 0.89 -> "89,0%"
export function formatPercent(ratio, digits = 1) {
  const v = Number.isFinite(ratio) ? ratio * 100 : 0
  return `${v.toLocaleString('vi-VN', { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`
}

export function formatLongDate(date = new Date()) {
  const weekday = date.toLocaleDateString('vi-VN', { weekday: 'long' })
  const cap = weekday.charAt(0).toUpperCase() + weekday.slice(1)
  return `${cap}, ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`
}

export function timeAgo(iso, now = Date.now()) {
  const diff = Math.max(0, now - new Date(iso).getTime())
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'Vừa xong'
  if (min < 60) return `${min} phút trước`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} giờ trước`
  const d = Math.floor(h / 24)
  return `${d} ngày trước`
}

export function todayISO() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
export function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
}
