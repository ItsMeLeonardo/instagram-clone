export type Comment = {
  user: User
  commentId: number
  comment: RawComment
}

export type RawComment = {
  text: string
}

type User = {
  username: string
  avatar: string
  id: number
}
