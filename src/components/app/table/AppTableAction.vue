<script setup lang="ts" generic="T">
import type { Props } from './types'
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import AppModal from '@/components/app/modal/AppModal.vue'
import Button from '@/components/ui/button/Button.vue'
import { useApi } from '@/composables/useApi'

const { id, path, refresh, deletePath, deleteAction } = defineProps<Props<T>>()

const router = useRouter()

function handleAction(type: 'view' | 'edit' | 'delete') {
  let routePath = path
  let routeQuery = ''
  if (path?.includes('?')) {
    routePath = path.split('?')[0]
    routeQuery = `?${path.split('?')[1].toString()}`
  }

  // On View
  if (type === 'view')
    router.push(`/${routePath}/${id}${routeQuery}`)
  else if (type === 'edit')
    router.push(`/${routePath}/edit/${id}${routeQuery}`)
  else handleShowModalDelete()
}

const showDeleteModal = ref(false)

function handleShowModalDelete() {
  showDeleteModal.value = !showDeleteModal.value
}

const { apiClient } = useApi()
const isDeleting = ref(false)
async function handleDelete() {
  try {
    isDeleting.value = true
    if (deletePath) {
      await apiClient(`${deletePath}/${id}`, {
        method: 'DELETE',
      })
    }

    else if (deleteAction) {
      await deleteAction()
    }

    toast.success('Deletion was successful !')

    if (refresh)
      refresh()
  }
  catch (err: any) {
    toast.error(err?.response?._data?.message || 'Terjadi kesalahan')
  }
  finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}
</script>

<template>
  <div class="inline-flex gap-2">
    <Button v-if="!hideView" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('view')">
      <EyeIcon class="w-5 h-5" />
    </Button>
    <Button v-if="!hideEdit" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('edit')">
      <PencilIcon class="w-5 h-5" />
    </Button>
    <Button v-if="!hideDelete" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('delete')">
      <TrashIcon class="w-5 h-5" />
    </Button>
  </div>

  <AppModal
    v-model:open="showDeleteModal"
    :title="`Are you sure want to delete ${title || ''} ?`"
    description="Make sure you are right about this operation"
    cancel-text="Cancel"
    :loading="isDeleting"
    confirm-text="Delete"
    @delete="handleDelete"
  />
</template>
