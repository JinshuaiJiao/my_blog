<template>
  <div v-if="post" class="container mx-auto px-4 py-8">
    <div class="fixed top-20 left-0 right-0 z-40">
      <div
        class="h-1 bg-primary-600 transition-all duration-300"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <button
      @click="$router.go(-1)"
      class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回
    </button>

    <div class="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12 max-w-6xl mx-auto">
      <article>
        <header class="mb-12 text-center">
          <div class="mb-6">
            <span
              class="inline-block px-4 py-2 text-sm font-semibold text-white rounded-full mb-4"
              :style="{ backgroundColor: getCategoryColor(post.category) }"
            >
              {{ getCategoryName(post.category) }}
            </span>
            <span v-if="post.featured" class="inline-block ml-2 px-3 py-1 text-sm font-semibold bg-accent-500 text-white rounded-full">
              精选文章
            </span>
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

          <div v-if="post.image" class="mb-12">
            <img
              :src="post.image"
              :alt="post.title"
              loading="lazy"
              class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg animate-scale-in"
            >
          </div>

          <div class="flex flex-wrap gap-2 justify-center animate-fade-in">
            <router-link
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tag/${encodeURIComponent(tag)}`"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              #{{ tag }}
            </router-link>
          </div>
        </header>

        <div
          ref="contentRef"
          class="prose prose-lg max-w-none animate-fade-in dark:prose-invert"
          v-html="renderedContent"
        ></div>

        <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-gray-600 dark:text-gray-400 text-center md:text-left">
              感谢阅读！如果这篇文章对你有帮助，请分享给更多的人。
            </p>
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
        </footer>

        <nav v-if="prevPost || nextPost" class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link
            v-if="prevPost"
            :to="`/post/${prevPost.id}`"
            class="group block p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all"
          >
            <div class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">← 上一篇</div>
            <div class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
              {{ prevPost.title }}
            </div>
          </router-link>
          <span v-else></span>
          <router-link
            v-if="nextPost"
            :to="`/post/${nextPost.id}`"
            class="group block p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all md:text-right"
          >
            <div class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">下一篇 →</div>
            <div class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
              {{ nextPost.title }}
            </div>
          </router-link>
        </nav>

        <section class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">评论</h2>
          <Giscus
            :repo="giscus.repo"
            :repo-id="giscus.repoId"
            :category="giscus.category"
            :category-id="giscus.categoryId"
            mapping="pathname"
            strict="0"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="top"
            :theme="themeStore.isDark ? 'dark' : 'light'"
            lang="zh-CN"
            loading="lazy"
          />
          <p v-if="!giscus.repoId" class="text-sm text-gray-500 dark:text-gray-400 mt-4">
            评论功能需要配置 Giscus（GitHub Discussions）。请按
            <a href="https://giscus.app" target="_blank" class="underline hover:text-primary-600">giscus.app</a>
            指南完成 repo / repo-id / category-id 后填入 <code class="px-1 bg-gray-100 dark:bg-gray-800 rounded">src/views/PostDetail.vue</code>。
          </p>
        </section>
      </article>

      <aside class="hidden lg:block">
        <div class="sticky top-28">
          <div v-if="toc.length" class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">目录</h3>
            <ul class="space-y-1.5 text-sm">
              <li v-for="item in toc" :key="item.id" :class="item.level === 3 ? 'pl-4' : ''">
                <a
                  :href="`#${item.id}`"
                  @click.prevent="scrollToHeading(item.id)"
                  class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 border-l-2 pl-3 transition-colors"
                  :class="activeHeading === item.id ? 'text-primary-600 dark:text-primary-400 border-primary-500 font-medium' : 'border-transparent'"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>

    <section v-if="relatedPosts.length > 0" class="mt-20 max-w-6xl mx-auto">
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

  <div v-else-if="isLoading" class="container mx-auto px-4 py-24 text-center">
    <div class="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
    <p class="text-gray-600 dark:text-gray-400">正在加载文章…</p>
  </div>

  <div v-else class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-md mx-auto">
      <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">文章未找到</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
      <router-link to="/" class="btn-primary">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github-dark.css'
import Giscus from '@giscus/vue'
import { useBlogStore } from '../stores/blog'
import { useThemeStore } from '../stores/theme'
import PostCard from '../components/PostCard.vue'

import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)

const giscus = {
  repo: 'JinshuaiJiao/my_blog' as `${string}/${string}`,
  repoId: '',
  category: 'General',
  categoryId: '',
}

const md = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    },
  })
)

