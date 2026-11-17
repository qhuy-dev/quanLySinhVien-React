import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout.jsx'
import DashboardPage from '../features/dashboard/DashboardPage.jsx'
import StudentListPage from '../features/students/pages/StudentListPage.jsx'
import StudentCreatePage from '../features/students/pages/StudentCreatePage.jsx'
import StudentEditPage from '../features/students/pages/StudentEditPage.jsx'
import StudentDetailPage from '../features/students/pages/StudentDetailPage.jsx'
import ClassListPage from '../features/classes/pages/ClassListPage.jsx'
import ClassCreatePage from '../features/classes/pages/ClassCreatePage.jsx'
import ClassEditPage from '../features/classes/pages/ClassEditPage.jsx'
import ClassDetailPage from '../features/classes/pages/ClassDetailPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="students">
          <Route index element={<StudentListPage />} />
          <Route path="new" element={<StudentCreatePage />} />
          <Route path=":id" element={<StudentDetailPage />} />
          <Route path=":id/edit" element={<StudentEditPage />} />
        </Route>
        <Route path="classes">
          <Route index element={<ClassListPage />} />
          <Route path="new" element={<ClassCreatePage />} />
          <Route path=":id" element={<ClassDetailPage />} />
          <Route path=":id/edit" element={<ClassEditPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
