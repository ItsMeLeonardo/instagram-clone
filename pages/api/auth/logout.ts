import { deleteCookie } from 'cookies-next'
import nextConnect from 'next-connect'

import authMiddleware from 'lib/server/auth/middleware'

import type { NextApiResponse, NextApiRequest } from 'next'
import { logger } from 'utils/shared/logs'
import { COOKIE_TOKEN_KEY } from 'config'

type AuthRequest = Express.Request & NextApiRequest

const handler = nextConnect<AuthRequest, NextApiResponse>()

handler.use(authMiddleware).get((req, res) => {
  req.logOut(() => logger.info('User logged out'))
  deleteCookie(COOKIE_TOKEN_KEY, { req, res })
  res.status(204).end()
})

export default handler
