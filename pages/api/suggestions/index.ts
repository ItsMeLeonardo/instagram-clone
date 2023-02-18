import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import suggestionsService from 'service/server/suggestions'
import { logger } from 'utils/shared/logs'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const userId = req.userId

    try {
      const users = await suggestionsService.getSuggestions(userId)
      res.json(users)
    } catch (error) {
      logger.error(error)
      res.status(500).end()
    }
  })
