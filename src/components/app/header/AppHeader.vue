<script setup lang="ts">
import type { IBreadcrumbItem } from '@/components/app/breadcrumb/types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppBreadcrumb from '@/components/app/breadcrumb/AppBreadcrumb.vue'
import Button from '@/components/ui/button/Button.vue'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import menus from '@/config/menu'
import AppThemeToggle from '../theme/AppThemeToggle.vue'

const route = useRoute()

const breadcrumbs = computed<IBreadcrumbItem[]>(
  () => (route.meta.breadcrumbs as IBreadcrumbItem[]) || [],
)
</script>

<template>
  <header
    class="border-b sticky top-0 z-10 w-full min-w-0 overflow-hidden rounded-t-3xl bg-white dark:bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
  >
    <div class="flex h-(--header-height) shrink-0 items-center gap-2">
      <div
        class="flex w-full items-center gap-1 px-4 pt-2 lg:pt-4 lg:gap-2 lg:px-6"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mx-2 data-[orientation=vertical]:h-4"
        />
        <div
          class="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <RouterLink
            v-for="menu in menus"
            :key="menu.title"
            v-slot="{ isActive, navigate }"
            :to="menu.url"
            custom
          >
            <Button
              class="cursor-pointer shrink-0"
              :variant="isActive ? 'default' : 'ghost'"
              @click="navigate"
            >
              {{ menu.title }}
            </Button>
          </RouterLink>
        </div>
        <AppThemeToggle />
      </div>
    </div>
    <div class="lg:py-4 py-2 px-4 lg:px-6">
      <AppBreadcrumb :items="breadcrumbs" />
    </div>
  </header>
</template>
