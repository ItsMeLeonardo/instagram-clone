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

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists')
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
  }
}
