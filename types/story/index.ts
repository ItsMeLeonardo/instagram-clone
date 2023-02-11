export type Story = {
  id: number
  photo: string
  createdAt: string | Date
}

export interface StoryUser {
  id: number
  avatar: string
  username: string
  story: Story[]
}
