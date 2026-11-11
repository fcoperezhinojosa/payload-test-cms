import { createHash, timingSafeEqual } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import {
  isValidLocale,
  LOCALE_COOKIE_NAME,
  matchAcceptLanguage,
  type LocaleCode,
} from './lib/i18n'

const BYPASS_PREFIXES = ['/admin', '/api', '/_next', '/my-route']

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER ?? 'devuser'
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? 'growth-tech'

function safeEqual(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest()
  const digestB = createHash('sha256').update(b).digest()
  return timingSafeEqual(digestA, digestB)
}

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false

  const match = /^Basic\s+(.+)$/i.exec(authHeader.trim())
  if (!match) return false

  let decoded: string
  try {
    decoded = Buffer.from(match[1], 'base64').toString('utf8')
  } catch {
    return false
  }

  const colonIndex = decoded.indexOf(':')
  if (colonIndex === -1) return false

  const username = decoded.slice(0, colonIndex)
  const password = decoded.slice(colonIndex + 1)

  return safeEqual(username, BASIC_AUTH_USER) && safeEqual(password, BASIC_AUTH_PASSWORD)
}

function unauthorizedResponse(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  })
}

function getPreferredLocale(request: NextRequest): LocaleCode {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value
  if (isValidLocale(cookieLocale)) {
    return cookieLocale
  }
  return matchAcceptLanguage(request.headers.get('accept-language'))
}

export function proxy(request: NextRequest) {
  if (!isAuthorized(request)) {
    return unauthorizedResponse()
  }

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
