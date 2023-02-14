import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import friendshipService from 'service/server/friendships'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const loggedUserId = req.userId
    const userId = req.query.id

    try {
      const isFollowing = await friendshipService.isFollowing(loggedUserId, Number(userId))

      res.json(isFollowing)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'error' })
      logger.error(error)
    }
  })
