<script setup lang="ts">
import { Monitor, Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useThemeStore } from '@/stores/useTheme'

const themeStore = useThemeStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Sun v-if="themeStore.theme === 'light'" class="h-[1.2rem] w-[1.2rem]" />
        <Moon v-else-if="themeStore.theme === 'dark'" class="h-[1.2rem] w-[1.2rem]" />
        <Monitor v-else class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="themeStore.setTheme('light')">
        <Sun class="mr-2 h-4 w-4" /> Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="themeStore.setTheme('dark')">
        <Moon class="mr-2 h-4 w-4" /> Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="themeStore.setTheme('system')">
        <Monitor class="mr-2 h-4 w-4" /> System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
