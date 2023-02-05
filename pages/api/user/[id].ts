import base from 'lib/server/middleware/common'
import userService from 'service/server/user/service'

export default base().get(async (req, res) => {
  const id = Number(req.query.id)

  if (!id) return res.status(400).json({ message: 'id is required' })

  const user = await userService.getUserById(id)

  if (!user) return res.status(400).json({ message: 'user not found' })

  res.status(200).json(user)
})
