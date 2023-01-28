import { db } from 'lib/server/persistence'
import type { SavedList } from 'types/saved'

class SavedService {
  private async getSavedPostsByUserIdDb(userId: number) {
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

    return savedPosts
  }

  async getSavedPostsByUserId(userId: number) {
    const savedPosts = await this.getSavedPostsByUserIdDb(userId)

    return this.savedListAdapter(savedPosts)
  }

  private savedListAdapter(savedPosts: Awaited<ReturnType<typeof this.getSavedPostsByUserIdDb>>): SavedList[] {
    return savedPosts.map((savedPost) => {
      return {
        id: savedPost.saved_id,
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
}

const savedService = new SavedService()
export default savedService
