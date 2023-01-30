import { db } from 'lib/server/persistence'

import { PostDto, postSchema } from './dto'
import type { ExplorePost, Post } from 'types/post'
import { InvalidPostError } from './errors'

import tagService from 'service/server/tag'
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

  async getExplorePosts(): Promise<ExplorePost[]> {
    const posts = await db.post.findMany({
      select: {
        post_id: true,
        photos: true,
        description: true,
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
    })
    return posts.map((post) => ({
      comments: post._count.comment,
      likes: post._count.like,
      id: post.post_id,
      photos: post.photos,
      description: post.description,
    }))
  }

  async createPost(postDto: PostDto) {
    const { success } = postSchema.safeParse(postDto)

    if (!success) {
      throw new InvalidPostError()
    }

    const tags = await tagService.upsertTags(postDto.tags)

    const post = {
      description: postDto.description,
      user_id: postDto.userId,
      photos: postDto.photos,
    }

    const newPost = await db.post.create({
      data: {
        ...post,
        post_tag: {
          create: tags.map((tag) => ({
            tag_id: tag.id,
          })),
        },
      },
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
