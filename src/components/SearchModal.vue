<template>
  <Teleport to="body">
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
      @mousedown.self="close"
    >
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-4 scale-95"
      >
        <div
          v-if="open"
          class="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          @click.stop
        >
          <!-- Search Input -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="搜索文章…"
                class="w-full pl-12 pr-4 py-3 text-base rounded-xl border-2 border-primary-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                @keydown.down.prevent="moveCursor(1)"
                @keydown.up.prevent="moveCursor(-1)"
                @keydown.enter.prevent="selectCurrent"
                @keydown.esc="close"
              >
            </div>
          </div>

          <!-- Body -->
          <div ref="bodyRef" class="max-h-[60vh] overflow-y-auto">
            <!-- 有结果 -->
            <ul v-if="query && results.length > 0" class="p-2">
              <li
                v-for="(item, idx) in results"
                :key="item.id"
                :data-idx="idx"
                @mouseenter="cursor = idx"
                @click="selectItem(item)"
                class="flex items-start gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors"
                :class="cursor === idx
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
              >
                <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div class="min-w-0 flex-1">
                  <div class="font-medium truncate" :class="cursor === idx ? 'text-white' : 'text-gray-900 dark:text-gray-100'">
                    {{ item.title }}
                  </div>
                  <div class="text-xs mt-0.5 line-clamp-1" :class="cursor === idx ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
                    {{ item.excerpt }}
                  </div>
                </div>
                <svg class="w-4 h-4 shrink-0 mt-1" :class="cursor === idx ? 'opacity-100' : 'opacity-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </li>
            </ul>

            <!-- 空结果 -->
            <div v-else-if="query && results.length === 0" class="px-6 py-12 text-center">
              <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500 dark:text-gray-400">没有找到「<span class="font-medium text-gray-700 dark:text-gray-200">{{ query }}</span>」相关的结果</p>
            </div>

            <!-- 历史 -->
            <div v-else-if="history.length > 0" class="p-2">
              <div class="px-4 py-2 flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">最近搜索</span>
                <button
                  @click="clearHistory"
                  class="text-xs text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  清空
                </button>
              </div>
              <ul>
                <li
                  v-for="item in history"
                  :key="item.id"
                  @click="selectItem(item)"
                  class="flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{{ item.title }}</span>
                  <button
                    @click.stop="removeHistory(item.id)"
                    class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    aria-label="移除"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            <!-- 空状态 -->
            <div v-else class="px-6 py-16 text-center">
              <p class="text-gray-400 dark:text-gray-500 text-sm">没有搜索历史</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="flex items-center gap-1">
                <kbd class="kbd">↵</kbd> 选择
              </span>
              <span class="flex items-center gap-1">
                <kbd class="kbd">↑</kbd>
                <kbd class="kbd">↓</kbd> 切换
              </span>
              <span class="flex items-center gap-1">
                <kbd class="kbd">esc</kbd> 关闭
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="hidden sm:inline">由</span>
              <span class="font-semibold gradient-text">EvenKnow</span>
              <span class="hidden sm:inline">驱动</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { useBlogStore } from '../stores/blog'
import type { Post } from '../types/blog'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>()

const router = useRouter()
const blogStore = useBlogStore()

const query = ref('')
const cursor = ref(0)
const inputRef = ref<HTMLInputElement>()
const bodyRef = ref<HTMLElement>()

const HISTORY_KEY = 'search-history-v1'

interface HistoryItem { id: string; title: string }
const history = ref<HistoryItem[]>([])

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    history.value = raw ? JSON.parse(raw) : []
  } catch {
    history.value = []
  }
}

const saveHistory = () => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
  } catch {}
}

const fuse = computed(() => new Fuse(blogStore.posts, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'excerpt', weight: 2 },
    { name: 'tags', weight: 2 },
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
}))

const results = computed<Post[]>(() => {
  if (!query.value.trim()) return []
  return fuse.value.search(query.value).slice(0, 8).map(r => r.item)
})

watch(query, () => { cursor.value = 0 })

const close = () => emit('update:open', false)

const moveCursor = (delta: number) => {
  const list = results.value
  if (list.length === 0) return
  cursor.value = (cursor.value + delta + list.length) % list.length
  nextTick(() => {
    bodyRef.value?.querySelector(`[data-idx="${cursor.value}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  })
}

const pushHistory = (post: Post) => {
  history.value = [
    { id: post.id, title: post.title },
    ...history.value.filter(h => h.id !== post.id),
  ].slice(0, 8)
  saveHistory()
}

const selectItem = (item: Post | HistoryItem) => {
  const post = 'excerpt' in item ? item : blogStore.getPostById(item.id)
  if (!post) return
  pushHistory(post)
  router.push(`/post/${post.id}`)
  close()
}

const selectCurrent = () => {
  if (results.value.length === 0) return
  selectItem(results.value[cursor.value])
}

const removeHistory = (id: string) => {
  history.value = history.value.filter(h => h.id !== id)
  saveHistory()
}

const clearHistory = () => {
  history.value = []
  saveHistory()
}

watch(() => props.open, async (v) => {
  if (v) {
    query.value = ''
    cursor.value = 0
    loadHistory()
    await nextTick()
    inputRef.value?.focus()
  }
})

const onGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    emit('update:open', !props.open)
    return
  }
  if (props.open && e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

watch(() => props.open, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v ? 'hidden' : ''
})

onMounted(() => {
  loadHistory()
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
.kbd {
  @apply inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5
         text-[10px] font-mono font-semibold
         text-gray-600 dark:text-gray-300
         bg-white dark:bg-gray-700
         border border-gray-300 dark:border-gray-600
         rounded shadow-sm;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
