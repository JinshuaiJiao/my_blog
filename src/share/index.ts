import claudecode from '../md/claudecode基础分享.md?raw'
import mvp from '../md/用claude一天搞完一个MVP.md?raw'
import workflow from '../md/宁学伴AI协作工作流分享.md?raw'
import test from '../md/AI驱动测试工程师进化之路.md?raw'

export interface Share {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tags: string[]
  cover: string
  content: string
}

export const shares: Share[] = [
  {
    slug: 'claudecode-basics',
    title: 'Claude Code 基础分享：从安装、配置到日常工作流',
    excerpt: '内部分享整理：Claude Code 安装升级、settings 关键项、常用 skill / hook 与 MCP 接入要点，团队级配置一份带走。',
    date: '2026-04-30',
    readTime: 25,
    tags: ['Claude Code', 'CLI', '团队分享'],
    cover: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg',
    content: claudecode,
  },
  {
    slug: 'claude-mvp-in-one-day',
    title: '用 Claude 一天搞完一个 MVP：观测中枢 WatchHub 复盘',
    excerpt: '一个真实的 AI Agent 驱动开发记录：从需求拆解、原型验证到上线，单人单天交付一个观测平台 MVP，过程透明、踩坑公开。',
    date: '2026-04-12',
    readTime: 18,
    tags: ['AI Agent', 'MVP', '复盘'],
    cover: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
    content: mvp,
  },
  {
    slug: 'ai-collab-workflow',
    title: '宁学伴 AI 协作工作流：4 人 1 个月做完 10 人 3 个月的项目',
    excerpt: '3 端 SaaS 项目（家长端 / 陪伴官端 / 运营端）的 AI 协作流水线全记录：产品 → 测试 → 后端 → 前端 → 自动化测试，全链路结构化协作。',
    date: '2026-03-20',
    readTime: 15,
    tags: ['AI', '工作流', 'SaaS'],
    cover: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    content: workflow,
  },
  {
    slug: 'ai-driven-testing',
    title: 'AI 驱动测试工程师进化之路：日均 350 次协作、3 个月 30 万行代码',
    excerpt: '从单点工具到全链路协作伙伴 —— 测试工程师如何用 AI 重塑工作流，附真实数据 / 踩坑 / 创新方法与未来展望。',
    date: '2026-02-28',
    readTime: 20,
    tags: ['AI', '测试工程', '工程师成长'],
    cover: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg',
    content: test,
  },
]

export const getShare = (slug: string) => shares.find(s => s.slug === slug)
