import * as z from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long.')
    .trim(),
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters long.')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.')
    .trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .trim(),
})

export type ActionResponse = {
  message?: string
} | undefined
 
export type SignUpActionResponse = {
  errors?: {
    name?: string[]
    username?: string[]
    password?: string[]
  }
  message?: string
} | undefined