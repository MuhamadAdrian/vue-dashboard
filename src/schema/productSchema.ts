import * as z from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter'),
  price: z.number().min(1000, 'Harga minimal 1.000'),
  category: z.string().min(1, 'Pilih kategori produk'),
  description: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export interface Product extends ProductFormValues {
  id: string
}
