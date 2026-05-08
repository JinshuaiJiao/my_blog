import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { inject as injectAnalytics } from '@vercel/analytics'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)

if (import.meta.env.PROD) {
  injectAnalytics()
}

app.mount('#app')
