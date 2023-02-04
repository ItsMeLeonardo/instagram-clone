import z from 'zod'

export const postSchema = z.object({
  description: z.string(),
  userId: z.number(),
  photos: z.array(z.string()),
  tags: z.array(z.string()),
})

export type PostSchema = z.infer<typeof postSchema>

export const postDtoSchema = z.object({
  description: z.string(),
  userId: z.number(),
  photos: z.any().array().nonempty(),
  tags: z.array(z.string()),
})

export type PostDto = z.infer<typeof postDtoSchema>
