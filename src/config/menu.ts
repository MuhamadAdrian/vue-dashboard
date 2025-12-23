import { IconActivity, IconAi, IconBox, IconReport } from '@tabler/icons-vue'

export default [
  {
    title: 'Inventory',
    url: '/inventory',
    subMenu: [
      {
        title: 'Dashboard',
        url: '/inventory',
        icon: IconActivity,
      },
      {
        title: 'Products',
        url: '/inventory/products',
        icon: IconBox,
      },
      {
        groupTitle: 'Reports',
        title: 'Report',
        url: '/inventory/reports',
        icon: IconReport,
      },
      {
        groupTitle: 'Reports',
        title: 'AI Forecasting',
        url: '/inventory/ai-forecasting',
        icon: IconAi,
      },
    ],
  },
  {
    title: 'Purchasing',
    url: '/purchasing',
    subMenu: [
      {
        title: 'Dashboard Purchasing',
        url: '/purchasing',
        icon: IconActivity,
      },
    ],
  },
]
