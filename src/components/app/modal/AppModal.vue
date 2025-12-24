<script setup lang="ts">
import { LoaderIcon } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'

interface Props {
  title?: string
  description?: string
  loading?: boolean
  confirmText?: string
  type?: 'warning' | 'danger' | 'default'
  cancelText?: string
}

const { cancelText = 'Cancel', confirmText = 'Yes' } = defineProps<Props>()

const emits = defineEmits<{
  delete: []
}>()

const modelValue = defineModel('open', { required: true, default: false })
</script>

<template>
  <Dialog v-model:open="modelValue">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <div class="flex items-center justify-end gap-2">
          <DialogClose>
            <Button type="button" variant="secondary">
              {{ cancelText }}
            </Button>
          </DialogClose>
          <Button type="button" :disabled="loading" @click="emits('delete')">
            <LoaderIcon v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            {{ confirmText }}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
