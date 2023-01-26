import { db } from 'lib/server/persistence'
import type { UserDto } from '../dto'

class UserService {
  async getUserById(id: number) {
    const user = await db.user.findUnique({
      where: {
        user_id: id,
      },
    })

    return user
  }

  async getUsers() {
    const users = await db.user.findMany()
    return users
  }

  async createUser(user: UserDto) {
    const newUser = await db.user.create({
      data: user,
    })

    return newUser
  }
}

const userService = new UserService()
export default userService
