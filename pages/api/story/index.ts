import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'
import storyService from 'service/server/story'

export default base()
  .use(authMiddleware)
  .get(async (req, res) => {
    const story = await storyService.getStories()

    res.status(200).json(story)
  })
