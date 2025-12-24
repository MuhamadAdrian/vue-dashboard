<script setup lang="ts">
import type { NavItem } from './types'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import SidebarGroupLabel from '@/components/ui/sidebar/SidebarGroupLabel.vue'

const { items } = defineProps<{
  items: NavItem[]
}>()

const route = useRoute()

const groupedSubMenu = computed(() => {
  const rawSubMenu
    = items.find(
      item => route.path.startsWith(item.url) && item.url !== '/',
    )?.subMenu || []

  const groups = rawSubMenu.reduce<Record<string, NavItem[]>>(
    (result, item) => {
      const groupName = item.groupTitle || '_no_group'
      if (!result[groupName]) {
        result[groupName] = []
      }
      result[groupName].push(item)
      return result
    },
    {},
  )

  return Object.keys(groups).map(name => ({
    name: name === '_no_group' ? null : name,
    items: groups[name],
  }))
})

const { toggleSidebar, isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <SidebarMenu>
        <TransitionGroup name="sidebar-slide">
          <div
            v-for="group in groupedSubMenu"
            :key="group.name ?? 'default'"
          >
            <SidebarGroupLabel
              v-if="group.name"
              class="mt-4 first:mt-0"
            >
              {{ group.name }}
            </SidebarGroupLabel>

            <SidebarMenu>
              <TransitionGroup name="sidebar-slide">
                <SidebarMenuItem
                  v-for="item in group.items"
                  :key="item.title"
                >
                  <RouterLink
                    v-slot="{ isExactActive, navigate }"
                    :to="item.url"
                    custom
                  >
                    <SidebarMenuButton
                      class="cursor-pointer h-9"
                      :tooltip="item.title"
                      :is-active="isExactActive"
                      @click="
                        () => {
                          navigate();
                          isMobile
                            ? toggleSidebar()
                            : null;
                        }
                      "
                    >
                      <component
                        :is="item.icon"
                        v-if="item.icon"
                      />
                      <span>{{ item.title }}</span>
                    </SidebarMenuButton>
                  </RouterLink>
                </SidebarMenuItem>
              </TransitionGroup>
            </SidebarMenu>
          </div>
        </TransitionGroup>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
