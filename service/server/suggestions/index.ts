import { db } from 'lib/server/persistence'
import { Suggestion } from 'types/suggestions'

class SuggestionsService {
  async getSuggestions(userId: number): Promise<Suggestion[]> {
    const users = await db.user.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
        NOT: {
          user_id: userId,
        },
      },
      select: {
        user_id: true,
        username: true,
        avatar: true,
        email: true,
        location: true,
      },
      take: 5,
    })

    return users.map((user) => ({
      id: user.user_id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      location: user.location,
    }))
  }
}

const suggestionsService = new SuggestionsService()

export default suggestionsService
