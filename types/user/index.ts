export interface User {
  id: number
  username: string
  password: string
  email: string
  location: string
  avatar: string
  createdAt: string | Date
  name: string
  lastName: string
}

export type ClientUser = Omit<User, 'password'>
