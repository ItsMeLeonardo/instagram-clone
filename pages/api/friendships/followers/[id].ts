import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import friendshipService from 'service/server/friendships'

export default base().get<NextAuthRequest>(async (req, res) => {
  const userId = req.query.id
  const followers = await friendshipService.getFollowers(Number(userId))

  res.json(followers)
})
