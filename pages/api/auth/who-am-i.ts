import base from 'lib/server/middleware/common'
import { authMiddleware } from 'lib/server/auth/middleware'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'

import userService from 'service/server/user/service'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const id = req.userId

    const user = await userService.getUserById(id)
    res.json(user)
  })
