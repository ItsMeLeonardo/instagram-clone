import { api } from 'service/client/api'

export async function likePost(postId: number) {
  const { data } = await api.post('/post/like', { postId })
  return data
}
