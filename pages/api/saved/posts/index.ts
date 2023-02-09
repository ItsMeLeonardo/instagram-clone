import base from 'lib/server/middleware/common'

import { authMiddleware } from 'lib/server/auth/middleware'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    res.json({ message: 'Coming soon' })
  })
