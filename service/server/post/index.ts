import { db } from 'lib/server/persistence'

import { PostSchema, postSchema } from './dto'
import type { ExplorePost, PhotoPost, Post, PostCreated, PostStats, PostDetail } from 'types/post'
import { InvalidPostError } from './errors'

import tagService from 'service/server/tag'
import { PostNotFoundError } from './errors'
import { RawComment } from 'types/comments'
class PostService {
  async getPostById(id: number): Promise<PostDetail> {
    const post = await db.post.findUnique({
      where: {
        post_id: id,
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
        comment: {
          select: {
            comment: true,
            comment_id: true,
            user: {
              select: {
                username: true,
                avatar: true,
                user_id: true,
              },
            },
          },
        },
      },
    })

    if (!post) throw new PostNotFoundError()

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
      comments: post.comment.map((comment) => ({
        commentId: comment.comment_id,
        comment: comment.comment as RawComment,
        user: {
          avatar: comment.user.avatar,
          username: comment.user.username,
          id: comment.user.user_id,
        },
      })),
    }
  }

  async getPostsByUserId(id: number, limit: number): Promise<PhotoPost[]> {
    const posts = await db.post.findMany({
      where: {
        user_id: id,
      },
      select: {
        post_id: true,
        photos: true,
      },
      take: limit,
    })

    return posts.map((post) => ({
      id: post.post_id,
      photos: post.photos,
    }))
  }

  async getPosts(): Promise<Post[]> {
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
      take: 10,
    })

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

  async createPost(postDto: PostSchema): Promise<PostCreated> {
    const { success } = postSchema.safeParse(postDto)

    if (!success) {
      throw new InvalidPostError()
    }

    const tags = await tagService.upsertTags(postDto.tags || [])

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

    return {
      id: newPost.post_id,
      description: newPost.description,
      createdAt: newPost.created_at,
      photos: newPost.photos,
      userId: newPost.user_id,
    }
  }

  async likePost(postId: number, userId: number) {
    const post = await db.post.findUnique({
      where: {
        post_id: postId,
      },
    })

    if (!post) {
      throw new InvalidPostError()
    }

    await db.like.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    })
  }

  async unlikePost(postId: number, userId: number) {
    const post = await db.post.findUnique({
      where: {
        post_id: postId,
      },
    })

    if (!post) {
      throw new InvalidPostError()
    }

    await db.like.deleteMany({
      where: {
        user_id: userId,
        post_id: postId,
      },
    })
  }

  async getPostStats(postId: number): Promise<PostStats> {
    const post = await db.post.findUnique({
      where: {
        post_id: postId,
      },
      select: {
        _count: {
          select: {
            comment: true,
            like: true,
            saved_post: true,
          },
        },
      },
    })

    if (!post) {
      throw new InvalidPostError()
    }

    return post._count
  }

  async getPostsByUsername(username: string, limit = 10): Promise<PhotoPost[]> {
    const posts = await db.post.findMany({
      where: {
        user: {
          username,
        },
      },
      select: {
        post_id: true,
        photos: true,
      },
      take: limit,
    })

    return posts.map((post) => ({
      id: post.post_id,
      photos: post.photos,
    }))
  }
}

const postService = new PostService()
export default postService
