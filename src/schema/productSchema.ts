import * as z from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Minimum 3 character '),
  price: z.number().min(1000, 'Minimum value is 1.000'),
  category: z.string().min(1, 'Please select product category'),
  description: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export interface Product extends ProductFormValues {
  id: string
}
