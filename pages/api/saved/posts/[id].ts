import base from 'lib/server/middleware/common'

import { authMiddleware } from 'lib/server/auth/middleware'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import savedService from 'service/server/saved'

export default base()
  .use(authMiddleware)
  .delete<NextAuthRequest>(async (req, res) => {
    const id = req.userId
    const postId = req.query.id as string

    try {
      await savedService.removePostFromAllSavedList(Number(id), Number(postId))
      res.status(200).json({ message: 'Posts removed' })
    } catch (error) {
      res.status(400).json({ message: "Couldn't remove the post" })
    }
  })
