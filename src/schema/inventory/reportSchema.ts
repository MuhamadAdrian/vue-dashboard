import * as z from 'zod'

export const inventoryReportItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  currentStock: z.number().int(),
  minStockThreshold: z.number().int(),
  status: z.enum(['in_stock', 'low_stock', 'out_of_stock']),
  unitPrice: z.number(),
  totalValue: z.number(),
  lastRestocked: z.string().datetime().optional(),
})

export const inventoryReportSchema = z.object({
  generatedAt: z.string().datetime(),
  period: z.object({
    start: z.string(),
    end: z.string(),
  }),
  summary: z.object({
    totalProducts: z.number(),
    totalStockValue: z.number(),
    lowStockCount: z.number(),
    outOfStockCount: z.number(),
  }),
  stockTrends: z.array(z.object({
    date: z.string(),
    stockIn: z.number(),
    stockOut: z.number(),
  })),
  items: z.array(inventoryReportItemSchema),
})

// Infer types
export type InventoryReportItem = z.infer<typeof inventoryReportItemSchema>
export type InventoryReport = z.infer<typeof inventoryReportSchema> & { id: string }
