<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <section class="text-center mb-16 py-16">
        <div class="relative inline-block mb-8">
          <img src="https://avatars.githubusercontent.com/u/182908346?v=4" alt="头像"
            class="w-40 h-40 rounded-full object-cover shadow-xl animate-scale-in">
          <div
            class="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
            <span class="text-white text-xl">👋</span>
          </div>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-slide-up">
          你好，我是
          <span class="gradient-text">EvenKnow</span>
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style="animation-delay: 200ms;">
          前端开发工程师 · Vue.js 爱好者 · 开源贡献者
        </p>

        <div class="flex flex-wrap justify-center gap-4 animate-fade-in" style="animation-delay: 400ms;">
          <a href="https://github.com" target="_blank"
            class="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:your-email@example.com"
            class="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            联系我
          </a>
        </div>
      </section>

      <!-- About Content -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <!-- Bio -->
        <div class="card p-8 animate-slide-up">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">关于我</h2>
          <div class="prose prose-lg text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              我是一名充满热情的全栈开发工程师，专注于现代 Web 技术。拥有 5 年的开发经验，
              擅长 Vue.js、React、Node.js 等技术栈。
            </p>
            <p>
              我热爱学习新技术，享受解决复杂问题的过程，同时也乐于分享自己的知识和经验。
              通过这个博客，我希望能够帮助更多的开发者成长。
            </p>
            <p>
              当我不在编程时，我喜欢阅读技术书籍、参与开源项目，以及与其他开发者交流学习。
            </p>
          </div>
        </div>

        <!-- Skills -->
        <div class="card p-8 animate-slide-up" style="animation-delay: 200ms;">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">技能专长</h2>
          <div class="space-y-6">
            <div v-for="skill in skills" :key="skill.category" class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ skill.category }}</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in skill.technologies" :key="tech"
                  class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">我的历程</h2>
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 dark:bg-gray-600"></div>

          <div class="space-y-12">
            <div v-for="(item, index) in timeline" :key="index" class="relative flex items-center animate-fade-in"
              :style="{ 'animation-delay': `${index * 200}ms` }">
              <!-- Timeline dot -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg">
              </div>

              <!-- Content -->
              <div :class="[
                'w-5/12',
                index % 2 === 0 ? 'pr-8 text-right' : 'ml-auto pl-8'
              ]">
                <div class="card p-6">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ item.title }}</h3>
                  <p class="text-primary-600 dark:text-primary-400 font-medium mb-2">{{ item.period }}</p>
                  <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="text-center">
        <div class="card p-12 animate-scale-in">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">让我们保持联系</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            如果你有任何问题或想要合作，欢迎随时与我联系！
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <span @click="handleClick"
              class="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              发送邮件
            </span>
            <a href="https://github.com/JinshuaiJiao" target="_blank"
              class="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  {
    category: '前端技术',
    technologies: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Rsbuild']
  },
  {
    category: '后端技术',
    technologies: ['Node.js', 'Express']
  },
  {
    category: '工具 & 部署',
    technologies: ['Git', 'Docker', 'Vercel', 'GitHub Actions', 'Jest']
  }
]

const timeline = [
  {
    title: '开始我的博客之旅',
    period: '2024年',
    description: '创建个人技术博客，开始分享技术文章和学习心得。'
  },
  {
    title: '前端开发工程师',
    period: '2020年 - 至今',
    description: '专注于前端开发，深入学习 Vue.js 和现代前端技术栈。'
  }
]

const handleClick = () => {
  window.alert('发送邮箱至3157046830@qq.com')
}
</script>