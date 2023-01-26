const credentials = {
  username: 'admin',
  password: 'admin',
}

import { Strategy as LocalStrategy } from 'passport-local'

import authService from 'service/server/auth'

export const localStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, email, password, done) => {
    try {
      const user = await authService.login({ email, password })
      done(null, user)
    } catch (error) {
      done(error)
    }
  }
)
