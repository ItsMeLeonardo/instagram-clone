import { db } from 'lib/server/persistence'
import type { SavedList, SavedListDetail } from 'types/saved'
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
        createdAt: savedPost.created_at,
        poster: savedPost.saved_post[0]?.post.photos[0],
        posts: savedPost.saved_post.map((savedPost) => savedPost.post.post_id),
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
      createdAt: savedPost.created_at,
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

  async addPostToSavedList(userId: number, savedId: number, postId: number): Promise<void> {
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

    await db.saved_post.create({
      data: {
        saved_id: savedId,
        post_id: postId,
      },
    })
  }

  async removePostFromSavedList(userId: number, savedId: number, postId: number): Promise<void> {
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

    await db.saved_post.deleteMany({
      where: {
        saved_id: savedId,
        post_id: postId,
      },
    })
  }

  async removePostFromAllSavedList(userId: number, postId: number): Promise<void> {
    await db.saved_post.deleteMany({
      where: {
        post_id: postId,
        saved: {
          user_id: userId,
        },
      },
    })
  }

  async getPostsBySavedList(userId: number, savedId: number): Promise<SavedListDetail> {
    const savedPost = await db.saved.findUnique({
      where: {
        saved_id: savedId,
      },
      select: {
        saved_id: true,
        user_id: true,
        title: true,
        created_at: true,
      },
    })

    if (!savedPost) {
      throw new SavedListNotFoundError()
    }

    if (savedPost.user_id !== userId) {
      throw new UnauthorizedError()
    }

    const posts = await db.saved_post.findMany({
      where: {
        saved_id: savedId,
      },
      include: {
        post: {
          select: {
            post_id: true,
            photos: true,
          },
        },
      },
    })

    return {
      id: savedPost.saved_id,
      title: savedPost.title,
      createdAt: savedPost.created_at,
      posts: posts.map((post) => ({
        id: post.post.post_id,
        photos: post.post.photos,
      })),
    }
  }
}

const savedService = new SavedService()
export default savedService
