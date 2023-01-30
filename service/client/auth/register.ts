import { api } from '../api'
import { isAxiosError, AxiosError } from 'axios'
import type { User } from 'types/user'

export type UserToRegister = {
  username: string
  password: string
  email: string
}

export async function registerUser(payload: UserToRegister) {
  try {
    const { data } = await api.post<User>('/auth/register', payload)

    return data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>

    const errorMessage = isAxiosError(err) && err.response?.data.message

    return errorMessage ? errorMessage : 'Error registering user'
  }
}
