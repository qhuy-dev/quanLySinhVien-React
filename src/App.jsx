import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </DataProvider>
    </BrowserRouter>
  )
}
