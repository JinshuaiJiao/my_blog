import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post, Category } from '../types/blog'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<Post[]>([])
  const categories = ref<Category[]>([])
  const currentPage = ref(1)
  const postsPerPage = ref(6)
  const searchQuery = ref('')
  const selectedCategory = ref<string | null>(null)

  // 计算属性
  const filteredPosts = computed(() => {
    let filtered = posts.value

    // 搜索过滤
    if (searchQuery.value) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    }

    // 分类过滤
    if (selectedCategory.value) {
      filtered = filtered.filter(post => post.category === selectedCategory.value)
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage.value
    const end = start + postsPerPage.value
    return filteredPosts.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / postsPerPage.value)
  })

  const featuredPosts = computed(() => {
    return posts.value.filter(post => post.featured).slice(0, 3)
  })

  // 方法
  const loadBlogData = async () => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        fetch('/data/posts.json'),
        fetch('/data/categories.json')
      ])

      posts.value = await postsResponse.json()
      categories.value = await categoriesResponse.json()
    } catch (error) {
      console.error('加载博客数据失败:', error)
    }
  }

  const getPostById = (id: string): Post | undefined => {
    return posts.value.find(post => post.id === id)
  }

  const getPostsByCategory = (category: string): Post[] => {
    return posts.value.filter(post => post.category === category)
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
  }

  const setCategory = (category: string | null) => {
    selectedCategory.value = category
    currentPage.value = 1
  }

  return {
    posts,
    categories,
    currentPage,
    postsPerPage,
    searchQuery,
    selectedCategory,
    filteredPosts,
    paginatedPosts,
    totalPages,
    featuredPosts,
    loadBlogData,
    getPostById,
    getPostsByCategory,
    setPage,
    setSearchQuery,
    setCategory
  }
})