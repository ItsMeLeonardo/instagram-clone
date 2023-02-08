import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import { UnauthorizedError } from 'service/server/auth/errors'
import savedService from 'service/server/saved'
import { SavedListNotFoundError } from 'service/server/saved/errors'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .post<NextAuthRequest>(async (req, res) => {
    const postId = req.query.postId as string
    const savedId = req.query.id as string
    const userId = req.userId

    try {
      await savedService.addPostToSavedList(Number(userId), Number(savedId), Number(postId))
      res.json({ status: 'ok' })
    } catch (error) {
      if (error instanceof SavedListNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: error.message })
        return
      }

      logger.error(error)

      res.status(500).json({ message: 'Internal server error' })
    }
  })
  .delete<NextAuthRequest>(async (req, res) => {
    const savedId = req.query.id as string
    const postId = req.query.postId as string
    const userId = req.userId

    try {
      await savedService.removePostFromSavedList(Number(userId), Number(savedId), Number(postId))
      res.json({ status: 'ok' })
    } catch (error) {
      if (error instanceof SavedListNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: error.message })
        return
      }

      logger.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })
