import { db } from 'lib/server/persistence'
import { PostDto } from './dto'
import type { Post } from 'types/post'

class PostService {
  async getPostById(id: number) {
    const post = await db.post.findUnique({
      where: {
        post_id: id,
      },
    })

    return post
  }

  private async getBbListPosts() {
    const posts = await db.post.findMany({
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
    })
    return posts
  }

  async getPosts() {
    const posts = await this.getBbListPosts()
    return this.postListAdapter(posts)
  }

  async createPost(post: PostDto) {
    const newPost = await db.post.create({
      data: post,
    })

    return newPost
  }

  private postListAdapter(posts: Awaited<ReturnType<typeof this.getBbListPosts>>): Post[] {
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

const postService = new PostService()
export default postService
