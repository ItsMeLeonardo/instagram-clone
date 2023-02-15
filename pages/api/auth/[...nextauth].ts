import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

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
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session, token }) {
      //@ts-ignore
      session.accessToken = token.accessToken
      const { user } = session

      if (user) {
        const { email, image, name } = user

        if (!email || !image || !name) return session

        const result = await authService.loginWithSocial({ email, avatar: image, username: name })

        token.sub = result.id.toString()
      }

      return session
    },
  },

  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)
