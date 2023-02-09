import { db } from 'lib/server/persistence'
import type { Story } from 'types/story'
import { StoryNotFoundError } from './Errors'
import { UnauthorizedError } from '../auth/errors'

class StoryService {
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

  async createStory(userId: number, photo: string): Promise<Story> {
    const story = await db.story.create({
      data: {
        photo,
        user_id: userId,
      },
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
    return {
      id: story.story_id,
      photo: story.photo,
      createdAt: story.created_at,
      user: {
        id: story.user.user_id,
        avatar: story.user.avatar,
        username: story.user.username,
      },
    }
  }

  async deleteStory(userId: number, storyId: number): Promise<void> {
    const story = await db.story.findUnique({
      where: {
        story_id: storyId,
      },
      select: {
        user_id: true,
      },
    })

    if (!story) {
      throw new StoryNotFoundError()
    }

    if (story.user_id !== userId) {
      throw new UnauthorizedError()
    }

    await db.story.delete({
      where: {
        story_id: storyId,
      },
    })
  }
}

const storyService = new StoryService()

export default storyService
