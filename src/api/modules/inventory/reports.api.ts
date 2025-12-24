import type { ResponseDataPagination } from '@/api/types'
import type { InventoryReport } from '@/schema/inventory/reportSchema'
import BaseApiModule from '@/api'

class ReportModule extends BaseApiModule {
  get = async (params?: { search?: unknown, page?: unknown }): Promise<ResponseDataPagination<InventoryReport[]>> => {
    return await this.call({ method: 'GET', params })
  }
}

export default ReportModule
