import { headers } from 'next/headers'
import AuthProvider from 'components/Auth/AuthProvider'
import ToastContainer from 'components/shared/Toaster'

import type { Session } from 'next-auth'
import type { ReactNode } from 'react'

import 'styles/globals.css'

/* type RootLayoutProps = {
  children: ReactNode
  session: Session
} & Record<string, unknown> */

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props
  const session = await getSession(headers().get('cookie') ?? '')

  return (
    <html>
      <head lang="en">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Instagram Clone</title>
      </head>
      <body>
        <ToastContainer />
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  )
}
