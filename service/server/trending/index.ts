import { db } from 'lib/server/persistence'
import { Trending } from 'types/trending'

class TrendingService {
  async getTrending(): Promise<Trending[]> {
    const posts = await db.post.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      select: {
        post_id: true,
        photos: true,
      },
      take: 4,
    })

    return posts.map((post) => ({
      id: post.post_id,
      photo: post.photos[0],
    }))
  }
}

const trendingService = new TrendingService()

export default trendingService
