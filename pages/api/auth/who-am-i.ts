import base from 'lib/server/middleware/common'
import authMiddleware from 'lib/server/auth/middleware'
import { jwtAuthenticate } from 'lib/server/auth'
import type { AuthTokenRequest } from 'lib/server/auth'

import userService from 'service/server/user/service'

export default base()
  .use(authMiddleware)
  .use(jwtAuthenticate)
  .get<AuthTokenRequest>(async (req, res) => {
    const { sub } = req.user

    if (!sub) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const id = Number(sub)

    if (Number.isNaN(id)) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await userService.getUserById(id)
    res.json(user)
  })
