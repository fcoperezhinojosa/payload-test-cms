import { describe, it, beforeAll, expect } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import {
  DEFAULT_LOCALE,
  LOCALE_CODES,
  localizeHref,
  matchAcceptLanguage,
  switchLocalePath,
} from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'

let payload: Payload

describe('i18n & Payload Localization', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  it('configures all 11 locales with English as default and fallback enabled', () => {
    expect(DEFAULT_LOCALE).toBe('en')
    expect(LOCALE_CODES).toEqual([
      'en',
      'de',
      'it',
      'es',
      'fr',
      'nl',
      'pl',
      'sv',
      'fi',
      'no',
      'hu',
    ])

    const loc = payload.config.localization
    expect(loc).toBeTruthy()
    if (loc) {
      expect(loc.defaultLocale).toBe('en')
      expect(loc.fallback).toBe(true)
      expect(loc.localeCodes).toEqual(LOCALE_CODES)
    }
  })

  it('matches Accept-Language headers accurately', () => {
    expect(matchAcceptLanguage('es-ES,es;q=0.9,en;q=0.8')).toBe('es')
    expect(matchAcceptLanguage('de-AT,de;q=0.9')).toBe('de')
    expect(matchAcceptLanguage('nb-NO,nb;q=0.9,en;q=0.8')).toBe('no')
    expect(matchAcceptLanguage('nn;q=1.0')).toBe('no')
    expect(matchAcceptLanguage('ja-JP,zh;q=0.9')).toBe('en')
    expect(matchAcceptLanguage(null)).toBe('en')
  })

  it('localizes internal URLs and switches locale path segments cleanly', () => {
    expect(localizeHref('/', 'de')).toBe('/de')
    expect(localizeHref('/about-us', 'es')).toBe('/es/about-us')
    expect(localizeHref('/terms-and-conditions#privacy_policy', 'fr')).toBe(
      '/fr/terms-and-conditions#privacy_policy',
    )
    expect(localizeHref('/es/about-us', 'de')).toBe('/es/about-us')
    expect(localizeHref('/admin/collections/pages', 'fi')).toBe('/admin/collections/pages')
    expect(localizeHref('https://www.suntransfers.com/help', 'it')).toBe(
      'https://www.suntransfers.com/help',
    )

    expect(switchLocalePath('/en/about-us', 'hu')).toBe('/hu/about-us')
    expect(switchLocalePath('/en', 'sv')).toBe('/sv')
    expect(switchLocalePath('/about-us', 'pl')).toBe('/pl/about-us')
  })

  it('provides dictionaries for every supported locale', () => {
    for (const code of LOCALE_CODES) {
      const dict = getDictionary(code)
      expect(dict.common.selectLanguage.length).toBeGreaterThan(0)
      expect(dict.newsletter.subscribeLabel.length).toBeGreaterThan(0)
    }
  })

  it('fetches localized page content with fallback to default locale', async () => {
    const enHome = await payload.find({
      collection: 'pages',
      locale: 'en',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })
    const fiHome = await payload.find({
      collection: 'pages',
      locale: 'fi',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    expect(enHome.docs[0]?.title).toBeTruthy()
    expect(fiHome.docs[0]?.title).toBeTruthy()

    const tempReview = await payload.create({
      collection: 'reviews',
      locale: 'en',
      overrideAccess: true,
      data: {
        author: 'Fallback Test',
        rating: 5,
        featured: false,
        comment: 'English fallback comment',
      },
    })

    try {
      const fiFallback = await payload.findByID({
        collection: 'reviews',
        id: tempReview.id,
        locale: 'fi',
      })
      expect(fiFallback.comment).toBe('English fallback comment')
    } finally {
      await payload.delete({
        collection: 'reviews',
        id: tempReview.id,
        overrideAccess: true,
      })
    }
  })
})
