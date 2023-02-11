import base from 'lib/server/middleware/common'

import authService from 'service/server/auth'
import { EmailAlreadyExistsError, UsernameAlreadyExistsError } from 'service/server/auth/errors'
import { logger } from 'utils/shared/logs'

export default base().post(async (req, res) => {
  const { password, email, username } = req.body

  try {
    const user = await authService.register({ password, email, username })
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof UsernameAlreadyExistsError) {
      res.status(400).json({ message: 'Username already taken' })
    }

    if (error instanceof EmailAlreadyExistsError) {
      res.status(400).json({ message: 'Email already taken' })
    }

    logger.error(error)
    res.status(400).json({ message: 'Error registering user' })
  }
})
