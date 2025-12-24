import type { ResponseData, ResponseDataPagination } from '@/api/types'
import type { Product, ProductFormValues } from '@/schema/productSchema'
import BaseApiModule from '@/api'

class ProductModule extends BaseApiModule {
  get = async (params?: { search?: unknown, page?: unknown }): Promise<ResponseDataPagination<Product[]>> => {
    return await this.call({ method: 'GET', params })
  }

  async delete(id: string): Promise<ResponseDataPagination<Product[]>> {
    return await this.call({ method: 'DELETE', url: `${this.path}/${id}` })
  }

  async find(id: string): Promise<ResponseData<Product>> {
    return await this.call({ method: 'GET', url: `${this.path}/${id}` })
  }

  async create(body: ProductFormValues): Promise<ResponseData<Product>> {
    return await this.call({ method: 'POST', body })
  }

  async update(id: string, body: ProductFormValues): Promise<ResponseData<Product>> {
    return await this.call({ method: 'PUT', body, url: `${this.path}/${id}` })
  }
}

export default ProductModule
