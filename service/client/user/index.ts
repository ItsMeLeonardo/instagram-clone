import { api } from '../api'

import type { UserFindResult } from 'types/user'

export * from './update-user'

type Params = {
  keyword: string
}

export async function findUser({ keyword }: Params) {
  if (!keyword) return
  try {
    const { data } = await api.get<UserFindResult[]>(`/user?keyword=${keyword}`)

    return data
  } catch (error) {
    return []
  }
}
