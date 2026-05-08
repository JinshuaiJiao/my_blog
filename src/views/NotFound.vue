<template>
  <div class="container mx-auto px-4 py-24 text-center">
    <div class="max-w-lg mx-auto">
      <p class="text-9xl font-extrabold gradient-text mb-4">404</p>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        页面不见了
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        你访问的链接不存在，可能已经被移动或删除。
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <router-link to="/" class="btn-primary">回首页</router-link>
        <router-link to="/archive" class="btn-secondary">看归档</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: '404 - EvenKnow',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>
