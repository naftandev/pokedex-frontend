import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  {/* ROUTES */}
  /** Login */
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    }
    return NextResponse.next()
  }

  /** Dashboard, Profile */
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile')) {
    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/login',
    '/dashboard',
    '/profile/:path*'
  ]
}
