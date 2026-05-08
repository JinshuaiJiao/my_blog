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
          专注 Vue3 / React / TypeScript，深度实践 AI Agent + MCP 工作流，记录前端工程化的真实经验。
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
          <div ref="dropdownRef" class="relative">
            <button
              type="button"
              @click="isOpen = !isOpen"
              class="flex items-center justify-between min-w-[160px] px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:border-primary-400 dark:hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              :aria-expanded="isOpen"
              aria-haspopup="listbox"
            >
              <span class="truncate">{{ selectedLabel }}</span>
              <svg
                class="w-4 h-4 ml-2 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="opacity-0 -translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-1 scale-95"
            >
              <ul
                v-if="isOpen"
                role="listbox"
                class="absolute right-0 z-20 mt-2 w-56 max-h-72 overflow-auto rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 py-1 origin-top"
              >
                <li
                  role="option"
                  :aria-selected="selectedCategory === ''"
                  @click="selectCategory('')"
                  class="flex items-center justify-between px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700"
                  :class="{ 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50/60 dark:bg-gray-700/60': selectedCategory === '' }"
                >
                  <span>所有分类</span>
                  <svg v-if="selectedCategory === ''" class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
                <li
                  v-for="category in blogStore.categories"
                  :key="category.id"
                  role="option"
                  :aria-selected="selectedCategory === category.id"
                  @click="selectCategory(category.id)"
                  class="flex items-center justify-between px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700"
                  :class="{ 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50/60 dark:bg-gray-700/60': selectedCategory === category.id }"
                >
                  <span>{{ category.name }}</span>
                  <svg v-if="selectedCategory === category.id" class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </li>
              </ul>
            </transition>
          </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'
import FeaturedPosts from '../components/FeaturedPosts.vue'
import Categories from '../components/Categories.vue'
import Pagination from '../components/Pagination.vue'

const blogStore = useBlogStore()
const latestSection = ref<HTMLElement>()
const selectedCategory = ref<string>('')
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const selectedLabel = computed(() => {
  if (!selectedCategory.value) return '所有分类'
  const found = blogStore.categories.find((c) => c.id === selectedCategory.value)
  return found?.name ?? '所有分类'
})

const scrollToLatest = () => {
  latestSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handlePageChange = (page: number) => {
  blogStore.setPage(page)
  scrollToLatest()
}

const selectCategory = (id: string) => {
  selectedCategory.value = id
  blogStore.setCategory(id || null)
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  // Reset filters when entering home page
  blogStore.setSearchQuery('')
  blogStore.setCategory(null)
  selectedCategory.value = ''
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>