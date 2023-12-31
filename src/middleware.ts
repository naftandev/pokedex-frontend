import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || ''

  /** Sign Up, Log In */
  if (request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/login')) {
    if (token) return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
    return NextResponse.next()
  }

  /** Dashboard, Profile */
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile')) {
    if (!token) return NextResponse.redirect(`${request.nextUrl.origin}/login`)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/signup',
    '/login',
    '/dashboard',
    '/profile/:path*'
  ]
}
