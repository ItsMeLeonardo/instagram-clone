import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'
import postService from 'service/server/post'

export default base()
  .get(async (req, res) => {
    const posts = await postService.getPosts()

    res.status(200).json(posts)
  })
  .use(authMiddleware)
  .post(async (req, res) => {
    const post = req.body

    const body = await postService.createPost(post)

    res.json(body)
  })
