import { db } from 'lib/server/persistence'
import {
  UserNotFoundError,
  InvalidPasswordError,
  UserAlreadyExistsError,
  EmailAlreadyExistsError,
  UsernameAlreadyExistsError,
} from './errors'

import { hashPassword, comparePassword } from 'utils/server/security'
import { userDtoSchema } from './dto'

import type { UserDto } from './dto'
import type { User } from 'types/user'

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

    const passwordMatch = await comparePassword(password, user.password)
    if (!passwordMatch) {
      throw new InvalidPasswordError()
    }

    return {
      id: user.user_id,
      email: user.email,
    }
  }

  async register(user: UserDto): Promise<User> {
    const { success } = userDtoSchema.safeParse(user)

    if (!success) {
      throw new Error('Invalid user data')
    }
    const { email, password, username } = user

    const userExists = await db.user.findUnique({ where: { email } })

    if (userExists) {
      throw new EmailAlreadyExistsError()
    }

    const usernameExists = await db.user.findUnique({ where: { username } })

    if (usernameExists) {
      throw new UsernameAlreadyExistsError()
    }

    const defaultAvatar = 'https://i.postimg.cc/hjv490kJ/smiling-face-with-smiling-eyes.webp'

    const passwordHash = await hashPassword(password)

    const newUser = await db.user.create({
      data: {
        email,
        password: passwordHash,
        username,
        avatar: defaultAvatar,
        location: 'All over the world',
      },
    })

    return {
      id: newUser.user_id,
      username: newUser.username,
      avatar: newUser.avatar,
      email: newUser.email,
      location: newUser.location,
      createdAt: newUser.created_at,
    }
  }
}

export default new Auth()
