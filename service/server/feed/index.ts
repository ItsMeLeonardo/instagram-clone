import { db } from 'lib/server/persistence'
import type { FeedFilter } from 'types/feed'
import type { FeedPost } from 'types/post'

class FeedService {
  async getFeed(userId: number, filter: FeedFilter = 'latest'): Promise<FeedPost[]> {
    const posts = await db.post.findMany({
      where: {
        NOT: {
          user_id: userId,
        },
      },
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            avatar: true,
            location: true,
          },
        },
        _count: {
          select: {
            comment: true,
            like: true,
            saved_post: true,
          },
        },
        post_tag: {
          select: {
            tag: {
              select: {
                name: true,
                tag_id: true,
              },
            },
          },
        },
        like: {
          where: {
            user_id: userId,
          },
          select: {
            like_id: true,
          },
        },
      },
      orderBy: {
        created_at: filter === 'latest' ? 'asc' : 'desc',
      },
    })

    const userSavedList = await db.saved
      .findMany({
        where: {
          user_id: userId,
        },
        include: {
          saved_post: {
            include: {
              post: {
                select: {
                  post_id: true,
                },
              },
            },
          },
        },
      })
      .then((saved) => saved.flatMap((s) => s.saved_post.map((post) => post.post_id)))

    const savedPosts = new Set(userSavedList)
    return posts.map((post) => {
      const saved = savedPosts.has(post.post_id)
      return {
        id: post.post_id,
        description: post.description,
        createdAt: post.created_at,
        photos: post.photos,
        user: {
          id: post.user.user_id,
          avatar: post.user.avatar,
          username: post.user.username,
          location: post.user.location,
        },
        stats: {
          comment: post._count.comment,
          like: post._count.like,
          saved_post: post._count.saved_post,
        },
        tags: post.post_tag.map(({ tag }) => ({
          id: tag.tag_id,
          name: tag.name,
        })),
        liked: post.like.length > 0,
        saved,
      }
    })
  }
}

const feedService = new FeedService()

export default feedService
