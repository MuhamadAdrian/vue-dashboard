<script setup lang="ts">
import ChartAreaInteractive from '@/components/ChartAreaInteractive.vue'
import SectionCards from '@/components/SectionCards.vue'
</script>

<template>
  <SectionCards class="mb-10" />
  <ChartAreaInteractive />
  <ChartAreaInteractive />
</template>

<route lang="yaml">
meta:
    breadcrumbs:
        - title: "Inventory"
          url: "/inventory"
        - title: "Dashboard"
          url: "/inventory"
</route>
