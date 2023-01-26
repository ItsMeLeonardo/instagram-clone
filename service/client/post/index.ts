import { api } from 'service/client/api'
import type { Post } from 'types/post'

export async function getPosts() {
  // const { data } = await api.get<Post[]>('/posts', { cache: 'no-store' })

  const { data } = await api.get<Post[]>('/post')
  return data
}
