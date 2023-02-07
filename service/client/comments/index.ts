import { api } from '../api'

export async function getComments(postId: number) {
  const { data } = await api.get(`/comments/${postId}`)
  return data
}

export async function commentPost(postId: number, comment: string) {
  const { data } = await api.post(`/comments/${postId}`, { comment })
  return data
}

export async function deleteComment(postId: number) {
  const { data } = await api.delete(`/comments/${postId}`)
  return data
}
