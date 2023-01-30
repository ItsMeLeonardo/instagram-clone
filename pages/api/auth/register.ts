import base from 'lib/server/middleware/common'

import authService from 'service/server/auth'
import { UserAlreadyExistsError } from 'service/server/auth/errors'
import { logger } from 'utils/shared/logs'

export default base().post(async (req, res) => {
  const { password, email, username } = req.body

  try {
    const user = await authService.register({ password, email, username })
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(400).json({ message: 'User already exists' })
    }
    logger.error(error)
    res.status(400).json({ message: 'Error registering user' })
  }
})
