<script setup lang="ts">
import {
  IconHash,
  IconHelp,
  IconSearch,
  IconSettings,
} from '@tabler/icons-vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import menus from '@/config/menu'
import AppNavigationMenu from '../navigation/AppNavigationMenu.vue'
import AppNavigationSecondary from '../navigation/AppNavigationSecondary.vue'
import AppNavigationUser from '../navigation/AppNavigationUser.vue'

const data = {
  user: {
    name: 'Adrian',
    email: 'adrian@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
}
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <a href="#" class="flex items-center">
            <IconHash class="!size-5" />
            <span class="text-base font-semibold">HashMicro</span>
          </a>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent class="overflow-hidden">
      <AppNavigationMenu :items="menus" />
    </SidebarContent>
    <SidebarFooter>
      <AppNavigationSecondary :items="data.navSecondary" />
      <AppNavigationUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
