import nextConnect from 'next-connect'

import authProvider from 'lib/server/auth'

const auth = nextConnect().use(authProvider.initialize())

export default auth
