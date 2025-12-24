import type { AxiosInstance } from 'axios'
import type { modules } from '@/api/modules'
import { inject } from 'vue'

type ApiModules = ReturnType<typeof modules>

export function useApi() {
  const api = inject<ApiModules>('api')
  const apiClient = inject<AxiosInstance>('apiClient')

  if (!api || !apiClient) {
    throw new Error('useApi: API modules or Client not provided')
  }

  return { api, apiClient }
}
