import passport from 'passport'

import { localStrategy } from './strategies/local.strategy'

import type { NextApiRequest } from 'next'

type User = {
  username: string
}

export type AuthRequest = {
  user?: User
} & NextApiRequest

export * from './token'

passport.use(localStrategy)

export default passport
