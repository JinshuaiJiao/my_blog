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
        <router-link to="/archive" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Archive' }">
          归档
        </router-link>
        <router-link to="/about" class="nav-link" :class="{ 'nav-link-active': $route.name === 'About' }">
          关于我
        </router-link>

        <!-- Search Trigger -->
        <button
          type="button"
          @click="searchOpen = true"
          class="group flex items-center w-64 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
          aria-label="打开搜索"
        >
          <svg class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="flex-1 text-left text-sm text-gray-400 dark:text-gray-500">搜索文章…</span>
          <kbd class="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
            <span>{{ isMac ? '⌘' : 'Ctrl' }}</span>
            <span>K</span>
          </kbd>
        </button>

        <!-- Theme Toggle -->
        <div class="relative">
          <button @click="handleThemeToggle"
            class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'">
            <svg v-if="themeStore.isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span v-if="showThemeDot"
              class="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
            </span>
          </button>

          <!-- Onboarding Tooltip -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="showThemeHint" class="absolute top-full right-0 mt-3 w-64 z-50">
              <div class="relative rounded-xl shadow-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white p-4">
                <div class="absolute -top-1.5 right-4 w-3 h-3 bg-primary-600 rotate-45"></div>
                <div class="flex items-start gap-2">
                  <span class="text-xl leading-none">✨</span>
                  <div class="flex-1">
                    <div class="font-semibold text-sm mb-1">试试切换主题</div>
                    <div class="text-xs text-white/90 leading-relaxed">
                      点这里在浅色 / 深色模式间无缝切换，带丝滑过渡效果。
                    </div>
                  </div>
                </div>
                <button
                  @click.stop="markThemeUsed"
                  class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  aria-label="关闭提示"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <SearchModal v-model:open="searchOpen" />

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu"
      class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div class="px-4 py-4 space-y-4">
        <router-link to="/" class="block nav-link" @click="closeMobileMenu">
          首页
        </router-link>
        <router-link to="/archive" class="block nav-link" @click="closeMobileMenu">
          归档
        </router-link>
        <router-link to="/about" class="block nav-link" @click="closeMobileMenu">
          关于我
        </router-link>
        <button
          type="button"
          @click="openSearchFromMobile"
          class="w-full flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        >
          <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="text-sm text-gray-400">搜索文章…</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import SearchModal from './SearchModal.vue'

const themeStore = useThemeStore()

const showMobileMenu = ref(false)
const searchOpen = ref(false)
const showThemeHint = ref(false)
const showThemeDot = ref(true)
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

const openSearchFromMobile = () => {
  showMobileMenu.value = false
  searchOpen.value = true
}

const THEME_HINT_KEY = 'theme-hint-toggled-v2'

const markThemeUsed = () => {
  showThemeHint.value = false
  showThemeDot.value = false
  try {
    localStorage.setItem(THEME_HINT_KEY, '1')
  } catch {}
}

const dismissThemeHint = () => {
  showThemeHint.value = false
}

onMounted(() => {
  let dismissed = false
  try {
    dismissed = !!localStorage.getItem(THEME_HINT_KEY)
  } catch {}
  if (dismissed) {
    showThemeDot.value = false
    return
  }
  setTimeout(() => { showThemeHint.value = true }, 1000)
  setTimeout(dismissThemeHint, 15000)
})

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleThemeToggle = async () => {
  markThemeUsed()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || prefersReducedMotion) {
    themeStore.toggleDark()
    return
  }

  const root = document.documentElement
  root.classList.add('perspective-travel-transition')

  const transition = document.startViewTransition(() => {
    themeStore.toggleDark()
  })

  try {
    await transition.finished
  } finally {
    root.classList.remove('perspective-travel-transition')
  }
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