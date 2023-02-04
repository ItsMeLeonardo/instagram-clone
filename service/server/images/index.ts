import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadResponseCallback,
} from 'cloudinary'

import sharp from 'sharp'
import { OptimizedImageError, UploadImageError } from './errors'

type UploadResult = {
  url: string
  id: string
}

class ImageService {
  private static provider = cloudinary
  private uploadOptions: UploadApiOptions = {
    folder: process.env.CLOUDINARY_FOLDER,
  }

  constructor() {
    if (!ImageService.provider) return
    ImageService.provider.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async optimizeImage(buffer: Buffer) {
    try {
      const optimizedImage = await sharp(buffer).webp({ quality: 75 }).toBuffer()
      return optimizedImage
    } catch (error) {
      throw new OptimizedImageError()
    }
  }

  private async uploadStream(
    buffer: Buffer,
    config: UploadApiOptions
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const optimizedImage = await this.optimizeImage(buffer)
    return new Promise((resolve, reject) => {
      const cloudinaryDone: UploadResponseCallback = (error, result) => {
        return !error && result ? resolve(result) : reject(error)
      }
      ImageService.provider.uploader.upload_stream(config, cloudinaryDone).end(optimizedImage)
    })
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const { secure_url: url, public_id: id } = await this.uploadStream(file.buffer, this.uploadOptions)

      return { url, id } as UploadResult
    } catch (error) {
      throw new UploadImageError("Couldn't upload image")
    }
  }

  async uploadImages(files: Express.Multer.File[]) {
    const uploads = files.map((file) => this.uploadImage(file))
    const results = await Promise.all(uploads)

    return results
  }

  async removeImage(id: string) {
    try {
      await ImageService.provider.uploader.destroy(id)
    } catch (error) {
      throw new UploadImageError("Couldn't remove image")
    }
  }
}

const imageService = new ImageService()

export default imageService
