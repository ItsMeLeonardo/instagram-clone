import { authMiddleware } from 'lib/server/auth/middleware'
import base from 'lib/server/middleware/common'

import type { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import type { NextApiRequest } from 'next'

import userService from 'service/server/user/service'
import { uploadStrategy } from 'utils/shared/file-request'
import { UpdateUserDto, updateUserDtoSchema } from 'service/server/user/dto'
import imageService from 'service/server/images'
import { logger } from 'utils/shared/logs'
import { EmailAlreadyExistsError, UsernameAlreadyExistsError } from 'service/server/auth/errors'

export const config = {
  api: {
    bodyParser: false,
  },
}

type UpdateUserRequest = {
  file?: Express.Multer.File
} & NextApiRequest &
  NextAuthRequest

export default base()
  .get(async (req, res) => {
    const keyword = req.query.keyword as string

    if (!keyword) return res.status(400).json({ message: 'keyword is required' })

    const users = await userService.findUser(keyword)

    res.status(200).json(users)
  })
  .use(authMiddleware)
  .use(uploadStrategy.single('avatarFile'))
  .post<UpdateUserRequest>(async (req, res) => {
    const id = Number(req.userId)
    const file = req.file
    const body = req.body as UpdateUserDto

    try {
      updateUserDtoSchema.parse({ ...body })
    } catch (error) {
      return res.status(400).json({ message: 'Invalid post body' })
    }

    try {
      if (!file) {
        const user = await userService.updateUser(id, body)
        return res.status(200).json(user)
      }

      const image = await imageService.uploadImage(file)
      const user = await userService.updateUser(id, { ...body, avatar: image.url })
      res.status(200).json(user)
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(400).json({ message: 'email already taken' })
      }

      if (error instanceof UsernameAlreadyExistsError) {
        return res.status(400).json({ message: 'username already taken' })
      }

      logger.error(error)
      return res.status(400).json({ message: 'error updating data' })
    }
  })
