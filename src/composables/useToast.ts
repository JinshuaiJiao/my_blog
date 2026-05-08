import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
  id: number
  type: ToastType
  message: string
  duration: number
}

const toasts = ref<ToastItem[]>([])
let seed = 0

const push = (type: ToastType, message: string, duration = 2500) => {
  const id = ++seed
  toasts.value.push({ id, type, message, duration })
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
  return id
}

const remove = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

export const toast = {
  success: (msg: string, duration?: number) => push('success', msg, duration),
  error: (msg: string, duration?: number) => push('error', msg, duration),
  info: (msg: string, duration?: number) => push('info', msg, duration),
  warning: (msg: string, duration?: number) => push('warning', msg, duration),
}

export const useToast = () => ({ toasts, remove })
