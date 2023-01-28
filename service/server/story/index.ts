import { db } from 'lib/server/persistence'
import type { Story } from 'types/story'

class StoryService {
  private async getStoriesByUserIdDB(id: number) {
    const storyList = await db.story.findMany({
      where: { user_id: id },
      select: {
        created_at: true,
        photo: true,
        user: {
          select: {
            avatar: true,
            user_id: true,
            username: true,
          },
        },
      },
    })
    return storyList
  }

  async getStories(): Promise<Story[]> {
    const storyList = await db.story.findMany({
      select: {
        created_at: true,
        photo: true,
        story_id: true,
        user: {
          select: {
            avatar: true,
            user_id: true,
            username: true,
          },
        },
      },
    })
    return storyList.map((story) => ({
      id: story.story_id,
      photo: story.photo,
      createdAt: story.created_at,
      user: {
        id: story.user.user_id,
        avatar: story.user.avatar,
        username: story.user.username,
      },
    }))
  }
}

const storyService = new StoryService()

export default storyService
