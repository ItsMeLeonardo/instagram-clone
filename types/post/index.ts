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

/* {
  username: string
  avatar: string
  location: string
}
 */
