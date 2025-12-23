<script setup lang="ts">
import { Edit, Plus, Search, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import SectionEmpty from '@/components/section/SectionEmpty.vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ProductFormModal from './ProductFormModal.vue'

const isCreateModalOpen = ref(false)
const isDeleteAlertOpen = ref(false)
const searchQuery = ref('')
const filterCategory = ref('all')
const selectedProduct = ref<string | null>(null)

// Dummy Data
const products = ref([
  { id: '1', name: 'Macbook Pro M3', price: 25000000, category: 'Electronics' },
  { id: '2', name: 'Logitech MX Master', price: 1200000, category: 'Accessories' },
])

// Filter Logic
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCat = filterCategory.value === 'all' || p.category === filterCategory.value
    return matchSearch && matchCat
  })
})

function handleDelete() {
  products.value = products.value.filter(p => p.id !== selectedProduct.value)
  isDeleteAlertOpen.value = false
  toast.success('Product has been deleted successfully.')
}
</script>

<template>
  <div class="p-8 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">
        Product Management
      </h1>
      <Button @click="isCreateModalOpen = true">
        <Plus class="w-4 h-4 mr-2" /> Add Product
      </Button>
    </div>

    <div class="flex gap-4">
      <div class="relative w-72">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input v-model="searchQuery" placeholder="Search products..." class="pl-8" />
      </div>
      <Select v-model="filterCategory">
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

    <div class="border rounded-md">
      <SectionEmpty
        v-if="filteredProducts.length === 0"
        title="No Products Found"
        description="Try adjusting your search or filter to find what you're looking for."
        action-title="Create New One"
        :action="() => { isCreateModalOpen = true }"
      />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead class="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="product in filteredProducts" :key="product.id">
            <TableCell class="font-medium">
              {{ product.name }}
            </TableCell>
            <TableCell>{{ product.category }}</TableCell>
            <TableCell>Rp {{ product.price.toLocaleString() }}</TableCell>
            <TableCell class="text-right space-x-2">
              <Button variant="outline" size="icon">
                <Edit class="w-4 h-4" />
              </Button>
              <Button variant="destructive" size="icon" @click="selectedProduct = product.id; isDeleteAlertOpen = true">
                <Trash2 class="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <ProductFormModal v-if="isCreateModalOpen" @close="isCreateModalOpen = false" />

    <Dialog :open="isDeleteAlertOpen" @update:open="isDeleteAlertOpen = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <p class="text-sm text-muted-foreground">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" @click="isDeleteAlertOpen = false">
            Batal
          </Button>
          <Button variant="destructive" @click="handleDelete">
            Hapus Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
