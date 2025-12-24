import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'dark' | 'light' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>((localStorage.getItem('ui-theme') as Theme) || 'system')

  function applyTheme(targetTheme: Theme) {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (targetTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    }
    else {
      root.classList.add(targetTheme)
    }
  }

  watch(theme, (newTheme) => {
    localStorage.setItem('ui-theme', newTheme)
    applyTheme(newTheme)
  }, { immediate: true })

  function setTheme(val: Theme) {
    theme.value = val
  }

  return { theme, setTheme }
})
