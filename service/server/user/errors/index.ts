export class UsernameNotFoundError extends Error {
  constructor() {
    super('Username not found')
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User doesn't exist")
  }
}
