import { db } from 'lib/server/persistence'
import { UserNotFoundError, InvalidPasswordError } from './erros'

export type AuthRequestUser = {
  id: number
  email: string
  password: string
}

class Auth {
  private async getUserByEmail(email: string): Promise<AuthRequestUser | null> {
    const user = await db.user.findUnique({ where: { email } })

    if (!user) return null

    return {
      id: user.user_id,
      email: user.email,
      password: user.password,
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.password !== password) {
      throw new InvalidPasswordError()
    }

    return user
  }
  // async logout() {}
  async register() {}
}

export default new Auth()
