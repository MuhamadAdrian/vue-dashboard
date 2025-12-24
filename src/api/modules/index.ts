import type { AxiosInstance } from 'axios'
import ProductModule from './inventory/products.api'
import ReportModule from './inventory/reports.api'

export function path() {
  return {
    products: '/products',
    reports: '/reports',
  }
}

export function modules($fetch: AxiosInstance) {
  return {
    products: new ProductModule($fetch, path().products),
    reports: new ReportModule($fetch, path().reports),
  }
}
