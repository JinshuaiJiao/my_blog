<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-5xl mx-auto">
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
          高级 Web 前端开发工程师 · Vue3 / React / TypeScript · AI 工作流实践者
        </p>

        <div class="flex flex-wrap justify-center gap-4 animate-fade-in" style="animation-delay: 400ms;">
          <a href="https://github.com/JinshuaiJiao" target="_blank"
            class="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:17363090989@163.com"
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
              5 年 Web 前端开发经验，主战场是 Vue3 / React / TypeScript，长期参与 SaaS 中台、H5 与小程序业务的从 0 到 1 落地。
            </p>
            <p>
              熟悉 Rsbuild / Vite + pnpm Monorepo 的工程化体系，习惯用 MSW + Vitest 守住接口契约和单测质量，对组件封装、权限治理、跨端适配有完整的一线经验。
            </p>
            <p>
              近一年深度实践 Claude Code、Codex 与 AI Agent + MCP 工作流，把 AI 能力落到需求拆解、代码生成、调试定位的真实开发链路上。这个博客就是我把这些经验沉淀下来的地方。
            </p>
          </div>
        </div>

        <!-- Skills -->
        <div class="card p-8 animate-slide-up" style="animation-delay: 200ms;">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">技能专长</h2>
          <div class="space-y-6">
            <div v-for="skill in skills" :key="skill.category" class="space-y-3">
              <div class="flex items-baseline justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ skill.category }}</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ skill.level }}%</span>
              </div>
              <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
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

      <!-- Projects -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">项目经历</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12">近年参与 / 主导的代表性项目</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="(project, index) in projects"
            :key="project.name"
            class="card p-6 flex flex-col animate-slide-up"
            :style="{ 'animation-delay': `${index * 120}ms` }"
          >
            <div class="flex items-start justify-between mb-3 gap-3">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ project.name }}</h3>
              <span class="shrink-0 text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 font-medium">
                {{ project.role }}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{{ project.summary }}</p>
            <ul class="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
              <li v-for="point in project.highlights" :key="point" class="flex">
                <span class="text-primary-500 mr-2">▸</span>
                <span>{{ point }}</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {{ tech }}
              </span>
            </div>
          </article>
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
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div class="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <svg class="w-5 h-5 mr-3 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div class="min-w-0">
                <div class="text-xs text-gray-500 dark:text-gray-400">邮箱</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">17363090989@163.com</div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <svg class="w-5 h-5 mr-3 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div class="min-w-0">
                <div class="text-xs text-gray-500 dark:text-gray-400">电话</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">173 6309 0989</div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <svg class="w-5 h-5 mr-3 text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.667 11.273a.81.81 0 01-.81-.81.81.81 0 011.62 0 .81.81 0 01-.81.81m6.666 0a.81.81 0 01-.81-.81.81.81 0 011.62 0 .81.81 0 01-.81.81M9.5 4C5.358 4 2 6.91 2 10.5c0 2.045 1.083 3.86 2.764 5.057L4 18l2.728-1.382c.79.218 1.625.336 2.5.336.146 0 .291-.004.435-.011A4.93 4.93 0 019 15.5C9 12.462 11.91 10 15.5 10c.146 0 .291.004.435.011C14.857 7.91 12.358 4 9.5 4M16 11c-3.137 0-5.5 2.014-5.5 4.5 0 1.45.83 2.74 2.124 3.625L12 21l1.852-1.018c.508.107 1.04.165 1.586.169.04.001.084.002.124.002C18.756 20.5 21 18.486 21 16s-2.244-5-5-5"/>
              </svg>
              <div class="min-w-0">
                <div class="text-xs text-gray-500 dark:text-gray-400">微信</div>
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Wx-shuai1126</div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-6">
            <a href="mailto:17363090989@163.com"
              class="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              发送邮件
            </a>
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
import { useHead } from '@vueuse/head'

useHead({
  title: '关于 EvenKnow - 前端工程师',
  meta: [{ name: 'description', content: '5 年 Web 前端开发，主战场 Vue3 / React / TypeScript，深度实践 AI Agent + MCP 工作流。' }],
})

const skills = [
  {
    category: '前端框架',
    level: 92,
    technologies: ['Vue3', 'React', 'TypeScript', 'Pinia', 'Vue Router', 'qiankun']
  },
  {
    category: '工程化与构建',
    level: 88,
    technologies: ['Vite', 'Rsbuild', 'pnpm Monorepo', 'GitLab CI', 'Tailwind CSS', 'SCSS']
  },
  {
    category: '组件库与可视化',
    level: 85,
    technologies: ['Arco Design', 'Element Plus', 'Vant', 'antd-mobile', 'Iconify', 'ECharts', 'Fabric.js']
  },
  {
    category: '测试 / 跨端 / AI',
    level: 82,
    technologies: ['MSW', 'Vitest', 'Taro', 'Uniapp', 'Claude Code', 'Codex', 'MCP']
  }
]

