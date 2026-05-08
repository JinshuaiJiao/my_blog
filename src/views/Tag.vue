<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
      <header class="mb-12 text-center">
        <p class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">标签</p>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          #{{ tagName }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          共 {{ taggedPosts.length }} 篇文章
        </p>
      </header>

      <div v-if="taggedPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard v-for="post in taggedPosts" :key="post.id" :post="post" />
      </div>

      <div v-else class="text-center py-16">
        <p class="text-gray-600 dark:text-gray-400 mb-6">没有匹配该标签的文章。</p>
        <router-link to="/" class="btn-primary">返回首页</router-link>
      </div>
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

const tagName = computed(() => decodeURIComponent(route.params.name as string))

const taggedPosts = computed(() =>
  blogStore.posts
    .filter(p => p.tags.some(t => t.toLowerCase() === tagName.value.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

useHead(computed(() => ({
  title: `#${tagName.value} - EvenKnow`,
  meta: [{ name: 'description', content: `带 ${tagName.value} 标签的全部文章` }],
})))
</script>
