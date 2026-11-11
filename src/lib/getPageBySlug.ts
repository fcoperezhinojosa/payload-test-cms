import { draftMode } from 'next/headers'
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import type { LocaleCode } from './i18n'

/**
 * Fetches a page by slug for the active locale, respecting Next.js Draft Mode.
 * Public requests enforce `publishedOrAuthenticated` access control via `overrideAccess: false`.
 */
export async function getPageBySlug(
  payload: Payload,
  slug: string,
  locale: LocaleCode,
): Promise<{ page: Page | undefined; isDraftMode: boolean }> {
  const { isEnabled: isDraftMode } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    locale,
    draft: isDraftMode,
    overrideAccess: isDraftMode,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return {
    page: result.docs[0],
    isDraftMode,
  }
}
