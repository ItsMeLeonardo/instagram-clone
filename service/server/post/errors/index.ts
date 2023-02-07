export class InvalidPostError extends Error {
  constructor() {
    super('Invalid post')
  }
}

export class PostNotFoundError extends Error {
  constructor() {
    super('Post not found')
  }
}
