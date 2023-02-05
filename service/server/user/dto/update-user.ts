import z from 'zod'

export const updateUserDtoSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  avatarFile: z.any().optional(),
  location: z.string().optional(),
})

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>

export const updateUserSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  location: z.string().optional(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
