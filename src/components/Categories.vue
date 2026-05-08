<template>
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">文章分类</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">按主题浏览所有文章</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="(category, index) in categories" 
        :key="category.id"
        class="card group cursor-pointer hover:scale-105 transition-all duration-300 animate-scale-in"
        :style="{ 'animation-delay': `${index * 50}ms` }"
        @click="$router.push(`/category/${category.id}`)"
      >
        <div class="p-6 text-center">
          <div 
            class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            :style="{ backgroundColor: category.color }"
          >
            {{ category.name.charAt(0) }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {{ category.name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {{ category.description }}
          </p>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {{ category.postCount }} 篇文章
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

const categories = computed(() => blogStore.categories)
</script>