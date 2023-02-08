import nc, { Options } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { logger } from 'utils/shared/logs'

export default function base<Request extends NextApiRequest, Response extends NextApiResponse>(
  options?: Options<Request, Response>
) {
  const handler = nc<Request, Response>({
    onError: (err, req, res) => {
      logger.error(err.stack)
      res.status(500).end('Something broke!')
    },
    onNoMatch: (req, res) => {
      res.status(404).end('Page is not found')
    },
    ...options,
  })

  return handler
}
