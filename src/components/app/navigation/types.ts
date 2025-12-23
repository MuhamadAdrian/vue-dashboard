import type { Component } from 'vue'

export interface NavItem {
  title: string
  url: string
  icon?: Component
  groupTitle?: string
  subMenu?: NavItem[]
}
