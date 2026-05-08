<template>
  <article class="card group hover:scale-105 transition-all duration-300 animate-fade-in">
    <div class="relative overflow-hidden rounded-t-xl">
      <img 
        :src="post.image || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg'"
        :alt="post.title"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      >
      <div class="absolute top-4 left-4">
        <span 
          class="px-3 py-1 text-xs font-semibold text-white rounded-full"
          :style="{ backgroundColor: getCategoryColor(post.category) }"
        >
          {{ getCategoryName(post.category) }}
        </span>
      </div>
      <div v-if="post.featured" class="absolute top-4 right-4">
        <span class="px-2 py-1 text-xs font-semibold bg-accent-500 text-white rounded-full">
          精选
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span>{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.readTime }} 分钟阅读</span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ post.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
        >
          #{{ tag }}
        </span>
      </div>
      
      <router-link 
        :to="`/post/${post.id}`"
        class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium transition-colors"
      >
        阅读更多
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '../types/blog'
import { useBlogStore } from '../stores/blog'

defineProps<{
  post: Post
}>()

const blogStore = useBlogStore()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryName = (categoryId: string) => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

const getCategoryColor = (categoryId: string) => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.color || '#3b82f6'
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>