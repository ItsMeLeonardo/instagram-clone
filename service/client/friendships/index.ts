import { api } from '../api'

export const getFollowers = async (userId: number) => {
  const { data } = await api.get(`/friendships/followers/${userId}`)

  return data
}

export const getFollowing = async (userId: number) => {
  const { data } = await api.get(`/friendships/following/${userId}`)

  return data
}

export const followUser = async (userId: number) => {
  const { data } = await api.post(`/friendships/follow/${userId}`)

  return data
}

export const unFollowUser = async (userId: number) => {
  const { data } = await api.delete(`/friendships/unfollow/${userId}`)

  return data
}

export const isFollowing = async (userId: number) => {
  const { data } = await api.get(`/friendships/is-following/${userId}`)

  return data
}
