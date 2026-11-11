import { NextResponse, type NextRequest } from 'next/server'
import {
  isValidLocale,
  LOCALE_COOKIE_NAME,
  matchAcceptLanguage,
  type LocaleCode,
} from './lib/i18n'

const BYPASS_PREFIXES = ['/admin', '/api', '/_next', '/my-route']

function getPreferredLocale(request: NextRequest): LocaleCode {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value
  if (isValidLocale(cookieLocale)) {
    return cookieLocale
  }
  return matchAcceptLanguage(request.headers.get('accept-language'))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Payload admin, APIs, Next internals, and static files in public/ (e.g. .jpg, .svg, .ico)
  if (
    BYPASS_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0]
  if (isValidLocale(firstSegment)) {
    return NextResponse.next()
  }

  const locale = getPreferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
