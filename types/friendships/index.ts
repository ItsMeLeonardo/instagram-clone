export type FriendshipUser = {
  avatar: string
  id: number
  username: string
}

export type Follower = {
  followId: number
  userId: number
  followerId: number
  createdAt: string | Date
  follower: FriendshipUser
}

export type Following = {
  followId: number
  userId: number
  followerId: number
  createdAt: string | Date
  following: FriendshipUser
}
