<script setup lang="ts">
import {
  Button,
} from '@/components/ui/button'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  currentPage?: number
  total?: number
  pageSize?: number
}

const { total = 100, currentPage = 1, pageSize = 10 } = defineProps<Props>()
const emits = defineEmits<{
  'update:page': [page: number]
}>()

function onUpdatePage(page: number) {
  emits('update:page', page)
}
</script>

<template>
  <Pagination v-slot="{ page }" :total="total" :items-per-page="pageSize" :sibling-count="1" show-edges :default-page="currentPage" @update:page="onUpdatePage">
    <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrevious />

      <template v-for="(item, index) in items">
        <PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</template>
