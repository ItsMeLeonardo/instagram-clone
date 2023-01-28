import base from 'lib/server/middleware/common'
import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import feedService from 'service/server/feed'

import type { FeedFilter } from 'types/feed'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const filter = req.query.filter as FeedFilter
    const id = Number(req.userId)

    const posts = await feedService.getFeed(id, filter)
    res.status(200).json(posts)
  })
