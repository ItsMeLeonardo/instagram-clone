import { api } from 'service/client/api'

export async function unlikePost(postId: number) {
  const { data } = await api.post('/post/unlike', { postId })
  return data
}
