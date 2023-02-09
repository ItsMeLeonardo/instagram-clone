import base from 'lib/server/middleware/common'

import { authMiddleware } from 'lib/server/auth/middleware'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import savedService from 'service/server/saved'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const id = req.userId

    const savedPosts = await savedService.getSavedListByUserId(Number(id))

    res.json(savedPosts)
  })
