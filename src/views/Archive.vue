<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          归档
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ blogStore.posts.length }} 篇文章 · {{ groups.length }} 个年份
        </p>
      </header>

      <div v-for="group in groups" :key="group.year" class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 sticky top-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-2 z-10">
          {{ group.year }}
          <span class="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
            {{ group.posts.length }} 篇
          </span>
        </h2>
        <ul class="space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-6">
          <li v-for="post in group.posts" :key="post.id" class="relative">
            <span class="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-900"></span>
            <router-link
              :to="`/post/${post.id}`"
              class="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 group hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <span class="text-sm text-gray-500 dark:text-gray-400 sm:w-24 flex-shrink-0">
                {{ formatShort(post.date) }}
              </span>
              <span class="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ post.title }}
              </span>
              <span
                class="text-xs px-2 py-0.5 rounded-full text-white"
                :style="{ backgroundColor: getCategoryColor(post.category) }"
              >
                {{ getCategoryName(post.category) }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useBlogStore } from '../stores/blog'
import type { Post } from '../types/blog'

const blogStore = useBlogStore()

const groups = computed<{ year: string; posts: Post[] }[]>(() => {
  const map = new Map<string, Post[]>()
  ;[...blogStore.posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((p) => {
      const year = new Date(p.date).getFullYear().toString()
      if (!map.has(year)) map.set(year, [])
      map.get(year)!.push(p)
    })
  return Array.from(map.entries()).map(([year, posts]) => ({ year, posts }))
})

const formatShort = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
  month: '2-digit', day: '2-digit'
})

const getCategoryName = (id: string) => blogStore.categories.find(c => c.id === id)?.name || id
const getCategoryColor = (id: string) => blogStore.categories.find(c => c.id === id)?.color || '#3b82f6'

useHead({
  title: '归档 - EvenKnow',
  meta: [{ name: 'description', content: '按时间线浏览全部文章' }],
})
</script>
