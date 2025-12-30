import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters'),

  email: z.email('Please enter a valid email address'),

  number: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{7,15}$/.test(val),
      'Phone number must contain only digits (7–15 numbers)',
    ),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message must be less than 1000 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>
