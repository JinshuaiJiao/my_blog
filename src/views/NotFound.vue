<template>
  <div class="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary-200 dark:bg-primary-900 opacity-30 blur-3xl animate-blob"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent-200 dark:bg-accent-900 opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="container mx-auto px-4 py-16 text-center relative">
      <div class="max-w-2xl mx-auto">
        <!-- 4 0 4 三块 -->
        <div class="flex items-center justify-center gap-2 md:gap-6 mb-8 select-none">
          <span class="text-[7rem] md:text-[10rem] leading-none font-extrabold gradient-text animate-slide-up">4</span>
          <div class="relative animate-scale-in" style="animation-delay: 200ms;">
            <div class="w-24 h-24 md:w-36 md:h-36 rounded-full border-[12px] md:border-[16px] border-primary-500 dark:border-primary-400 flex items-center justify-center bg-white dark:bg-gray-900 shadow-xl">
              <svg class="w-10 h-10 md:w-16 md:h-16 text-accent-500 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <span class="text-[7rem] md:text-[10rem] leading-none font-extrabold gradient-text animate-slide-up" style="animation-delay: 100ms;">4</span>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 animate-fade-in" style="animation-delay: 300ms;">
          页面在哪儿呢…
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-10 animate-fade-in" style="animation-delay: 400ms;">
          你访问的链接不存在，可能已经被搬走或写错了路径。
        </p>

        <!-- 操作 -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in" style="animation-delay: 500ms;">
          <router-link to="/" class="btn-primary inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            回首页
          </router-link>
          <router-link to="/archive" class="btn-secondary inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            看归档
          </router-link>
          <router-link to="/about" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            关于我
          </router-link>
        </div>

        <!-- 推荐 -->
        <div v-if="recommended.length" class="text-left mt-12 animate-fade-in" style="animation-delay: 600ms;">
          <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
            或许你想看这些
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link
              v-for="post in recommended"
              :key="post.id"
              :to="`/post/${post.id}`"
              class="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all bg-white dark:bg-gray-800/50"
            >
              <span
                class="inline-block px-2 py-0.5 text-xs font-medium text-white rounded mb-2"
                :style="{ backgroundColor: getCategoryColor(post.category) }"
              >
                {{ getCategoryName(post.category) }}
              </span>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 text-sm">
                {{ post.title }}
              </h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

const recommended = computed(() =>
  [...blogStore.posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
)

const getCategoryName = (id: string) => blogStore.categories.find(c => c.id === id)?.name || id
const getCategoryColor = (id: string) => blogStore.categories.find(c => c.id === id)?.color || '#3b82f6'

useHead({
  title: '404 - EvenKnow个人博客',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 8s linear infinite; }
</style>
