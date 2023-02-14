export interface User {
  id: number
  username: string
  email: string
  location: string
  avatar: string
  createdAt: string | Date
  name?: string
  lastName?: string
  following?: boolean
}

export type UserDetail = User & {
  posts: number
  followers: number
  followings: number
}

export type UserFindResult = {
  id: number
  username: string
  avatar: string
  email: string
}
