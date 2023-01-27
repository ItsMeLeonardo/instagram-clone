import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.JWT_SECRET })

  try {
    if (!session) {
      throw new Error('Invalid credentials')
    }

    return NextResponse.next()
  } catch (error) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/app/:path*',
}
