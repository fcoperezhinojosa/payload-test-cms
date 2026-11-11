import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { DEFAULT_LOCALE, isValidLocale } from '@/lib/i18n'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug')
  const localeParam = searchParams.get('locale')
  const collection = searchParams.get('collection') || 'pages'
  const secret = searchParams.get('secret')

  if (!slug || collection !== 'pages') {
    return new Response('Missing or unsupported preview target.', { status: 400 })
  }

  const payload = await getPayload({ config: await config })
  const requestHeaders = await headers()

  let isAuthenticated = false
  try {
    const authResult = await payload.auth({ headers: requestHeaders })
    isAuthenticated = Boolean(authResult.user)
  } catch {
    isAuthenticated = false
  }

  const previewSecret = process.env.PREVIEW_SECRET
  const hasValidSecret = Boolean(previewSecret && secret && secret === previewSecret)

  if (!isAuthenticated && !hasValidSecret) {
    const draft = await draftMode()
    draft.disable()
    return new Response('You are not allowed to preview this page.', { status: 401 })
  }

  const locale = isValidLocale(localeParam) ? localeParam : DEFAULT_LOCALE

  const result = await payload.find({
    collection: 'pages',
    locale,
    draft: true,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) {
    return new Response('Page not found.', { status: 404 })
  }

  const draft = await draftMode()
  draft.enable()

  const targetPath = page.slug === 'home' ? `/${locale}` : `/${locale}/${encodeURIComponent(page.slug)}`
  redirect(targetPath)
}
