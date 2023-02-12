import { db } from 'lib/server/persistence'
import { Follower, Following } from 'types/friendships'

class FriendshipService {
  async getFollowers(userId: number): Promise<Follower[]> {
    const followers = await db.follow.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user_follow_follower_idTouser: {
          select: {
            avatar: true,
            user_id: true,
            username: true,
          },
        },
      },
    })

    return followers.map((follower) => {
      return {
        followId: follower.follow_id,
        userId: follower.user_id,
        followerId: follower.follower_id,
        createdAt: follower.created_at,
        follower: {
          avatar: follower.user_follow_follower_idTouser.avatar,
          id: follower.user_follow_follower_idTouser.user_id,
          username: follower.user_follow_follower_idTouser.username,
        },
      }
    })
  }

  async getFollowing(userId: number): Promise<Following[]> {
    const following = await db.follow.findMany({
      where: {
        follower_id: userId,
      },
      include: {
        user_follow_user_idTouser: {
          select: {
            avatar: true,
            user_id: true,
            username: true,
          },
        },
      },
    })

    return following.map((follower) => {
      return {
        followId: follower.follow_id,
        userId: follower.user_id,
        followerId: follower.follower_id,
        createdAt: follower.created_at,
        following: {
          avatar: follower.user_follow_user_idTouser.avatar,
          id: follower.user_follow_user_idTouser.user_id,
          username: follower.user_follow_user_idTouser.username,
        },
      }
    })
  }

  async follow(userId: number, followerId: number) {
    const follow = await db.follow.create({
      data: {
        user_id: userId,
        follower_id: followerId,
      },
    })

    return follow
  }

  async unFollow(followId: number) {
    await db.follow.delete({
      where: {
        follow_id: followId,
      },
    })
  }
}

const friendshipService = new FriendshipService()

export default friendshipService
