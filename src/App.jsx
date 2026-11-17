import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

export default function App() {
  return (
    // basename lấy từ `base` trong vite.config.js (GitHub Pages: /quanLySinhVien-React/)
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DataProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </DataProvider>
    </BrowserRouter>
  )
}
