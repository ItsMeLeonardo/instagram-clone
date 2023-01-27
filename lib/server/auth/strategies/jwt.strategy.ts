import { Strategy, ExtractJwt } from 'passport-jwt'
import type { StrategyOptions } from 'passport-jwt'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

export const jwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload)
})
