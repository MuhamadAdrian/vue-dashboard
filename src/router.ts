import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

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

export default router
