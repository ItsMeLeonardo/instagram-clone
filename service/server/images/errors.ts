export class UploadImageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UploadImageError'
  }
}

export class OptimizedImageError extends Error {
  constructor() {
    super('Could not optimize image')
  }
}
