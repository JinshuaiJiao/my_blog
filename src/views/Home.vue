<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-20 py-20">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-slide-up">
          欢迎来到我的
          <span class="gradient-text">技术博客</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style="animation-delay: 200ms;">
          记录技术成长，分享编程心得。专注于前端开发、Vue.js 和现代 Web 技术。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 400ms;">
          <router-link to="/about" class="btn-primary">
            了解更多
          </router-link>
          <button @click="scrollToLatest" class="btn-secondary">
            查看最新文章
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <FeaturedPosts v-if="blogStore.featuredPosts.length > 0" />

    <!-- Categories -->
    <Categories />

    <!-- Latest Posts -->
    <section ref="latestSection" class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
        <div class="flex items-center space-x-4">
          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">所有分类</option>
            <option 
              v-for="category in blogStore.categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-if="blogStore.paginatedPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard 
          v-for="post in blogStore.paginatedPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">暂无文章</h3>
          <p class="text-gray-600 dark:text-gray-400">没有找到符合条件的文章，请尝试其他搜索条件。</p>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination
        :current-page="blogStore.currentPage"
        :total-pages="blogStore.totalPages"
        @page-change="handlePageChange"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'
import FeaturedPosts from '../components/FeaturedPosts.vue'
import Categories from '../components/Categories.vue'
import Pagination from '../components/Pagination.vue'

const blogStore = useBlogStore()
const latestSection = ref<HTMLElement>()
const selectedCategory = ref('')

const scrollToLatest = () => {
  latestSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handlePageChange = (page: number) => {
  blogStore.setPage(page)
  scrollToLatest()
}

const handleCategoryChange = () => {
  blogStore.setCategory(selectedCategory.value || null)
}

onMounted(() => {
  // Reset filters when entering home page
  blogStore.setSearchQuery('')
  blogStore.setCategory(null)
  selectedCategory.value = ''
})
</script>