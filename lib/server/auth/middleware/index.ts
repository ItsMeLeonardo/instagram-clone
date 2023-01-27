import nextConnect from 'next-connect'
import authProvider from 'lib/server/auth'

import { withNextAuth } from './with-next-auth'

const authMiddlewarePassport = nextConnect().use(authProvider.initialize())

export const authMiddleware = withNextAuth

export default authMiddlewarePassport
