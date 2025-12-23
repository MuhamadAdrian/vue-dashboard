<script setup lang="ts">
import ChartAreaInteractive from '@/components/chart/ChartAreaInteractive.vue'
import SectionCards from '@/components/section/SectionCards.vue'
</script>

<template>
  <SectionCards class="mb-10" />
  <ChartAreaInteractive class="mb-10" />
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
