import { db } from 'lib/server/persistence'
import type { UserFindResult, UserDetail, User } from 'types/user'
import { UpdateUser } from '../dto'
class UserService {
  private async getUserByIdDb(id: number) {
    const user = await db.user.findUnique({
      where: {
        user_id: id,
      },
      select: {
        avatar: true,
        username: true,
        user_id: true,
        email: true,
        location: true,
        created_at: true,
        lastname: true,
        name: true,
        _count: {
          select: {
            post: true,
            follow_follow_follower_idTouser: true,
            follow_follow_user_idTouser: true,
          },
        },
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

  async findUser(keyword: string): Promise<UserFindResult[]> {
    const users = await db.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            lastname: {
              mode: 'insensitive',
              contains: keyword,
            },
          },
        ],
      },
      select: {
        avatar: true,
        username: true,
        user_id: true,
        email: true,
      },
      take: 10,
    })
    return users.map((user) => ({
      id: user.user_id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    }))
  }

  private userByIdAdapter(user: Awaited<ReturnType<typeof this.getUserByIdDb>>): UserDetail | null {
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
      followers: user._count.follow_follow_follower_idTouser,
      following: user._count.follow_follow_user_idTouser,
      posts: user._count.post,
    }
  }

  async updateUser(id: number, data: UpdateUser): Promise<User> {
    const user = await db.user.update({
      where: {
        user_id: id,
      },
      data: {
        ...data,
      },
    })

    return {
      id: user.user_id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      location: user.location,
      createdAt: user.created_at,
      lastName: user.lastname,
      name: user.name,
    }
  }
}

const userService = new UserService()
export default userService
