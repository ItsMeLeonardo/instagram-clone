import base from 'lib/server/middleware/common'

import userService from 'service/server/user/service'

export default base().get(async (req, res) => {
  const keyword = req.query.keyword as string

  if (!keyword) return res.status(400).json({ message: 'keyword is required' })

  const users = await userService.findUser(keyword)

  res.status(200).json(users)
})
