<template>
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">精选文章</h2>
      <p class="text-xl text-gray-600 dark:text-gray-400">最受欢迎和推荐的技术文章</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <router-link
        v-for="(post, index) in featuredPosts"
        :key="post.id"
        :to="`/post/${post.id}`"
        class="card group hover:scale-105 transition-all duration-300 block cursor-pointer"
        :class="`animate-slide-up`"
        :style="{ 'animation-delay': `${index * 100}ms` }"
      >
        <div class="relative overflow-hidden rounded-t-xl">
          <img 
            :src="post.image || `https://images.pexels.com/photos/${546819 + index}/pexels-photo-${546819 + index}.jpeg`"
            :alt="post.title"
            class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <span 
              class="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-2"
              :style="{ backgroundColor: getCategoryColor(post.category) }"
            >
              {{ getCategoryName(post.category) }}
            </span>
            <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">
              {{ post.title }}
            </h3>
          </div>
        </div>
        
        <div class="p-6">
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{{ formatDate(post.date) }}</span>
            <span class="mx-2">•</span>
            <span>{{ post.readTime }} 分钟阅读</span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {{ post.excerpt }}
          </p>
          
          <span class="btn-primary w-full text-center inline-block">
            阅读文章
          </span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

const featuredPosts = computed(() => blogStore.featuredPosts)

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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>