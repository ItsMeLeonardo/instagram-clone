import { setCookie } from 'cookies-next'
import nextConnect from 'next-connect'

import { COOKIE_TOKEN_KEY } from 'config'
import authMiddlewarePassport from 'lib/server/auth/middleware'
import authProvider, { generateToken } from 'lib/server/auth'
import { logger } from 'utils/shared/logs'

import type { NextApiResponse } from 'next'
import type { AuthRequest } from 'lib/server/auth'

const handler = nextConnect<AuthRequest, NextApiResponse>()

handler.use(authMiddlewarePassport).post(authProvider.authenticate('local', { session: false }), (req, res) => {
  const { user } = req

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }
  try {
    const { email, id } = user
    const token = generateToken({ sub: id.toString(), email })

    setCookie(COOKIE_TOKEN_KEY, token, { req, res })

    res.json({ userId: id, token })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default handler
