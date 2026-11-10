import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'
import { ensureSeedData } from '@/lib/ensureSeedData'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)

  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const page = res.docs[0]
  if (!page) {
    return {
      title: 'Página no encontrada',
    }
  }

  return {
    title: page.metaTitle || `${page.title} | Payload CMS`,
    description: page.metaDescription || page.heroSubheading || undefined,
  }
}

export default async function DynamicCMSPage({ params }: Args) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  return <PageTemplate page={page} payload={payload} />
}
