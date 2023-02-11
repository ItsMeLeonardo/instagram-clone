import { User } from 'types/user'
import { api } from '../api'
import { AxiosError, isAxiosError } from 'axios'

export class InvalidUsernameError extends Error {
  constructor() {
    super('Username already taken')
  }
}

export class InvalidEmailError extends Error {
  constructor() {
    super('Email already taken')
  }
}

export async function updateUser(data: FormData) {
  try {
    const { data: user } = await api.post<User>('/user', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return user
  } catch (error) {
    const err = error as AxiosError<{ message: string }>

    const errorMessage = isAxiosError(err) && err.response?.data.message

    console.log({ errorMessage })
    if (!errorMessage) throw new Error('Error Updating data')
    if (errorMessage.toLowerCase().includes('username')) throw new InvalidUsernameError()
    if (errorMessage.toLowerCase().includes('email')) throw new InvalidEmailError()

    throw new Error('Error Updating data')
  }
}
