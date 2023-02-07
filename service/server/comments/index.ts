import { db } from 'lib/server/persistence'
import { PostNotFoundError } from '../post/errors'
import { CommentNotFoundError } from './errors'
import type { Comment, RawComment } from 'types/comments'

class CommentService {
  async commentPost(postId: number, userId: number, comment: string) {
    const post = await db.post.findUnique({
      where: {
        post_id: postId,
      },
    })

    if (!post) {
      throw new PostNotFoundError()
    }

    await db.comment.create({
      data: {
        user_id: userId,
        post_id: postId,
        comment: {
          text: comment,
        },
      },
    })
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await db.comment.findUnique({
      where: {
        comment_id: commentId,
      },
    })

    if (!comment) {
      throw new CommentNotFoundError()
    }

    if (comment.user_id !== userId) {
      throw new Error('Unauthorized')
    }

    await db.comment.delete({
      where: {
        comment_id: commentId,
      },
    })
  }

  async getPostComments(postId: number): Promise<Comment[]> {
    const post = await db.post.findUnique({
      where: {
        post_id: postId,
      },
    })

    if (!post) {
      throw new PostNotFoundError()
    }

    const comments = await db.comment.findMany({
      where: {
        post_id: postId,
      },
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
    })
    return comments.map((comment) => ({
      commentId: comment.comment_id,
      comment: comment.comment as RawComment,
      user: {
        avatar: comment.user.avatar,
        username: comment.user.username,
        id: comment.user.user_id,
      },
    }))
  }
}

const commentService = new CommentService()
export default commentService
