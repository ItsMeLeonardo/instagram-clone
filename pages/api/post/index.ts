import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'
import postService from 'service/server/post'
import { uploadStrategy } from 'utils/shared/file-request'

import type { NextApiRequest } from 'next'
import imageService from 'service/server/images'
import { UploadImageError } from 'service/server/images/errors'
import { InvalidPostError } from 'service/server/post/errors'
import { postDtoSchema } from 'service/server/post/dto'

export const config = {
  api: {
    bodyParser: false,
  },
}

type PostRequest = {
  files: Express.Multer.File[]
} & NextApiRequest

export default base()
  .get(async (req, res) => {
    const posts = await postService.getPosts()

    res.status(200).json(posts)
  })
  .use(authMiddleware)
  .use(uploadStrategy.array('photos', 10))
  .post<PostRequest>(async (req, res) => {
    const post = {
      description: req.body.description,
      userId: Number(req.body.userId),
      tags: req.body.tags,
    }

    const files = req.files

    try {
      postDtoSchema.parse({ ...post, photos: files })
    } catch (error) {
      return res.status(400).json({ error: 'Invalid post body' })
    }

    try {
      const images = await imageService.uploadImages(files)

      const photos = images.map((image) => image.url)

      const postWithPhotos = { ...post, photos }
      const posts = await postService.createPost(postWithPhotos)

      res.status(200).json(posts)
    } catch (error) {
      if (error instanceof UploadImageError) {
        return res.status(400).json({ error: error.message })
      }

      if (error instanceof InvalidPostError) {
        return res.status(400).json({ error: error.message })
      }
    }
  })