const route = useRoute()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

const contentRef = ref<HTMLElement>()
const readingProgress = ref(0)

const post = computed(() => {
  const id = route.params.id as string
  return blogStore.getPostById(id)
})

const isLoading = computed(() => blogStore.posts.length === 0)

const sortedPosts = computed(() =>
  [...blogStore.posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const prevPost = computed(() => {
  if (!post.value) return null
  const idx = sortedPosts.value.findIndex(p => p.id === post.value!.id)
  return idx > 0 ? sortedPosts.value[idx - 1] : null
})

const nextPost = computed(() => {
  if (!post.value) return null
  const idx = sortedPosts.value.findIndex(p => p.id === post.value!.id)
  return idx >= 0 && idx < sortedPosts.value.length - 1 ? sortedPosts.value[idx + 1] : null
})

const renderedContent = computed(() => {
  if (!post.value) return ''
  return md.parse(post.value.content) as string
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogStore.getPostsByCategory(post.value.category)
    .filter(p => p.id !== post.value!.id)
    .slice(0, 3)
})

const toc = ref<{ id: string; text: string; level: number }[]>([])
const activeHeading = ref<string>('')
let observer: IntersectionObserver | null = null

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\w一-龥]+/g, '-').replace(/^-+|-+$/g, '')

const buildToc = () => {
  if (!contentRef.value) return
  const headings = contentRef.value.querySelectorAll<HTMLElement>('h2, h3')
  const items: typeof toc.value = []
  const seen = new Map<string, number>()
  headings.forEach((el) => {
    const text = el.textContent?.trim() || ''
    let id = slugify(text)
    const count = seen.get(id) ?? 0
    if (count > 0) id = `${id}-${count}`
    seen.set(id, count + 1)
    el.id = id
    items.push({ id, text, level: el.tagName === 'H2' ? 2 : 3 })
  })
  toc.value = items
}

const observeHeadings = () => {
  if (observer) observer.disconnect()
  if (!contentRef.value) return
  const headings = contentRef.value.querySelectorAll<HTMLElement>('h2, h3')
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) activeHeading.value = visible[0].target.id
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
  )
  headings.forEach(h => observer!.observe(h))
}

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const enhanceCodeBlocks = () => {
  if (!contentRef.value) return
  const pres = contentRef.value.querySelectorAll<HTMLPreElement>('pre')
  pres.forEach((pre) => {
    if (pre.dataset.enhanced) return
    pre.dataset.enhanced = 'true'
    pre.style.position = 'relative'
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'code-copy-btn'
    btn.textContent = '复制'
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? ''
      try {
        await navigator.clipboard.writeText(code)
        btn.textContent = '已复制'
        setTimeout(() => { btn.textContent = '复制' }, 1500)
      } catch {
        btn.textContent = '失败'
      }
    })
    pre.appendChild(btn)
  })
}

const formatDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric'
})

const getCategoryName = (id: string) => blogStore.categories.find(c => c.id === id)?.name || id
const getCategoryColor = (id: string) => blogStore.categories.find(c => c.id === id)?.color || '#3b82f6'

const shareArticle = async () => {
  if (navigator.share && post.value) {
    try {
      await navigator.share({ title: post.value.title, text: post.value.excerpt, url: window.location.href })
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板！')
    }
  } else {
    await navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板！')
  }
}

const updateReadingProgress = () => {
  if (!contentRef.value) return
  const el = contentRef.value
  const top = el.offsetTop
  const height = el.offsetHeight
  const progress = Math.min(Math.max((window.scrollY - top + window.innerHeight / 2) / height, 0), 1) * 100
  readingProgress.value = progress
}

useHead(computed(() => ({
  title: post.value ? `${post.value.title} - EvenKnow` : '文章未找到 - EvenKnow',
  meta: [
    { name: 'description', content: post.value?.excerpt || '' },
    { property: 'og:title', content: post.value?.title || '' },
    { property: 'og:description', content: post.value?.excerpt || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: post.value?.image || '' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
})))

const refreshContent = async () => {
  await nextTick()
  if (!contentRef.value) return
  buildToc()
  enhanceCodeBlocks()
  observeHeadings()
}

watch(() => post.value?.id, refreshContent, { flush: 'post' })

onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress)
  updateReadingProgress()
  refreshContent()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
  observer?.disconnect()
})
</script>

<style>
.code-copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
}
pre:hover .code-copy-btn { opacity: 1; }
.code-copy-btn:hover { background: rgba(255, 255, 255, 0.2); }
</style>
