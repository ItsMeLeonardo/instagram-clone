import { api } from 'service/client/api'

import type { PhotoPost, Post, PostDetail } from 'types/post'
import type { CancelToken } from 'axios'

export * from './create'
export * from './like'
export * from './unlike'

export async function getPosts() {
  // const { data } = await api.get<Post[]>('/posts', { cache: 'no-store' })

  const { data } = await api.get<Post[]>('/post')
  return data
}

export async function getPostDetail(id: number) {
  if (!id) return
  const { data } = await api.get<PostDetail>(`/post/${id}`)

  return data
}

export async function getPostByUserId(userId: number, cancelToken?: CancelToken) {
  const { data } = await api.get<PhotoPost[]>(`/post/user/${userId}`, {
    cancelToken,
  })
  return data
}
