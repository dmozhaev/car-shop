import { z } from 'zod'

export const carSchema = z.object({
  year: z.number().min(1900),
  mileage: z.number().optional(),
  price: z.number(),
  make: z.number(),
  fuel_type: z.string().optional(),
  transmission: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
})

export type CarFormData = z.infer<typeof carSchema>
