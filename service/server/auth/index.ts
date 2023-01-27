import { db } from 'lib/server/persistence'
import { UserNotFoundError, InvalidPasswordError } from './erros'

export type AuthRequestUser = {
  id: number
  email: string
}

class Auth {
  async login({ email, password }: { email: string; password: string }) {
    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.password !== password) {
      throw new InvalidPasswordError()
    }

    return {
      id: user.user_id,
      email: user.email,
    }
  }
  // async logout() {}
  async register() {}
}

export default new Auth()
