import multer from 'multer'

const inMemoryStorage = multer.memoryStorage()
export const uploadStrategy = multer({ storage: inMemoryStorage })
