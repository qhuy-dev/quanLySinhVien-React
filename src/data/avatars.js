// Ảnh đại diện tải từ Figma (src/assets/avatars)
import admin from '../assets/avatars/admin.png'
import adminSidebar from '../assets/avatars/admin-sidebar.png'
import fMinhAnh from '../assets/avatars/f-minh-anh.png'
import fMinhAnhLg from '../assets/avatars/f-minh-anh-lg.png'
import fMinhAnh2 from '../assets/avatars/f-minh-anh-2.png'
import fThuHa from '../assets/avatars/f-thu-ha.png'
import fThuHa2 from '../assets/avatars/f-thu-ha-2.png'
import fNgocLinh from '../assets/avatars/f-ngoc-linh.png'
import fNgocLinh2 from '../assets/avatars/f-ngoc-linh-2.png'
import mHoangNam from '../assets/avatars/m-hoang-nam.png'
import mHoangNam2 from '../assets/avatars/m-hoang-nam-2.png'
import mQuocBao from '../assets/avatars/m-quoc-bao.png'
import mQuocBao2 from '../assets/avatars/m-quoc-bao-2.png'

export const ADMIN_AVATAR = admin
export const ADMIN_AVATAR_SIDEBAR = adminSidebar

const AVATARS = {
  'f-minh-anh': { sm: fMinhAnh, lg: fMinhAnhLg },
  'f-minh-anh-2': { sm: fMinhAnh2 },
  'f-thu-ha': { sm: fThuHa },
  'f-thu-ha-2': { sm: fThuHa2 },
  'f-ngoc-linh': { sm: fNgocLinh },
  'f-ngoc-linh-2': { sm: fNgocLinh2 },
  'm-hoang-nam': { sm: mHoangNam },
  'm-hoang-nam-2': { sm: mHoangNam2 },
  'm-quoc-bao': { sm: mQuocBao },
  'm-quoc-bao-2': { sm: mQuocBao2 },
}

export const FEMALE_AVATARS = ['f-minh-anh', 'f-thu-ha', 'f-ngoc-linh', 'f-minh-anh-2', 'f-thu-ha-2', 'f-ngoc-linh-2']
export const MALE_AVATARS = ['m-hoang-nam', 'm-quoc-bao', 'm-hoang-nam-2', 'm-quoc-bao-2']

// avatar có thể là key ảnh mẫu hoặc data URL do người dùng tải lên
export function resolveAvatar(avatar, large = false) {
  if (!avatar) return null
  if (avatar.startsWith('data:')) return avatar
  const entry = AVATARS[avatar]
  if (!entry) return null
  return (large && entry.lg) || entry.sm
}
