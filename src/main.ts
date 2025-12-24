import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { modules as apiModules } from '@/api/modules'
import App from './App.vue'
import { createApiApp } from './plugins/api'
import router from './router'

import './style.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Opsional: atur config default di sini
      retry: 1,
    },
  },
})

const pinia = createPinia()
const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })

const apiClient = createApiApp(app)
const api = apiModules(apiClient)

app.provide('api', api)
app.provide('apiClient', apiClient)

app.use(router)
app.use(pinia)
app.mount('#app')
