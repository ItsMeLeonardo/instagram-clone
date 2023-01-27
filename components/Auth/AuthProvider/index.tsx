'use client'
import { SessionProvider } from 'next-auth/react'

import type { ReactNode } from 'react'
import type { Session } from 'next-auth'

export type Props = {
  children: ReactNode
  session: Session
}

export default function AuthProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
