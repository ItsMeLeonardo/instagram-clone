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

export type UserDto = {
  name: string
  email: string
  avatar: string
  username: string
  lastName: string
  location: string
}
