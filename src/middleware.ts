import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwt } from './utils/api'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || ''  // --> For pages
  const bearerToken = request.headers.get('Authorization')?.split(' ')[1] || ''  // --> For API

  {/* PAGES */}
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

  {/* API */}
  /** Pokemons */
  if (request.nextUrl.pathname.startsWith('/api/pokemons')) {
    try {
      await verifyJwt(bearerToken)
      return NextResponse.next()
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unexpected error'
      return NextResponse.json({ msg },  { status: 401 })
    }
  }
}

export const config = {
  matcher: [
    '/login',
    '/dashboard',
    '/profile/:path*',
    '/api/:path*'
  ]
}
