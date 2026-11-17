import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Toast from '../components/ui/Toast.jsx'

const ToastContext = createContext(null)
const DURATION = 4000 // "tự đóng sau 4 giây"

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id])
    delete timers.current[id]
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  // variant: 'student' (viền xanh lá, chữ đậm) | 'class' (chữ xanh lá) — theo từng màn Figma
  const show = useCallback(
    (message, variant = 'student') => {
      const id = crypto.randomUUID()
      setToasts((t) => [...t, { id, message, variant }])
      timers.current[id] = setTimeout(() => dismiss(id), DURATION)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-24 right-8 z-50 flex w-[380px] max-w-[calc(100vw-32px)] flex-col gap-3" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
