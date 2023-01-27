export interface User {
  id: number
  username: string
  email: string
  location: string
  avatar: string
  createdAt: string | Date
  name: string
  lastName: string
}

export type UserDetail = User & {
  posts: number
  followers: number
  following: number
}

export type ClientUser = Omit<User, 'password'>
