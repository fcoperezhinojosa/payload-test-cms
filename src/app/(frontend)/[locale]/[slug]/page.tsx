import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'
import { ensureSeedData } from '@/lib/ensureSeedData'
import { getPageBySlug } from '@/lib/getPageBySlug'
import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}

  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)
  const dict = getDictionary(locale)

  const { page } = await getPageBySlug(payload, slug, locale)
  if (!page) {
    return {
      title: dict.common.pageNotFound,
    }
  }

  return {
    title: page.metaTitle || `${page.title} | Payload CMS`,
    description: page.metaDescription || page.heroSubheading || undefined,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LOCALES.map(({ code }) => [code, `/${code}/${slug}`])),
        'x-default': `/${DEFAULT_LOCALE}/${slug}`,
      },
    },
  }
}

export default async function DynamicCMSPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)
  const dict = getDictionary(locale)

  const { page, isDraftMode } = await getPageBySlug(payload, slug, locale)

  if (!page) {
    notFound()
  }

  return (
    <PageTemplate
      page={page}
      payload={payload}
      locale={locale}
      dict={dict}
      isDraftMode={isDraftMode}
    />
  )
}
