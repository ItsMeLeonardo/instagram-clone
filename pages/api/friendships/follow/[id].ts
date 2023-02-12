import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import friendshipService from 'service/server/friendships'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .post<NextAuthRequest>(async (req, res) => {
    const followerId = req.userId
    const userId = req.query.id

    try {
      await friendshipService.follow(Number(userId), followerId)
      res.json({ status: 'ok' })
    } catch (error) {
      logger.error(error)
      res.status(500).json({ status: 'error', message: 'error' })
    }
  })
