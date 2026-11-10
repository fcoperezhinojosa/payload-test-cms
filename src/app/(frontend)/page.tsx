import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'
import { ensureSeedData } from '@/lib/ensureSeedData'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)

  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    limit: 1,
  })

  const page = res.docs[0]
  if (!page) {
    return {
      title: 'Inicio | Payload CMS',
    }
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.heroSubheading || undefined,
  }
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const homePage = result.docs[0]

  if (!homePage) {
    return (
      <div className="empty-page-container">
        <h1>Aún no existe la página con slug &ldquo;home&rdquo;</h1>
        <p>
          Crea una página con el slug <code>home</code> en el panel de administración para que se
          muestre aquí automáticamente.
        </p>
        <Link href={payloadConfig.routes.admin} className="btn-primary">
          Ir a /admin
        </Link>
      </div>
    )
  }

  return <PageTemplate page={homePage} payload={payload} />
}
