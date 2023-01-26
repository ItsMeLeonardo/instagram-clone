import passport from 'passport'

import { localStrategy } from './strategies/local.strategy'

import type { NextApiRequest } from 'next'
import type { AuthRequestUser } from 'service/server/auth'

export type AuthRequest = {
  user?: AuthRequestUser
} & NextApiRequest

export * from './token'

passport.use(localStrategy)

export default passport
