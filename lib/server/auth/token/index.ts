import jwt from 'jsonwebtoken'

import type { JwtPayload, SignOptions } from 'jsonwebtoken'

const secret: string = process.env.JWT_SECRET!

export function generateToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secret, options)
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret)
}
