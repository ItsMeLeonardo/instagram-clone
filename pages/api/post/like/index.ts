import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import postService from 'service/server/post'

export default base()
  .use(authMiddleware)
  .post<NextAuthRequest>(async (req, res) => {
    const userId = Number(req.userId)
    const { postId } = req.body

    try {
      await postService.likePost(postId, userId)

      res.status(200).json({ status: 'ok' })
    } catch (error) {
      res.status(400).json({ error: "Couldn't like post" })
    }
  })
