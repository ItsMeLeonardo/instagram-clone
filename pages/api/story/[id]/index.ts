import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import { UnauthorizedError } from 'service/server/auth/errors'
import storyService from 'service/server/story'
import { StoryNotFoundError } from 'service/server/story/Errors'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .delete<NextAuthRequest>(async (req, res) => {
    const storyId = req.query.id as string
    const userId = req.userId

    try {
      await storyService.deleteStory(userId, Number(storyId))

      return res.status(200).json({ status: 'ok' })
    } catch (error) {
      if (error instanceof StoryNotFoundError) {
        return res.status(400).json({ error: error.message })
      }

      if (error instanceof UnauthorizedError) {
        return res.status(401).json({ error: error.message })
      }

      logger.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })
