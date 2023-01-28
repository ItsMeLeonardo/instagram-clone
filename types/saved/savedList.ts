export type SavedList = {
  id: number
  userId: number
  createdAt: string | Date
  postNumber: number
  savedPosts: SavedPost[]
}

interface SavedPost {
  savedId: number
  post: Post
}

interface Post {
  id: number
  photos: string[]
}