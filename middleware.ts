// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth')

  const pathName = request.nextUrl.pathname
  console.log({ auth, pathName })
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
