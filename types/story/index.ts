export type Story = {
  id: number
  user: User
  photo: string
  createdAt: string | Date
}

interface User {
  id: number
  avatar: string
  username: string
}
