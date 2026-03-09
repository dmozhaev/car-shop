import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_repeat: z.string(),
  })
  .refine((data) => data.password === data.password_repeat, {
    message: 'Passwords do not match',
    path: ['password_repeat'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginFormData = z.infer<typeof loginSchema>
