import type { Metadata } from 'next'
import Link from 'next/link'
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
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)

  const { page } = await getPageBySlug(payload, 'home', locale)

  const alternates = {
    canonical: `/${locale}`,
    languages: {
      ...Object.fromEntries(SUPPORTED_LOCALES.map(({ code }) => [code, `/${code}`])),
      'x-default': `/${DEFAULT_LOCALE}`,
    },
  }

  if (!page) {
    return {
      title: 'Home | Payload CMS',
      alternates,
    }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.heroSubheading || undefined,
    alternates,
  }
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)
  const dict = getDictionary(locale)

  const { page: homePage, isDraftMode } = await getPageBySlug(payload, 'home', locale)

  if (!homePage) {
    return (
      <div className="empty-page-container">
        <h1>{dict.common.homeNotFoundTitle}</h1>
        <p>{dict.common.homeNotFoundDesc}</p>
        <Link href={payloadConfig.routes.admin} className="btn-primary">
          {dict.common.goToAdmin}
        </Link>
      </div>
    )
  }

  return (
    <PageTemplate
      page={homePage}
      payload={payload}
      locale={locale}
      dict={dict}
      isDraftMode={isDraftMode}
    />
  )
}
