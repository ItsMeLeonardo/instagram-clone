import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import imageService from 'service/server/images'
import { UploadImageError } from 'service/server/images/errors'
// import { NextApiRequest } from 'next'
import storyService from 'service/server/story'
import { uploadStrategy } from 'utils/shared/file-request'
import { logger } from 'utils/shared/logs'

type CreateStoryRequest = {
  file: Express.Multer.File
} & NextAuthRequest

export const config = {
  api: {
    bodyParser: false,
  },
}

export default base()
  .use(authMiddleware)
  .get(async (req, res) => {
    const story = await storyService.getStories()

    res.status(200).json(story)
  })
  .use(uploadStrategy.single('photo'))
  .post<CreateStoryRequest>(async (req, res) => {
    const userId = req.userId
    const file = req.file

    try {
      const result = await imageService.uploadImage(file)

      const photo = result.url
      const story = await storyService.createStory(userId, photo)
      res.status(200).json(story)
    } catch (error) {
      if (error instanceof UploadImageError) {
        return res.status(400).json({ error: 'Error uploading image' })
      }

      logger.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })
