const credentials = {
  username: 'admin',
  password: 'admin',
}

import { Strategy as LocalStrategy } from 'passport-local'

function validate(username: string, password: string) {
  return username === credentials.username && password === credentials.password
}

export const localStrategy = new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  const isValid = validate(username, password)

  if (!isValid) {
    done(null, false)
  } else {
    done(null, { username })
  }
})
