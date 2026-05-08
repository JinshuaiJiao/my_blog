export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  readTime: number
  image?: string
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
  postCount: number
}

export interface Author {
  name: string
  bio: string
  avatar: string
  social: {
    github?: string
    twitter?: string
    linkedin?: string
    email?: string
  }
}