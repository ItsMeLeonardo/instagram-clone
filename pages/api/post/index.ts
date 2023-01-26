import base from 'lib/server/middleware/common'
import postService from 'service/server/post'

export default base().get(async (req, res) => {
  const posts = await postService.getPosts()

  res.status(200).json(posts)
})
