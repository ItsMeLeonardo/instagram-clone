import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'

import { SavedListNotFoundError } from 'service/server/saved/errors'
import { UnauthorizedError } from 'service/server/auth/errors'
import savedService from 'service/server/saved'

export default base()
  .use(authMiddleware)
  .put<NextAuthRequest>(async (req, res) => {
    const { title } = req.body
    const savedId = req.query.id as string
    const userId = req.userId

    try {
      await savedService.editSavedList(Number(userId), Number(savedId), title)
      res.json({ status: 'ok' })
    } catch (error) {
      if (error instanceof SavedListNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: error.message })
        return
      }

      res.status(500).json({ message: 'Internal server error' })
    }
  })
  .delete<NextAuthRequest>(async (req, res) => {
    const savedId = req.query.id as string
    const userId = req.userId

    try {
      await savedService.deleteSavedList(Number(userId), Number(savedId))

      res.status(200).json({ status: 'ok' })
    } catch (error) {
      if (error instanceof SavedListNotFoundError) {
        res.status(404).json({ message: error.message })
        return
      }

      if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: error.message })
        return
      }

      res.status(500).json({ message: 'Internal server error' })
    }
  })
