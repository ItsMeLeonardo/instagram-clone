import { db } from 'lib/server/persistence'
import type { SavedList } from 'types/saved'
import { UnauthorizedError } from '../auth/errors'
import { SavedListNotFoundError } from './errors'

class SavedService {
  async getSavedPostsByUserId(userId: number): Promise<SavedList[]> {
    const savedPosts = await db.saved.findMany({
      where: {
        user_id: userId,
      },
      include: {
        _count: {
          select: {
            saved_post: true,
          },
        },
        saved_post: {
          include: {
            post: {
              select: {
                post_id: true,
                photos: true,
              },
            },
          },
        },
      },
    })
    return savedPosts.map((savedPost) => {
      return {
        id: savedPost.saved_id,
        title: savedPost.title,
        userId: savedPost.user_id,
        createdAt: savedPost.created_at,
        postNumber: savedPost._count.saved_post,
        savedPosts: savedPost.saved_post.map((post) => {
          return {
            savedId: post.saved_post_id,
            post: {
              id: post.post.post_id,
              photos: post.post.photos,
            },
          }
        }),
      }
    })
  }

  async createSavedList(userId: number, title: string): Promise<SavedList> {
    const savedPost = await db.saved.create({
      data: {
        title,
        user_id: userId,
      },
      include: {
        _count: {
          select: {
            saved_post: true,
          },
        },
      },
    })
    return {
      id: savedPost.saved_id,
      title: savedPost.title,
      userId: savedPost.user_id,
      createdAt: savedPost.created_at,
      postNumber: savedPost._count.saved_post,
      savedPosts: [],
    }
  }

  async deleteSavedList(userId: number, savedId: number): Promise<void> {
    const savedPost = await db.saved.findUnique({
      where: {
        saved_id: savedId,
      },
      select: {
        user_id: true,
      },
    })

    if (!savedPost) {
      throw new SavedListNotFoundError()
    }

    if (savedPost.user_id !== userId) {
      throw new UnauthorizedError()
    }

    await db.saved.delete({
      where: {
        saved_id: savedId,
      },
    })
  }

  async editSavedList(userId: number, savedId: number, title: string): Promise<void> {
    const savedPost = await db.saved.findUnique({
      where: {
        saved_id: savedId,
      },
      select: {
        user_id: true,
      },
    })
    if (!savedPost) {
      throw new SavedListNotFoundError()
    }

    if (savedPost.user_id !== userId) {
      throw new UnauthorizedError()
    }

    await db.saved.update({
      where: {
        saved_id: savedId,
      },
      data: {
        title,
      },
    })
  }
}

const savedService = new SavedService()
export default savedService
