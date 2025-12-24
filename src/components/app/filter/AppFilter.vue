<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

interface Props {
  hideSearch?: boolean
}

const { hideSearch = false } = defineProps<Props>()
const search = defineModel<string>('search')
const filter = defineModel('filter')
</script>

<template>
  <div class="flex gap-4">
    <div v-if="!hideSearch" class="relative w-72">
      <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input v-model="search" placeholder="Search products..." class="pl-8" />
    </div>
    <Select v-model="filter">
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All Categories
        </SelectItem>
        <SelectItem value="Electronics">
          Electronics
        </SelectItem>
        <SelectItem value="Accessories">
          Accessories
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
