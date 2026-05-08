<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Category Header -->
    <section v-if="category" class="text-center mb-16 py-12">
      <div 
        class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold animate-scale-in"
        :style="{ backgroundColor: category.color }"
      >
        {{ category.name.charAt(0) }}
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-slide-up">
        {{ category.name }}
      </h1>
      
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-6 animate-slide-up" style="animation-delay: 200ms;">
        {{ category.description }}
      </p>
      
      <div class="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 animate-fade-in" style="animation-delay: 400ms;">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {{ categoryPosts.length }} 篇文章
      </div>
    </section>

    <!-- Posts -->
    <section>
      <div v-if="categoryPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard 
          v-for="post in categoryPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>

      <!-- No Posts -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">暂无文章</h3>
          <p class="text-gray-600 dark:text-gray-400">该分类下还没有发布任何文章。</p>
        </div>
      </div>
    </section>

    <!-- Back to Home -->
    <div class="text-center mt-16">
      <router-link to="/" class="btn-secondary">
        <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const blogStore = useBlogStore()

const categoryId = computed(() => route.params.category as string)

const category = computed(() => {
  return blogStore.categories.find(cat => cat.id === categoryId.value)
})

const categoryPosts = computed(() => {
  return blogStore.getPostsByCategory(categoryId.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

useHead(computed(() => ({
  title: category.value ? `${category.value.name} - EvenKnow` : '分类 - EvenKnow',
  meta: [{ name: 'description', content: category.value?.description || '' }],
})))
</script>