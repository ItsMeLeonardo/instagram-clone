import { db } from 'lib/server/persistence'
import type { FeedFilter } from 'types/feed'
import type { Post } from 'types/post'

class FeedService {
  private async getFeedDb(userId: number, filter: FeedFilter = 'latest') {
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
      },
      orderBy: {
        created_at: filter === 'latest' ? 'asc' : 'desc',
      },
    })
    return posts
  }

  async getFeed(userId: number, filter: FeedFilter = 'latest') {
    const posts = await this.getFeedDb(userId, filter)
    return this.postListAdapter(posts)
  }

  private postListAdapter(posts: Awaited<ReturnType<typeof this.getFeedDb>>): Post[] {
    return posts.map((post) => {
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
      }
    })
  }
}

const feedService = new FeedService()

export default feedService
