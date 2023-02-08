export class SavedListNotFoundError extends Error {
  constructor() {
    super('Saved list not found')
  }
}

export class SavedListNotCreatedError extends Error {
  constructor() {
    super('Saved list not created')
  }
}