const projects = [
  {
    name: '支付平台 SaaS 管理后台',
    role: '核心开发',
    summary: '资金中心、分账管理、收款方与门店 / POS 模块的从 0 落地，沉淀 Monorepo 公共能力。',
    highlights: [
      '完成资金账户、流水、提现、回单等资金中心全链路',
      '订单分账 / 余额分账 / 复核 / 规则配置全流程',
      'MSW + Vitest 多状态接口 Mock 与单测保障接口契约'
    ],
    stack: ['Vue3', 'TypeScript', 'Arco Design', 'Tailwind CSS', 'Rsbuild', 'pnpm Monorepo', 'Vitest', 'MSW']
  },
  {
    name: '灵活用工 SaaS 平台',
    role: '核心开发',
    summary: 'qiankun 微前端多端 SaaS，覆盖平台、代理商、企业、服务商四端权限治理与开票核心链路。',
    highlights: [
      '企业创建至完税开票核心链路与开票审核改造',
      '下载中心从 0 开发，多端权限分流与动效',
      'v-permission + 路径分流实现按钮 / 筛选 / API 多端治理'
    ],
    stack: ['Vue3', 'TypeScript', 'qiankun', 'Pinia', 'Rsbuild', 'Arco Design', 'Tailwind CSS', 'MSW']
  },
  {
    name: '二手奢侈品销售管理平台',
    role: '核心开发',
    summary: '中台审批流、税务子应用与小程序核心模块开发，从 0 搭建税务子应用并支持中台 / 小程序并行开发。',
    highlights: [
      '审批流配置系统：节点归属、策略、历史版本与多端展示',
      '园区入驻全流程：实名认证、合同签署、状态流转',
      '小程序自助开票：销售 / 收件开票与动态组件渲染'
    ],
    stack: ['Vue3', 'TypeScript', 'Vite', 'Rsbuild', 'Arco Design', 'Pinia', 'Taro', 'MSW', 'pnpm Monorepo']
  },
  {
    name: '签署合同实名认证 H5',
    role: '独立负责',
    summary: '企业客户合同签署前认证流程，从 0 搭建 React + Vite 应用，覆盖营业执照与对公打款认证。',
    highlights: [
      '营业执照 OCR 回填 + 拍照 / 相册上传 + 异常弹框',
      '对公打款：省市级联、卡号校验、金额回填、次数限制',
      '迁移 GitLab CI 至 pnpm 提升缓存命中率与构建稳定性'
    ],
    stack: ['React', 'TypeScript', 'Vite', 'React Router', 'antd-mobile', 'MSW', 'Vitest', 'GitLab CI']
  },
  {
    name: '花生 AI 视频',
    role: '独立负责',
    summary: 'AI 视频生成平台前端，独立搭建 Vue3 + Vite 框架，对接长轮询的 AI 生成接口与画布编辑能力。',
    highlights: [
      'Fabric.js 实现视频封面文案 / 背景图编辑画布',
      'Ali-OSS 分片上传支持图片 / 音频 / 视频素材',
      '长轮询对接分镜文案、正向词、图生图等生成流程'
    ],
    stack: ['Vue3', 'TypeScript', 'Vite', 'Pinia', 'Element Plus', 'Ali-OSS', 'Fabric.js', 'wangEditor']
  }
]

const timeline = [
  {
    title: '高级 Web 前端开发工程师',
    period: '2024.09 - 2026.05',
    description: '宁伙伴（南京）科技服务有限公司。负责 Vue / React / Taro 项目业务开发，结合 Claude Code、Codex 与 MCP 工作流提升研发效率。'
  },
  {
    title: 'Web 前端开发工程师',
    period: '2020.08 - 2024.07',
    description: '南京花笙书城网络科技有限公司。负责小说、短剧系统平台与 AI 剪辑视频平台前端开发与版本迭代。'
  },
  {
    title: '本科 · 计算机科学与技术',
    period: '2017.09 - 2021.07',
    description: '南昌理工学院。系统学习计算机基础与软件工程，并开始接触 Web 前端方向。'
  },
  {
    title: '开始我的技术博客',
    period: '2024 年',
    description: '把 SaaS、跨端、AI 工程化的真实项目经验沉淀成文章，记录技术成长。'
  }
]
</script>
