import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // if user is signed in and the current path is / or /sign-in redirect the user to /agent/dashboard
  if (session && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/sign-in')) {
    return NextResponse.redirect(new URL('/agent/dashboard', req.url))
  }

  // if user is not signed in and the current path is /agent/dashboard redirect the user to /
  if (!session && req.nextUrl.pathname.startsWith('/agent/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/agent/dashboard', '/sign-in', '/sign-up']
}
