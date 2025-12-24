import type { AxiosInstance } from 'axios'
import type { modules } from '@/api/modules'
import { inject } from 'vue'

// Get the return type of the modules function
type ApiModules = ReturnType<typeof modules>

export function useApi() {
  // Pass the type to inject: inject<T>(key)
  const api = inject<ApiModules>('api')
  const apiClient = inject<AxiosInstance>('apiClient')

  if (!api || !apiClient) {
    throw new Error('useApi: API modules or Client not provided')
  }

  return { api, apiClient }
}
