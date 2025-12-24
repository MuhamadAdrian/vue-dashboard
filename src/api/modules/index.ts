import type { AxiosInstance } from 'axios'
import ProductModule from './inventory/products.api'

export function path() {
  return {
    products: '/products',
  }
}

export function modules($fetch: AxiosInstance) {
  return {
    products: new ProductModule($fetch, path().products),
  }
}
