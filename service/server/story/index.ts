import { db } from 'lib/server/persistence'
import type { StoryUser } from 'types/story'
import { StoryNotFoundError } from './Errors'
import { UnauthorizedError } from '../auth/errors'

class StoryService {
  async getStories(): Promise<StoryUser[]> {
    const storyByUser = await db.user.findMany({
      select: {
        avatar: true,
        user_id: true,
        username: true,
        story: {
          select: {
            created_at: true,
            photo: true,
            story_id: true,
          },
          where: {
            created_at: {
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },
        },
      },
      take: 10,
    })
    return storyByUser
      .filter(({ story }) => story.length)
      .map((story) => ({
        id: story.user_id,
        avatar: story.avatar,
        username: story.username,
        story: story.story.map((story) => ({
          id: story.story_id,
          photo: story.photo,
          createdAt: story.created_at,
        })),
      }))
  }

  async createStory(userId: number, photo: string): Promise<void> {
    await db.story.create({
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
