import { db } from 'lib/server/persistence'
import type { UserDto } from '../dto'
import type { User } from 'types/user'
class UserService {
  private async getUserByIdDb(id: number) {
    const user = await db.user.findUnique({
      where: {
        user_id: id,
      },
    })

    return user
  }

  async getUserById(id: number) {
    const user = await this.getUserByIdDb(id)
    return this.userByIdAdapter(user)
  }

  async getUsers() {
    const users = await db.user.findMany({
      select: {
        avatar: true,
        username: true,
        user_id: true,
        email: true,
      },
    })
    return users
  }

  async createUser(user: UserDto) {
    const newUser = await db.user.create({
      data: user,
    })

    return newUser
  }

  private userByIdAdapter(user: Awaited<ReturnType<typeof this.getUserByIdDb>>): User | null {
    if (!user) return null

    return {
      id: user.user_id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      location: user.location,
      createdAt: user.created_at,
      lastName: user.lastname,
      name: user.name,
      password: user.password,
    }
  }
}

const userService = new UserService()
export default userService
