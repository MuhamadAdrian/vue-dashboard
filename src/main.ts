import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes' // Import rute otomatis
import App from './App.vue'

import './style.css'

const customRoutes = [
  {
    path: '/',
    redirect: '/inventory',
  },
  ...routes,
]

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(customRoutes),
})

const app = createApp(App)

app.use(router)

app.mount('#app')
