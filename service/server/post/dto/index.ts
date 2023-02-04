import z from 'zod'

export const postSchema = z.object({
  userId: z.number(),
  photos: z.array(z.string()),
  description: z.string(),
  tags: z.array(z.string()).optional(),
})

export type PostSchema = z.infer<typeof postSchema>

export const postDtoSchema = z.object({
  userId: z.number(),
  description: z.string(),
  photos: z.any().array().nonempty(),
  tags: z.array(z.string()).optional(),
})

export type PostDto = z.infer<typeof postDtoSchema>
