<script setup lang="ts">
import AppSidebar from '@/components/app/sidebar/AppSidebar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SidebarInset from '@/components/ui/sidebar/SidebarInset.vue'
import SidebarProvider from '@/components/ui/sidebar/SidebarProvider.vue'
</script>

<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': 'calc(var(--spacing) * 72)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div class="px-4 lg:px-6">
              <RouterView v-slot="{ Component, route }">
                <transition name="page-slide" mode="out-in">
                  <div :key="route.path">
                    <component :is="Component" />
                  </div>
                </transition>
              </RouterView>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
