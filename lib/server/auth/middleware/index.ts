import nextConnect from 'next-connect'

import authProvider from 'lib/server/auth'

const authMiddleware = nextConnect().use(authProvider.initialize())

export default authMiddleware
