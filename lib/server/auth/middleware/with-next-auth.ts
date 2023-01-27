import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export type NextAuthRequest = {
  userId: number
} & NextApiRequest

export const withNextAuth = nc<NextAuthRequest, NextApiResponse>().use(async (req, res, next) => {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })

  try {
    if (!session) {
      throw new Error('Invalid credentials')
    }

    const id = Number(session.sub)

    if (Number.isNaN(id)) {
      throw new Error('Invalid credentials')
    }

    req.userId = id

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
})
