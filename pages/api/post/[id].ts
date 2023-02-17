import base from 'lib/server/middleware/common'
import postService from 'service/server/post'
import { logger } from 'utils/shared/logs'

export default base().get(async (req, res) => {
  const postId = Number(req.query.id)

  try {
    const post = await postService.getPostById(postId)

    res.json(post)
  } catch (error) {
    logger.error(error)
  }
})
