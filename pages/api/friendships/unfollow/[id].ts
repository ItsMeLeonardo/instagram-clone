import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import friendshipService from 'service/server/friendships'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .post<NextAuthRequest>(async (req, res) => {
    const followId = req.query.id

    try {
      await friendshipService.unFollow(Number(followId))

      res.json({ status: 'ok' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'error' })
      logger.error(error)
    }
  })
