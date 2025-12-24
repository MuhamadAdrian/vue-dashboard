import type { AxiosInstance } from 'axios'
import axios from 'axios'
import router from '@/router'

export function createApiApp(_app: any) {
  const baseURL = `${import.meta.env.VITE_API_URL}/api`

  const client: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  })

  client.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response?.status === 401) {
        await router.push('/auth/login')
      }
      return Promise.reject(error)
    },
  )

  return client
}
