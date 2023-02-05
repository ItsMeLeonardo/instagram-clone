import base from 'lib/server/middleware/common'
import postService from 'service/server/post'

export default base().get(async (req, res) => {
  const userId = Number(req.query.id)

  if (!userId) return res.status(400).json({ message: 'user id is required' })

  const posts = await postService.getPostsByUserId(userId, 3)

  res.status(200).json(posts)
})
