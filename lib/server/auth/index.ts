import passport from 'passport'

import { localStrategy } from './strategies/local.strategy'
import { jwtStrategy } from './strategies/jwt.strategy'

import type { NextApiRequest } from 'next'
import type { AuthRequestUser } from 'service/server/auth'
import type { JwtPayload } from 'jsonwebtoken'

passport.use(localStrategy)
passport.use(jwtStrategy)

export type AuthRequest = {
  user?: AuthRequestUser
} & NextApiRequest

export type AuthTokenRequest = {
  user: JwtPayload
} & NextApiRequest

export * from './token'

export default passport

export const jwtAuthenticate = passport.authenticate('jwt', { session: false })
