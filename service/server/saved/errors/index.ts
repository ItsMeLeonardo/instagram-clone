export class SavedListNotFoundError extends Error {
  constructor() {
    super('Saved list not found')
  }
}
