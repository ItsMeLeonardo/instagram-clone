import { CancelToken } from 'axios'
import { api } from '../api'

import { UserDetail, UserFindResult } from 'types/user'

export * from './update-user'

type FindUserParams = {
  keyword: string
}

export async function findUser({ keyword }: FindUserParams) {
  if (!keyword) return
  try {
    const { data } = await api.get<UserFindResult[]>(`/user?keyword=${keyword}`)

    return data
  } catch (error) {
    return []
  }
}

export async function getUserById(id: number, cancelToken?: CancelToken) {
  try {
    const { data } = await api.get<UserDetail>(`/user/${id}`, {
      cancelToken,
    })

    return data
  } catch (error) {
    return null
  }
}
