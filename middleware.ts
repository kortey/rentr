import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the current path
  const path = req.nextUrl.pathname

  // If user is signed in and trying to access auth pages, redirect to dashboard
  if (session && (path === '/' || path === '/sign-in' || path === '/sign-up')) {
    return NextResponse.redirect(new URL('/agent/dashboard', req.url))
  }

  // If user is not signed in and trying to access protected routes, redirect to sign in
  if (!session && path.startsWith('/agent')) {
    const redirectUrl = new URL('/sign-in', req.url)
    // Store the attempted URL to redirect back after login
    redirectUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Update matcher to include all protected routes
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/agent/:path*' // This will protect all routes that start with /agent/
  ]
}