import base from 'lib/server/middleware/common'
import postService from 'service/server/post'

export default base().get(async (req, res) => {
  const { id } = req.query

  try {
    const postStats = await postService.getPostStats(Number(id))

    return res.status(200).json(postStats)
  } catch (error) {
    return res.status(400).json({ error: "Couldn't get post stats" })
  }
})
