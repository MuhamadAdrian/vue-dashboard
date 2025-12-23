<script setup lang="ts">
import type { IBreadcrumbItem } from './types'
import Breadcrumb from '@/components/ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '@/components/ui/breadcrumb/BreadcrumbItem.vue'
import BreadcrumbLink from '@/components/ui/breadcrumb/BreadcrumbLink.vue'
import BreadcrumbList from '@/components/ui/breadcrumb/BreadcrumbList.vue'
import BreadcrumbPage from '@/components/ui/breadcrumb/BreadcrumbPage.vue'
import BreadcrumbSeparator from '@/components/ui/breadcrumb/BreadcrumbSeparator.vue'

interface Props {
  items: IBreadcrumbItem[]
}

const { items } = defineProps<Props>()

function isLastItem(index: number) {
  return index === items.length - 1
}
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <div
        v-for="(item, index) of items"
        :key="index"
        class="flex items-center gap-4"
      >
        <BreadcrumbItem>
          <BreadcrumbPage v-if="isLastItem(index)">
            {{ item.title }}
          </BreadcrumbPage>
          <BreadcrumbLink v-else as-child>
            <RouterLink :to="item.url">
              {{ item.title }}
            </RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="!isLastItem(index)" />
      </div>
    </BreadcrumbList>
  </Breadcrumb>
</template>
