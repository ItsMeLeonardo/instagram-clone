import z from 'zod'

export const postSchema = z.object({
  description: z.string(),
  userId: z.number(),
  photos: z.array(z.string()),
  tags: z.array(z.string()),
})

export type PostDto = z.infer<typeof postSchema>
