import { setCookie } from 'cookies-next'
import nextConnect from 'next-connect'

import auth from 'lib/server/auth/middleware'
import authProvider, { generateToken } from 'lib/server/auth'

import type { NextApiResponse } from 'next'
import type { AuthRequest } from 'lib/server/auth'
import { logger } from 'utils/shared/logs'

const handler = nextConnect<AuthRequest, NextApiResponse>()

handler.use(auth).post(authProvider.authenticate('local', { session: false }), (req, res) => {
  const { user } = req

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }
  try {
    const { username } = user
    const token = generateToken({ sub: username })

    setCookie('auth_token', token, { req, res })

    res.json({ user, token })
  } catch (error) {
    logger.error(error)
  }
})

export default handler