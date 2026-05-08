<template>
  <div v-if="share" class="container mx-auto px-4 py-8">
    <button
      @click="$router.go(-1)"
      class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回知识分享
    </button>

    <article class="max-w-4xl mx-auto">
      <header class="mb-12 text-center">
        <span class="inline-block px-4 py-1 text-xs font-semibold text-white rounded-full mb-4" style="background-color: #A855F7;">
          KNOWLEDGE
        </span>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {{ share.title }}
        </h1>
        <div class="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <span>{{ formatDate(share.date) }}</span>
          <span>·</span>
          <span>{{ share.readTime }} 分钟阅读</span>
          <span>·</span>
          <span>EvenKnow</span>
        </div>
        <div v-if="share.cover" class="mb-8">
          <img
            :src="share.cover"
            :alt="share.title"
            loading="lazy"
            class="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          >
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <router-link
            v-for="tag in share.tags"
            :key="tag"
            :to="`/tag/${encodeURIComponent(tag)}`"
            class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
          >
            #{{ tag }}
          </router-link>
        </div>
      </header>

      <div
        ref="contentRef"
        class="prose prose-lg max-w-none dark:prose-invert"
        v-html="rendered"
      ></div>

      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">看完了？也欢迎在评论区交流你的实践。</p>
        <router-link to="/share" class="btn-secondary">
          回到知识分享
        </router-link>
      </footer>
    </article>
  </div>

  <div v-else class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">分享内容不存在</h1>
    <router-link to="/share" class="btn-primary">回到知识分享</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github-dark.css'
import { getShare } from '../share'

import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('css', css)

const md = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

const route = useRoute()
const contentRef = ref<HTMLElement>()

const share = computed(() => getShare(route.params.slug as string))
const rendered = computed(() => share.value ? md.parse(share.value.content) as string : '')

const formatDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric'
})

const enhanceCodeBlocks = () => {
  if (!contentRef.value) return
  contentRef.value.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
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

useHead(computed(() => ({
  title: share.value ? `${share.value.title} - EvenKnow` : '知识分享 - EvenKnow',
  meta: [{ name: 'description', content: share.value?.excerpt || '' }]
})))

watch(rendered, async () => {
  await nextTick()
  enhanceCodeBlocks()
})

onMounted(async () => {
  await nextTick()
  enhanceCodeBlocks()
})
</script>
