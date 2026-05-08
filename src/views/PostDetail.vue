<template>
  <div v-if="post" class="container mx-auto px-4 py-8">
    <!-- Reading Progress -->
    <div class="fixed top-20 left-0 right-0 z-40">
      <div 
        class="h-1 bg-primary-600 transition-all duration-300"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <!-- Back Button -->
    <button
      @click="$router.go(-1)"
      class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回
    </button>

    <article class="max-w-4xl mx-auto">
      <!-- Article Header -->
      <header class="mb-12 text-center">
        <div class="mb-6">
          <span 
            class="inline-block px-4 py-2 text-sm font-semibold text-white rounded-full mb-4"
            :style="{ backgroundColor: getCategoryColor(post.category) }"
          >
            {{ getCategoryName(post.category) }}
          </span>
          <div v-if="post.featured" class="inline-block ml-2">
            <span class="px-3 py-1 text-sm font-semibold bg-accent-500 text-white rounded-full">
              精选文章
            </span>
          </div>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-slide-up">
          {{ post.title }}
        </h1>

        <div class="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-8 animate-fade-in">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(post.date) }}
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ post.readTime }} 分钟阅读
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ post.author }}
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="post.image" class="mb-12">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg animate-scale-in"
          >
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 justify-center animate-fade-in">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors cursor-pointer"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- Article Content -->
      <div 
        ref="contentRef"
        class="prose prose-lg max-w-none animate-fade-in"
        v-html="renderedContent"
      ></div>

      <!-- Article Footer -->
      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <p class="text-gray-600 dark:text-gray-400">
              感谢阅读！如果这篇文章对你有帮助，请分享给更多的人。
            </p>
          </div>
          
          <div class="flex space-x-4">
            <button
              @click="shareArticle"
              class="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              分享
            </button>
          </div>
        </div>
      </footer>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="mt-20">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">相关文章</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard 
          v-for="relatedPost in relatedPosts" 
          :key="relatedPost.id" 
          :post="relatedPost" 
        />
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-md mx-auto">
      <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">文章未找到</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
      <router-link to="/" class="btn-primary">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const blogStore = useBlogStore()

const contentRef = ref<HTMLElement>()
const readingProgress = ref(0)

const post = computed(() => {
  const id = route.params.id as string
  return blogStore.getPostById(id)
})

const renderedContent = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.getPostsByCategory(post.value.category)
    .filter(p => p.id !== post.value!.id)
    .slice(0, 3)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryName = (categoryId: string) => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

const getCategoryColor = (categoryId: string) => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.color || '#3b82f6'
}

const shareArticle = async () => {
  if (navigator.share && post.value) {
    try {
      await navigator.share({
        title: post.value.title,
        text: post.value.excerpt,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板！')
    }
  } else {
    // Fallback to clipboard
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板！')
  }
}

// Reading progress tracking
const updateReadingProgress = () => {
  if (!contentRef.value) return
  
  const element = contentRef.value
  const elementTop = element.offsetTop
  const elementHeight = element.offsetHeight
  const windowHeight = window.innerHeight
  const scrollTop = window.scrollY
  
  const progress = Math.min(
    Math.max((scrollTop - elementTop + windowHeight / 2) / elementHeight, 0),
    1
  ) * 100
  
  readingProgress.value = progress
}

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress)
  updateReadingProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})
</script>