import AuthProvider from 'components/Auth/AuthProvider'

import type { Session } from 'next-auth'
import type { ReactNode } from 'react'

import 'styles/globals.css'

type RootLayoutProps = {
  children: ReactNode
  session: Session
} & Record<string, unknown>

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html>
      <head lang="en">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Instagram Clone</title>
      </head>
      <body>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  )
}
