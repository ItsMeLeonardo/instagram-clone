import { deleteCookie } from 'cookies-next'
import nextConnect from 'next-connect'

import auth from 'lib/server/auth/middleware'

import type { NextApiResponse, NextApiRequest } from 'next'
import { logger } from 'utils/shared/logs'

type AuthRequest = Express.Request & NextApiRequest

const handler = nextConnect<AuthRequest, NextApiResponse>()

handler.use(auth).get((req, res) => {
  req.logOut(() => logger.info('User logged out'))
  deleteCookie('auth_token', { req, res })
  res.status(204).end()
})

export default handler
