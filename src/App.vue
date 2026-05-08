<template>
  <div id="app" class="min-h-screen">
    <Header />
    <main class="pt-20">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useBlogStore } from './stores/blog'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.loadBlogData()
})
</script>