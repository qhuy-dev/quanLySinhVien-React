import { MOCK_CLASSES } from './classes.js'
import { FEMALE_AVATARS, MALE_AVATARS } from '../avatars.js'
import { normalize } from '../../utils/format.js'

const classById = Object.fromEntries(MOCK_CLASSES.map((c) => [c.id, c]))
const startYear = (classId) => Number(classById[classId].cohort.slice(0, 4))

const ADDRESSES = [
  '25 Nguyễn Trãi, Phường Bến Thành, TP. Hồ Chí Minh',
  '12 Lê Lợi, Phường Sài Gòn, TP. Hồ Chí Minh',
  '88 Trần Hưng Đạo, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh',
  '41 Võ Văn Tần, Phường Xuân Hòa, TP. Hồ Chí Minh',
  '7 Phan Đình Phùng, Phường Ba Đình, Hà Nội',
  '150 Nguyễn Văn Linh, Phường Hải Châu, Đà Nẵng',
]

// 10 sinh viên đầu theo Figma "01 · Danh sách sinh viên"
const FIGMA_ROWS = [
  ['Nguyễn Minh Anh', 'Nữ', '2006-03-15', 'm.anh', 'LH001', 'studying', 'f-minh-anh', '0912345678', 3.65, 72],
  ['Trần Hoàng Nam', 'Nam', '2006-07-22', 'h.nam', 'LH002', 'studying', 'm-hoang-nam', '0903112233', 3.12, 68],
  ['Lê Thu Hà', 'Nữ', '2006-11-08', 't.ha', 'LH004', 'reserved', 'f-thu-ha', '0938456789', 2.98, 45],
  ['Phạm Quốc Bảo', 'Nam', '2006-01-30', 'q.bao', 'LH001', 'studying', 'm-quoc-bao', '0977223344', 3.41, 70],
  ['Võ Ngọc Linh', 'Nữ', '2002-05-12', 'n.linh', 'LH005', 'graduated', 'f-ngoc-linh', '0909556677', 3.72, 140],
  ['Đặng Đức Huy', 'Nam', '2006-09-16', 'd.huy', 'LH002', 'studying', 'm-hoang-nam-2', '0918667788', 2.87, 64],
  ['Bùi Phương Thảo', 'Nữ', '2006-12-24', 'p.thao', 'LH004', 'studying', 'f-minh-anh-2', '0932778899', 3.55, 72],
  ['Hoàng Gia Khánh', 'Nam', '2006-06-09', 'g.khanh', 'LH001', 'studying', 'm-quoc-bao-2', '0965889900', 3.08, 66],
  ['Đỗ Khánh Vy', 'Nữ', '2006-02-18', 'k.vy', 'LH005', 'studying', 'f-thu-ha-2', '0986990011', 3.26, 118],
  ['Vũ Tiến Đạt', 'Nam', '2006-08-05', 't.dat', 'LH002', 'studying', 'm-hoang-nam', '0901001122', 2.76, 60],
]

const EXTRA_ROWS = [
  ['Nguyễn Thị Lan', 'Nữ', 'LH003', 'studying'],
  ['Trần Văn Phúc', 'Nam', 'LH006', 'studying'],
  ['Lê Minh Quân', 'Nam', 'LH007', 'studying'],
  ['Phạm Thu Trang', 'Nữ', 'LH001', 'studying'],
  ['Hoàng Anh Tuấn', 'Nam', 'LH002', 'reserved'],
  ['Ngô Bảo Ngọc', 'Nữ', 'LH003', 'studying'],
  ['Đinh Quang Huy', 'Nam', 'LH004', 'studying'],
  ['Trương Mỹ Linh', 'Nữ', 'LH006', 'studying'],
  ['Lý Gia Bảo', 'Nam', 'LH007', 'studying'],
  ['Mai Phương Anh', 'Nữ', 'LH003', 'reserved'],
  ['Phan Đức Trí', 'Nam', 'LH001', 'studying'],
  ['Hồ Ngọc Hân', 'Nữ', 'LH002', 'studying'],
  ['Dương Minh Khoa', 'Nam', 'LH006', 'suspended'],
  ['Tạ Thanh Hương', 'Nữ', 'LH004', 'studying'],
  ['Châu Tuấn Kiệt', 'Nam', 'LH007', 'studying'],
  ['Lâm Bích Ngân', 'Nữ', 'LH003', 'studying'],
  ['Vương Hải Đăng', 'Nam', 'LH005', 'graduated'],
  ['Quách Thảo Vy', 'Nữ', 'LH006', 'studying'],
  ['Kiều Nhật Minh', 'Nam', 'LH002', 'studying'],
  ['Tôn Nữ Khánh Linh', 'Nữ', 'LH007', 'studying'],
  ['Nguyễn Hải Yến', 'Nữ', 'LH008', 'studying'],
  ['Trần Quốc Việt', 'Nam', 'LH008', 'studying'],
  ['Phạm Gia Hân', 'Nữ', 'LH008', 'studying'],
]

function emailFromName(name) {
  const parts = normalize(name).split(/\s+/)
  const given = parts.pop()
  return `${given}.${parts.map((p) => p[0]).join('')}@sv.edu.vn`
}

function build(i, [fullName, gender, dob, emailUser, classId, status, avatar, phone, gpa, credits]) {
  const cls = classById[classId]
  const y = startYear(classId)
  return {
    id: `SV${2024001 + i}`,
    avatar,
    fullName,
    gender,
    dob,
    phone,
    email: `${emailUser}@sv.edu.vn`,
    address: ADDRESSES[i % ADDRESSES.length],
    facultyId: cls.facultyId,
    classId,
    cohort: cls.cohort,
    enrollmentDate: `${y}-09-05`,
    status,
    gpa,
    credits,
  }
}

export const MOCK_STUDENTS = [
  ...FIGMA_ROWS.map((row, i) => build(i, row)),
  ...EXTRA_ROWS.map(([fullName, gender, classId, status], k) => {
    const i = FIGMA_ROWS.length + k
    const y = startYear(classId)
    const pool = gender === 'Nữ' ? FEMALE_AVATARS : MALE_AVATARS
    const credits = status === 'graduated' ? 140 : Math.min(140, Math.max(0, (2026 - y) * 34 + (k % 5) * 2))
    const email = emailFromName(fullName)
    return build(i, [
      fullName,
      gender,
      `${y - 18}-${String((k % 12) + 1).padStart(2, '0')}-${String((k * 7) % 27 + 1).padStart(2, '0')}`,
      email.split('@')[0],
      classId,
      status,
      pool[k % pool.length],
      `09${String(10000000 + k * 7654321).slice(0, 8)}`,
      credits ? Math.round((2.4 + ((k * 37) % 150) / 100) * 100) / 100 : null,
      credits,
    ])
  }),
]
