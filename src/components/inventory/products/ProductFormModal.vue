<script setup lang="ts">
import type { ProductFormValues } from '@/schema/productSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { productSchema } from '@/schema/productSchema'

const emit = defineEmits(['close'])
const isLoading = ref(false)

const form = useForm<ProductFormValues>({
  validationSchema: toTypedSchema(productSchema),
  initialValues: { name: '', price: 0, category: '' },
})

const onSubmit = form.handleSubmit(async () => {
  isLoading.value = true

  // Dummy Process
  await new Promise(resolve => setTimeout(resolve, 2000))

  isLoading.value = false

  toast.promise<{ name: string }>(
    () =>
      new Promise(resolve =>
        setTimeout(() => resolve({ name: 'Product' }), 2000),
      ),
    {
      loading: 'Loading...',
      success: (data: { name: string }) => `${data.name} has been created`,
      error: 'Error',
    },
  )

  emit('close')
})
</script>

<template>
  <Dialog :open="true" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Tambah Produk Baru</DialogTitle>
      </DialogHeader>

      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nama Produk</FormLabel>
            <FormControl>
              <Input placeholder="Contoh: Laptop Gaming" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
          <FormItem>
            <FormLabel>Kategori</FormLabel>
            <FormControl>
              <Input placeholder="Electronics" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Harga (IDR)</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" :disabled="isLoading" @click="$emit('close')">
            Batal
          </Button>
          <Button type="submit" :disabled="isLoading">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isLoading ? 'Menyimpan...' : 'Simpan Produk' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
