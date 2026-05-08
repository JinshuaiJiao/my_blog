<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-12">
        <span class="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3" style="background-color: #A855F7;">
          KNOWLEDGE
        </span>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          知识分享
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          内部培训、复盘、工作流方法论的整理。比博客更长、更"密度"，专给愿意慢读的同行。
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <router-link
          v-for="(item, index) in shares"
          :key="item.slug"
          :to="`/share/${item.slug}`"
          class="card group hover:scale-[1.02] transition-all duration-300 block cursor-pointer animate-slide-up"
          :style="{ 'animation-delay': `${index * 100}ms` }"
        >
          <div class="relative overflow-hidden rounded-t-xl">
            <img
              :src="item.cover"
              :alt="item.title"
              loading="lazy"
              class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <h2 class="text-xl font-bold text-white line-clamp-2">{{ item.title }}</h2>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{{ formatDate(item.date) }}</span>
              <span class="mx-2">•</span>
              <span>{{ item.readTime }} 分钟阅读</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{{ item.excerpt }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { shares } from '../share'

const formatDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric'
})

useHead({
  title: '知识分享 - EvenKnow',
  meta: [{ name: 'description', content: '内部培训、复盘、AI 协作工作流的整理与分享。' }],
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
