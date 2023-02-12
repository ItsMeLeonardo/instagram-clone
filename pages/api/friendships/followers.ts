import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import friendshipService from 'service/server/friendships'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const userId = req.userId

    const followers = await friendshipService.getFollowers(Number(userId))

    res.json(followers)
  })
