<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import type { ProductFormValues } from '@/schema/productSchema'
import { getLocalTimeZone, today } from '@internationalized/date'

import { toTypedSchema } from '@vee-validate/zod'
import { CalendarIcon, Loader2, UploadCloud } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
// ShadCN Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'
import { productSchema } from '@/schema/productSchema'

interface Props {
  initialValues: Record<string, any>
  type?: 'edit' | 'view'
}

const { initialValues, type = null } = defineProps<Props>()

const emit = defineEmits(['close'])
const isLoading = ref(false)

const form = useForm<ProductFormValues>({
  validationSchema: toTypedSchema(productSchema),
  initialValues: initialValues || { name: '', price: 0, category: '' },
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

const defaultPlaceholder = today(getLocalTimeZone())
const date = ref() as Ref<DateValue>
</script>

<template>
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent class="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{{ type === 'edit' ? 'Edit' : type === 'view' ? 'View' : 'Create' }} Product</DialogTitle>
      </DialogHeader>

      <form class="space-y-6" @submit="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h3 class="text-sm font-medium text-muted-foreground border-b pb-2">
              General Information
            </h3>

            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Macbook Pro" v-bind="componentField" :disabled="type === 'view' || isLoading" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="category">
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select v-bind="componentField" :disabled="type === 'view' || isLoading">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electronics">
                        Electronics
                      </SelectItem>
                      <SelectItem value="Furniture">
                        Furniture
                      </SelectItem>
                      <SelectItem value="Clothing">
                        Clothing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="price">
                <FormItem>
                  <FormLabel>Base Price (IDR)</FormLabel>
                  <FormControl>
                    <Input type="number" v-bind="componentField" :disabled="type === 'view' || isLoading" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your product in detail..."
                    class="h-32 resize-none"
                    v-bind="componentField"
                    :disabled="type === 'view' || isLoading"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-medium text-muted-foreground border-b pb-2">
              Inventory & Settings
            </h3>

            <FormField v-slot="{ value }" name="releaseDate">
              <FormItem class="flex flex-col">
                <FormLabel>Release Date</FormLabel>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      :disabled="type === 'view' || isLoading"
                      :class="cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')"
                    >
                      <CalendarIcon />
                      {{ value ?? "Pick a date" }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0" align="start">
                    <Calendar
                      v-model="date"
                      :default-placeholder="defaultPlaceholder"
                      layout="month-and-year"
                      initial-focus
                      :disabled="type === 'view' || isLoading"
                      @update:model-value="form.setFieldValue('releaseDate', date.toString())"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="image">
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
                  <div class="space-y-1 text-center">
                    <UploadCloud class="mx-auto h-10 w-10 text-muted-foreground" />
                    <Input id="picture" type="file" />
                    <p class="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </FormItem>
            </FormField>

            <div class="bg-muted/30 p-4 rounded-lg space-y-4">
              <FormField v-slot="{ value, handleChange }" name="isPublished">
                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                  <div class="space-y-0.5">
                    <FormLabel>Publish Immediately</FormLabel>
                    <FormDescription>Product will be visible to customers.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>

              <FormField v-slot="{ value, handleChange }" name="isFeatured">
                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                  <div class="space-y-0.5">
                    <FormLabel>Featured Product</FormLabel>
                    <FormDescription>Display on the homepage banner.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" :disabled="isLoading" @click="emit('close')">
            Discard
          </Button>
          <Button v-if="type !== 'view'" type="submit" :disabled="isLoading" class="px-8">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isLoading ? 'Processing...' : 'Save Product' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
