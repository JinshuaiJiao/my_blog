<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <nav class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
        我的博客
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Home' }">
          首页
        </router-link>
        <router-link to="/about" class="nav-link" :class="{ 'nav-link-active': $route.name === 'About' }">
          关于我
        </router-link>

        <!-- Search -->
        <div class="relative">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="搜索文章..."
            class="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Theme Toggle -->
        <button @click="handleThemeToggle"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'">
          <svg v-if="themeStore.isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu"
      class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div class="px-4 py-4 space-y-4">
        <router-link to="/" class="block nav-link" @click="closeMobileMenu">
          首页
        </router-link>
        <router-link to="/about" class="block nav-link" @click="closeMobileMenu">
          关于我
        </router-link>
        <div class="pt-2">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="搜索文章..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

const showMobileMenu = ref(false)
const searchQuery = ref('')

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleSearch = () => {
  blogStore.setSearchQuery(searchQuery.value)
  if (router.currentRoute.value.name !== 'Home') {
    router.push('/')
  }
}

const handleThemeToggle = (e: MouseEvent) => {
  const transition = document.startViewTransition(() => {
    themeStore.toggleDark();
  });

  transition.ready.then(() => {
    const { clientX, clientY } = e;

    const endRadius = Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${clientX}px ${clientY}px)`,
          `circle(${endRadius}px at ${clientX}px ${clientY}px)`
        ],
      },
      {
        duration: 500,
        easing: 'ease-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  })
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400;
}
</style>