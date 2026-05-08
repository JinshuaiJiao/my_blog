<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-12">
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="$emit('page-change', page)"
      :class="[
        'px-4 py-2 rounded-lg border transition-colors',
        page === currentPage
          ? 'bg-primary-600 text-white border-primary-600'
          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  'page-change': [page: number]
}>()

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.totalPages, props.currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>