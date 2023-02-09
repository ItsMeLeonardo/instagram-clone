export class StoryNotFoundError extends Error {
  constructor() {
    super('Story not found')
  }
}
