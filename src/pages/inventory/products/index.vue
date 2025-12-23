<script setup lang="ts">
import ProductDashboard from '@/components/inventory/products/ProductDashboard.vue'
</script>

<template>
  <ProductDashboard />
</template>

<route lang="yaml">
meta:
    breadcrumbs:
        - title: "Inventory"
          url: "/inventory"
        - title: "Products"
          url: "/inventory/products"
</route>
