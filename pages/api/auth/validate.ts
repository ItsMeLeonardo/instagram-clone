import nc from 'next-connect'
import { getCookie } from 'cookies-next'
import { verifyToken } from 'lib/server/auth'

import { COOKIE_TOKEN_KEY } from 'config'
import { logger } from 'utils/shared/logs'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    logger.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
})

handler.post((req, res) => {
  const token = req.body.token || getCookie(COOKIE_TOKEN_KEY, { req, res })

  if (!token) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }

  try {
    verifyToken(token.toString())
    res.status(204).end()
  } catch (error) {
    logger.error(error)
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

export default handler
