import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import About from '../views/About.vue'
import Category from '../views/Category.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/category/:category',
      name: 'Category',
      component: Category
    }
  ]
})

export default router