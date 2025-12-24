<script setup lang="ts">
import type { ResponseDataPagination } from '@/api/types'
import type { Header } from '@/components/app/table/types'
import type { Product } from '@/schema/productSchema'
import { computed, ref } from 'vue'
import AppFilter from '@/components/app/filter/AppFilter.vue'
import AppTable from '@/components/app/table/AppTable.vue'
import AppTableAction from '@/components/app/table/AppTableAction.vue'
import ProductFormModal from '@/components/inventory/products/ProductFormModal.vue'
import Button from '@/components/ui/button/Button.vue'
import { useApi } from '@/composables/useApi'
import useTableQuery from '@/composables/useTableQuery'

const headers = ref<Header[]>([
  {
    label: 'No',
    value: 'no',
    align: 'center',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Category',
    value: 'category',
  },
  {
    label: 'Action',
    value: 'action',
    align: 'center',
  },
])

const { api } = useApi()

// real use case fetching data
const { data, loading, search, page, refetch } = useTableQuery({
  key: ['data-santri'],
  apiMethod: api.products.get,
  serverSide: true,
})

// Example of Data
const dataSample = ref<ResponseDataPagination<Product[]>>()

dataSample.value = {
  data: [
    { id: '1', name: 'Macbook Pro M3', description: 'Desc', price: 25000000, category: 'Electronics' },
    { id: '2', name: 'Logitech MX Master', description: 'Desc', price: 1200000, category: 'Accessories' },
  ],
  message: 'Success',
  meta: {
    count: 10,
    page: 1,
    per_page: 10,
    total: 14,
    total_pages: 2,
  },
}

const filterCategory = ref('')

// Filter Logic Sample
const filteredProducts = computed(() => {
  return dataSample.value?.data?.filter((p) => {
    if (filterCategory.value) {
      const matchCat = filterCategory.value === 'all' || p.category === filterCategory.value
      return matchCat
    }

    return dataSample.value.data
  })
})

const isCreateModalOpen = ref(false)
const formType = ref<undefined | 'edit' | 'view'>(undefined)
const initialValues = ref()

function handleModalOnClose() {
  isCreateModalOpen.value = false

  formType.value = undefined
}

function handleDetailAction(item: Product, action: 'view' | 'edit') {
  formType.value = action

  initialValues.value = dataSample.value.data.find(d => d.id === item.id)
  console.log(initialValues.value)
  isCreateModalOpen.value = true
}
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">
    Product Management
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
    :items="filteredProducts"
    :loading="loading"
    search-placeholder="Search by Name"
  >
    <template #tools>
      <AppFilter v-model:filter="filterCategory" hide-search />
      <Button type="button" @click="isCreateModalOpen = true">
        Create
      </Button>
    </template>
    <template #[`item.action`]="{ item }">
      <AppTableAction
        :id="item.id"
        :delete-action="() => api.products.delete(item.id)"
        :edit-action="() => handleDetailAction(item, 'edit')"
        :view-action="() => handleDetailAction(item, 'view')"
        :title="item.name"
        path="inventory"
        :refresh="refetch"
      />
    </template>
  </AppTable>

  <ProductFormModal v-if="isCreateModalOpen" :type="formType" :initial-values="initialValues" @close="handleModalOnClose" />
</template>

<route lang="yaml">
meta:
    breadcrumbs:
        - title: "Inventory"
          url: "/inventory"
        - title: "Products"
          url: "/inventory/products"
</route>
