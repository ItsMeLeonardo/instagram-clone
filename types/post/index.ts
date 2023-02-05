import type { Tag } from 'types/tags'
import type { User } from 'types/user'

export type Post = {
  id: number
  description: string
  createdAt: Date | string
  photos: string[]
  user: UserPost
  stats: PostStats
  tags: Tag[]
}

type PostStats = {
  comment: number
  like: number
  saved_post: number
}

type UserPost = Pick<User, 'avatar' | 'username' | 'location' | 'id'>

export type PostCreated = {
  id: number
  description: string
  createdAt: Date | string
  userId: number
  photos: string[]
}

export type ExplorePost = {
  id: number
  photos: string[]
  comments: number
  likes: number
  description: string
}

export type PhotoPost = {
  id: number
  photos: string[]
}
