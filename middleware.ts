import { NextResponse } from 'next/server'
import { request as fetch } from 'lib/shared/request'

import { logger } from 'utils/shared/logs'
import { COOKIE_TOKEN_KEY } from 'config'

import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get(COOKIE_TOKEN_KEY)

  try {
    if (!authToken) {
      throw new Error('Invalid credentials')
    }

    const response = await fetch('http://localhost:3000/api/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: authToken.value }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    return NextResponse.next()
  } catch (error) {
    logger.error(error)
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/app/:path*',
}
