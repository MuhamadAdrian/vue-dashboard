export interface Header {
  label: string
  value: string
  headerClass?: string
  cellClass?: string
  align?: Alignment
}

export interface Pagination {
  total?: number
  count?: number
  perPage?: number
  page?: number
  totalPages?: number
}

export interface TableItem {
  label: string
  value: string
  headerClass?: string
  cellClass?: string
  align?: Alignment
}

export interface TableProps<T> {
  headers: TableItem[]
  items?: T[]
  showSearch?: boolean
  showPagination?: boolean
  pagination?: Pagination
  loading?: boolean
  searchPlaceholder?: string
  noPagination?: boolean
  noAction?: boolean
  addHandler?: VoidFunction
  showTools?: boolean
  dense?: boolean
}

export type Alignment = 'start' | 'center' | 'end'

export interface Props<T> {
  id: string
  hideView?: boolean
  hideDelete?: boolean
  hideEdit?: boolean
  path?: string
  title?: string
  loading?: boolean
  deletePath?: string
  deleteAction?: () => Promise<T>
  refresh?: () => void
}
