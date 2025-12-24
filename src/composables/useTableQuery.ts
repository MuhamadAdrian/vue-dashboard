import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { refDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

interface UseTableOptions<TData> {
  key: string[]
  apiMethod: (params: { search?: unknown, page?: unknown }) => Promise<TData>
  serverSide?: boolean
  params?: Record<string, unknown>
  enabled?: boolean
  pagination?: boolean
}

export default function useTableQuery<TData>({ pagination = true, ...options }: UseTableOptions<TData>) {
  const route = useRoute()
  const router = useRouter()

  const filter = ref<Record<string, string>>({})

  // Page state
  const page = computed<number>({
    get: () => Number(route.query.page) || 1,
    set: (val: number) => {
      router.replace({
        query: {
          ...route.query,
          page: val,
        },
      })
    },
  })
  const debouncedPage = refDebounced(page, 200)

  // Search state
  const searchClient = ref('')
  const search = computed<string>({
    get: () =>
      options.serverSide
        ? (route.query.search as string) || ''
        : searchClient.value,
    set: (val: string) => {
      if (options.serverSide) {
        router.replace({
          query: {
            ...route.query,
            page: 1,
            search: val,
          },
        })
      }
      else {
        searchClient.value = val
      }
    },
  })
  const debouncedSearch = refDebounced(search, 200)

  // Query setup
  const { status, error, ...resQuery } = useQuery<TData>({
    queryKey: pagination
      ? [
          ...options.key,
          JSON.stringify({ search: search.value, page: page.value, ...filter.value }),
        ]
      : [options.key, JSON.stringify({ search: search.value })],
    queryFn: () => {
      const baseParams = {
        search: debouncedSearch.value,
        page: pagination ? debouncedPage.value : undefined,
      }

      return options.apiMethod({
        ...baseParams,
        ...options.params,
        ...filter.value,
      })
    },
    enabled: options.enabled ?? true,
  })

  watch(status, (val) => {
    if (val === 'error') {
      toast.error('Something when wrong', {
        description: error.value?.message,
      })
    }
  })

  if (pagination) {
    watch([debouncedSearch, debouncedPage, filter], () => {
      resQuery.refetch()
    }, {
      deep: true,
    })
  }

  else {
    watch([debouncedSearch, filter], () => {
      resQuery.refetch()
    }, {
      deep: true,
    })
  }

  return {
    ...resQuery,
    filter,
    loading: resQuery.isLoading,
    search,
    page,
    data: resQuery.data as Ref<TData | undefined>,
  }
}
