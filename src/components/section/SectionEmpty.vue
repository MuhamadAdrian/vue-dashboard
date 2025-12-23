<script setup lang="ts">
import type { ISectionEmpty } from './types'
import { IconMoodEmpty } from '@tabler/icons-vue'
import { Cloud } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

defineProps<ISectionEmpty>()
</script>

<template>
  <Empty class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <IconMoodEmpty />
      </EmptyMedia>
      <EmptyTitle>{{ title }}</EmptyTitle>
      <EmptyDescription>
        {{ description }}
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm" @click="action">
        {{ actionTitle }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
