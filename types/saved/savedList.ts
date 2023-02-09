export type SavedList = {
  id: number
  title: string
  createdAt: string | Date
  postNumber: number
  savedPosts: SavedPost[]
}

export type SimpleSavedList = {
  id: number
  title: string
}

interface SavedPost {
  savedId: number
  post: Post
}

interface Post {
  id: number
  photos: string[]
}
