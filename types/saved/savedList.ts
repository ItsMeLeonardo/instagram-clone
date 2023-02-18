export type SavedList = {
  id: number
  title: string
  createdAt: string | Date
  poster?: string
}

export type SimpleSavedList = {
  id: number
  title: string
}

export interface SavedPost {
  savedId: number
  post: Post
}

interface Post {
  id: number
  photos: string[]
}

export type SavedListDetail = {
  id: number
  title: string
  createdAt: string | Date
  posts: Post[]
}
