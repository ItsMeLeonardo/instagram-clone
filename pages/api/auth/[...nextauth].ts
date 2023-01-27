import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import authService from 'service/server/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        if (!email || !password) return null

        const user = await authService.login({ email, password })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id.toString(),
            email: user.email,
          }
        } else {
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session, token }) {
      //@ts-ignore
      session.accessToken = token.accessToken
      return session
    },
  },

  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)
