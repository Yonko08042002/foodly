import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { ROUTES } from '@/shared/constant'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)
const protectedRoutes = [ROUTES.PROFILE, ROUTES.GROUP, ROUTES.MY_GROUP, ROUTES.PAYMENT]

const GET_PATH_NAME_REGEX = /^\/[a-z]{2}(\/.*)$/

export default withAuth(
  function middleware(req) {
    let { pathname } = req.nextUrl
    pathname = pathname.replace(GET_PATH_NAME_REGEX, '$1')

    if (req.nextauth.token) {
      if (pathname.startsWith(ROUTES.LOGIN) || pathname.startsWith(ROUTES.REGISTER)) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      return intlMiddleware(req) || NextResponse.next()
    }

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      const redirectTo = req.nextUrl.search
        ? `${req.nextUrl.pathname}${req.nextUrl.search}`
        : req.nextUrl.pathname
      return NextResponse.redirect(
        new URL(`${ROUTES.LOGIN}?from=${encodeURIComponent(redirectTo)}`, req.url),
      )
    }

    return intlMiddleware(req) || NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        let { pathname } = req.nextUrl
        pathname = pathname.replace(GET_PATH_NAME_REGEX, '$1')

        if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
          return false
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ['/', '/(en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
