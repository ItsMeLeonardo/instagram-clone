import { db } from 'lib/server/persistence'

import type { Tag } from 'types/tags'

class TagService {
  async createTag(name: string): Promise<Tag> {
    const tag = await db.tag.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    })
    return {
      id: tag.tag_id,
      name: tag.name,
    }
  }

  async upsertTags(tags: string[]): Promise<Tag[]> {
    const result = await db.$transaction(
      tags.map((name) =>
        db.tag.upsert({
          where: {
            name,
          },
          update: {},
          create: {
            name,
          },
        })
      )
    )

    return result.map((tag) => ({
      id: tag.tag_id,
      name: tag.name,
    }))
  }
}

const tagService = new TagService()

export default tagService
