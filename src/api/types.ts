export interface Meta {
  total: number
  count: number
  per_page: number
  page: number
  total_pages: number
}

export interface ResponseData<T> {
  data: T
  message: string
}

export interface ResponseDataPagination<T> {
  data: T
  meta: Meta
  message: string
}
