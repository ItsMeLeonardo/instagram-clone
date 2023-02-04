import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'
import postService from 'service/server/post'
import { uploadStrategy } from 'utils/shared/file-request'

import imageService from 'service/server/images'
import { UploadImageError } from 'service/server/images/errors'
import { InvalidPostError } from 'service/server/post/errors'
import { postDtoSchema } from 'service/server/post/dto'

import type { NextApiRequest } from 'next'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

type PostRequest = {
  files: Express.Multer.File[]
} & NextApiRequest &
  NextAuthRequest

export default base()
  .get(async (req, res) => {
    const posts = await postService.getPosts()

    res.status(200).json(posts)
  })
  .use(authMiddleware)
  .use(uploadStrategy.array('photos', 10))
  .post<PostRequest>(async (req, res) => {
    const id = Number(req.userId)
    const files = req.files
    const tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags && [req.body.tags]
    const post = {
      description: req.body.description,
      tags,
      userId: id,
      photos: files,
    }

    try {
      postDtoSchema.parse({ ...post })
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
