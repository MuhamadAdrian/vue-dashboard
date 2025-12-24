<script setup lang="ts">
import type { ResponseDataPagination } from '@/api/types'
import type { Header } from '@/components/app/table/types'
import type { InventoryReport } from '@/schema/inventory/reportSchema'
import { ref } from 'vue'
import AppTable from '@/components/app/table/AppTable.vue'
import AppTableAction from '@/components/app/table/AppTableAction.vue'
import { useApi } from '@/composables/useApi'
import useTableQuery from '@/composables/useTableQuery'

const { api } = useApi()

const headers = ref<Header[]>([
  {
    label: 'No',
    value: 'no',
    align: 'center',
  },
  {
    label: 'Generated At',
    value: 'generated_at',
  },
  {
    label: 'Total Product',
    value: 'summary.total_products',
  },
  {
    label: 'Stock Out Trend',
    value: 'stock_trends.stock_out',
  },
  {
    label: 'Stock In Trend',
    value: 'stock_trends.stock_in',
  },
  {
    label: 'Action',
    value: 'action',
    align: 'center',
  },
])

// real use case fetching data
const { loading, search, page } = useTableQuery({
  key: ['reports'],
  apiMethod: api.reports.get,
  serverSide: true,
})

const dataSample = ref<ResponseDataPagination<InventoryReport[]>>()

dataSample.value = {
  data: [],
  message: 'Success',
  meta: {
    count: 0,
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">
    Reports
  </h1>

  <AppTable
    v-model:search="search"
    v-model:page="page"
    :pagination="{
      page: dataSample?.meta?.page,
      perPage: dataSample?.meta?.per_page,
      total: dataSample?.meta?.total,
      totalPages: dataSample?.meta?.total_pages,
    }"
    :headers="headers"
    :items="dataSample.data"
    :loading="loading"
    :show-tools="false"
    search-placeholder="Search by Name"
  >
    <template #[`item.action`]="{ item }">
      <AppTableAction
        :id="item.id"
        hide-delete
        hide-edit
        hide-view
      />
    </template>
  </AppTable>
</template>

<route lang="yaml">
meta:
    breadcrumbs:
        - title: "Inventory"
          url: "/inventory"
        - title: "Reports"
          url: "/inventory/reports"
</route>
