import * as z from 'zod'

export const productSchema = z.object({
  name: z.string()
    .min(3)
    .max(50),

  price: z.number().min(1000),

  category: z.string().min(1),

  description: z.string()
    .min(10)
    .optional()
    .or(z.literal('')),

  releaseDate: z.string(),

  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),

  image: z.any()
    .refine(file => file?.length !== 0, 'File should be uploaded')
    .optional(),
})
export type ProductFormValues = z.infer<typeof productSchema>

export interface Product extends ProductFormValues {
  id: string
}
