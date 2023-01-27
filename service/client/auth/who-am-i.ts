import { COOKIE_TOKEN_KEY } from 'config'
import { getCookie } from 'cookies-next'
import { api } from 'service/client/api'

import type { UserDetail } from 'types/user'

export async function whoAmI() {
  const token = getCookie(COOKIE_TOKEN_KEY)

  try {
    const { data } = await api.get<UserDetail>('/auth/who-am-i', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    return null
  }
}
