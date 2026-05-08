<template>
  <Teleport to="body">
    <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      <transition-group name="toast" tag="div" class="flex flex-col items-center gap-2">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-3 min-w-[220px] max-w-[90vw] px-4 py-3 rounded-xl shadow-lg backdrop-blur-md border"
          :class="cardClass(t.type)"
          role="status"
        >
          <span class="shrink-0" v-html="iconFor(t.type)"></span>
          <span class="flex-1 text-sm font-medium">{{ t.message }}</span>
          <button
            @click="remove(t.id)"
            class="shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="关闭"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast, type ToastType } from '../composables/useToast'

const { toasts, remove } = useToast()

const cardClass = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'bg-emerald-50/95 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-100'
    case 'error':
      return 'bg-rose-50/95 dark:bg-rose-900/80 border-rose-200 dark:border-rose-700 text-rose-800 dark:text-rose-100'
    case 'warning':
      return 'bg-amber-50/95 dark:bg-amber-900/80 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-100'
    case 'info':
    default:
      return 'bg-white/95 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'
  }
}

const iconFor = (type: ToastType) => {
  const cls = 'w-5 h-5'
  if (type === 'success') {
    return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`
  }
  if (type === 'error') {
    return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  }
  if (type === 'warning') {
    return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z"/></svg>`
  }
  return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
}
.toast-move {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
