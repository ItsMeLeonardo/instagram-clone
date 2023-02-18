import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import trendingService from 'service/server/trending'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    try {
      const posts = await trendingService.getTrending()
      res.json(posts)
    } catch (error) {
      logger.error(error)
      res.status(500).end()
    }
  })
