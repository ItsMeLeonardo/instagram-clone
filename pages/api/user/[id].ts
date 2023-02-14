import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import userService from 'service/server/user/service'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const loggedUserId = req.userId
    const id = Number(req.query.id)

    if (!id) return res.status(400).json({ message: 'id is required' })

    const user = await userService.getUserById(id, loggedUserId)

    if (!user) return res.status(400).json({ message: 'user not found' })

    res.status(200).json(user)
  })
