<script setup lang="ts" generic="T">
import type { TableProps } from './types'
import { LoaderCircle, SearchIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import AppPagination from '@/components/app/pagination/AppPagination.vue'
import AppSearchInput from '@/components/app/search-input/AppSearchInput.vue'
import SectionEmpty from '@/components/section/SectionEmpty.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const {
  pagination = {
    page: 1,
    perPage: 10,
    total: 10,
  },
  showSearch = true,
  loading = false,
  searchPlaceholder = 'Search..',
  showTools = true,
} = defineProps<TableProps<T>>()

defineEmits<{
  'change:pagination': []
}>()

const search = defineModel<string>('search')

function setAlignment(alignment?: 'start' | 'center' | 'end') {
  if (alignment === 'end')
    return 'text-end'
  else if (alignment === 'center')
    return 'text-center'
  else return 'text-start'
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const page = defineModel<number>('page')

function handleUpdatePage(pageNum: number) {
  page.value = pageNum
}

const itemNumber = computed(() => {
  return (index: number) => {
    if (pagination && pagination.perPage && page.value) {
      return (page.value - 1) * pagination.perPage + index + 1
    }
    return 0
  }
})
</script>

<template>
  <div class="border rounded-2xl bg-white dark:border-neutral-700 dark:divide-neutral-700">
    <div v-if="!noAction" class="flex md:flex-row flex-col justify-between items-center mb-2 gap-2">
      <div class="p-4 md:min-w-[40%] md:w-auto w-full">
        <div v-if="showSearch" class="relative md:max-w-xs">
          <AppSearchInput v-model="search" :prefix-icon="SearchIcon" :placeholder="searchPlaceholder" />
        </div>
      </div>
      <div class="flex md:flex-row flex-col pr-4 md:pl-0 pl-4 gap-2 md:w-auto w-full" :class="{ 'py-4': !showSearch }">
        <slot v-if="showTools" name="tools">
          <Button type="button" @click="addHandler">
            Create
          </Button>
        </slot>
      </div>
    </div>

    <div class="overflow-x-auto">
      <Table class="mb-6 sm:text-base">
        <TableHeader>
          <TableRow>
            <TableHead v-for="head, index in headers" :key="index" class="font-bold bg-accent py-4" scope="col" :class="[setAlignment(head.align), head.headerClass]">
              <slot :name="`header.${head.value}`" :head="head">
                {{ head.label }}
              </slot>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading" class="hover:bg-white">
            <TableCell :colspan="headers.length">
              <LoaderCircle class="mt-10 h-6 w-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
          <TableRow v-else-if="!items || items.length === 0" class="hover:bg-white">
            <TableCell :colspan="headers.length">
              <SectionEmpty title="Empty" description="There is no data" action-title="Create New One" />
            </TableCell>
          </TableRow>
          <TableRow v-for="item, index in items" v-else :key="index">
            <TableCell v-for="head, colIndex in headers" :key="colIndex" :class="[head.cellClass, setAlignment(head.align)]" class="font-medium">
              <slot :name="`item.${head.value}`" :item="item">
                <span v-if="head.value === 'no'">{{ itemNumber(index) }}</span>
                <span v-else>{{ getNestedValue(item, head.value) }} </span>
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div v-if="!noPagination" class="py-4 px-4">
      <AppPagination v-if="pagination" :page="page" :page-size="pagination.perPage" :total="pagination.total" @update:page="handleUpdatePage" />
    </div>
  </div>
</template>
