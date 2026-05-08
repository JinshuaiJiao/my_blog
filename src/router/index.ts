import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import About from '../views/About.vue'
import Category from '../views/Category.vue'
import Tag from '../views/Tag.vue'
import Archive from '../views/Archive.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/post/:id', name: 'PostDetail', component: PostDetail },
    { path: '/about', name: 'About', component: About },
    { path: '/category/:category', name: 'Category', component: Category },
    { path: '/tag/:name', name: 'Tag', component: Tag },
    { path: '/archive', name: 'Archive', component: Archive },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
