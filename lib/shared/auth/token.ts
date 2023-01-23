import jwt from 'jsonwebtoken'

export function decodeToken(token: string) {
  return jwt.decode(token)
}
