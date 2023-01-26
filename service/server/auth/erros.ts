export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super('Invalid password')
  }
}
