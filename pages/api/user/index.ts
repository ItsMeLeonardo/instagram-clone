import base from 'lib/shared/middleware/common'

import userService from 'service/server/user/service'

export default base().get(async (req, res) => {
  const users = await userService.getUsers()

  res.status(200).json(users)
})
