import base from 'lib/server/middleware/common'

import { authMiddleware } from 'lib/server/auth/middleware'
import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import savedService from 'service/server/saved'

export default base()
  .use(authMiddleware)
  .get<NextAuthRequest>(async (req, res) => {
    const id = req.userId

    const savedPosts = await savedService.getSavedPostsByUserId(Number(id))

    res.json(savedPosts)
  })
  .post<NextAuthRequest>(async (req, res) => {
    const id = req.userId
    const { title } = req.body

    try {
      const savedPost = await savedService.createSavedList(Number(id), title)
      res.json(savedPost)
    } catch (error) {
      res.status(400).json({ message: "Couldn't create the list" })
    }
  })
  .delete<NextAuthRequest>(async (req, res) => {
    const id = req.userId
    const { postId } = req.body

    try {
      await savedService.removePostFromAllSavedList(Number(id), Number(postId))
      res.status(200).json({ message: 'Posts removed' })
    } catch (error) {
      res.status(400).json({ message: "Couldn't remove the post" })
    }
  })
