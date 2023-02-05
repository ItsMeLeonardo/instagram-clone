import { User } from 'types/user'
import { api } from '../api'

export async function updateUser(data: FormData) {
  try {
    const { data: user } = await api.post<User>('/user', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return user
  } catch (error) {
    return false
  }
}
