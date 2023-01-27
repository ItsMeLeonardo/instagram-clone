import { api } from 'service/client/api'

import type { UserDetail } from 'types/user'

export async function whoAmI() {
  try {
    const { data } = await api.get<UserDetail>('/auth/who-am-i')
    return data
  } catch (error) {
    return null
  }
}
