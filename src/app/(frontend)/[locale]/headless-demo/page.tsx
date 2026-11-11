import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { ensureSeedData } from '@/lib/ensureSeedData'
import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    title: dict.headless.metaTitle,
    description: dict.headless.metaDescription,
    alternates: {
      canonical: `/${locale}/headless-demo`,
      languages: {
        ...Object.fromEntries(
          SUPPORTED_LOCALES.map(({ code }) => [code, `/${code}/headless-demo`]),
        ),
        'x-default': `/${DEFAULT_LOCALE}/headless-demo`,
      },
    },
  }
}

export default async function HeadlessTemplateDemoPage({ params }: Args) {
  const { locale } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)
  const dict = getDictionary(locale)
  const { isEnabled: isDraftMode } = await draftMode()

  // Consulta directa desde el template (Local API) o equivalente vía fetch('/api/...')
  const [aboutPageRes, reviewsRes, allPagesRes] = await Promise.all([
    payload.find({
      collection: 'pages',
      locale,
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    }),
    payload.find({
      collection: 'reviews',
      locale,
      where: { featured: { equals: true } },
      sort: '-rating',
      limit: 6,
    }),
    payload.find({
      collection: 'pages',
      locale,
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      limit: 10,
      select: {
        title: true,
        slug: true,
        template: true,
        _status: true,
        updatedAt: true,
      },
    }),
  ])

  const aboutPage = aboutPageRes.docs[0]
  const reviews = reviewsRes.docs
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0'

  return (
    <div className="headless-page">
      <div className="cms-inspector-bar">
        <div className="cms-inspector-info">
          <span className="cms-pill cms-pill--headless">{dict.inspector.headlessMode}</span>
          <span>
            {dict.headless.fixedRoute}: <code>src/app/(frontend)/[locale]/headless-demo/page.tsx</code>
          </span>
        </div>
        <div className="cms-inspector-actions">
          <a
            href={`/api/pages?where[slug][equals]=about-us&locale=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link"
          >
            GET /api/pages?where[slug][equals]=about-us&amp;locale={locale} ↗
          </a>
          <a
            href={`/api/reviews?locale=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            GET /api/reviews?locale={locale} ↗
          </a>
        </div>
      </div>

      <section className="headless-hero">
        <div className="headless-hero-grid">
          <div>
            <span className="hero-eyebrow">{dict.headless.eyebrow}</span>
            <h1>{dict.headless.heading}</h1>
            <p className="hero-subheading">{dict.headless.subheading}</p>
          </div>

          <div className="headless-kpi-box">
            <div className="kpi-item">
              <span className="kpi-value">{averageRating} ★</span>
              <span className="kpi-label">
                {dict.headless.avgRatingLabel} ({reviews.length} {dict.headless.reviewsWord})
              </span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">{allPagesRes.totalDocs}</span>
              <span className="kpi-label">{dict.headless.activePagesLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="headless-comparison-grid">
          <div className="headless-panel">
            <h2>{dict.headless.section1Title}</h2>
            <p className="panel-hint">{dict.headless.section1Hint}</p>
            {aboutPage ? (
              <dl className="data-list">
                <div>
                  <dt>{dict.headless.cmsTitleLabel}</dt>
                  <dd>{aboutPage.title}</dd>
                </div>
                <div>
                  <dt>{dict.headless.heroHeadingLabel}</dt>
                  <dd>{aboutPage.heroHeading}</dd>
                </div>
                <div>
                  <dt>{dict.headless.heroSubheadingLabel}</dt>
                  <dd>{aboutPage.heroSubheading}</dd>
                </div>
                <div>
                  <dt>{dict.headless.blocksConfiguredLabel}</dt>
                  <dd>
                    {aboutPage.layout?.length || 0} {dict.headless.blocksWord}
                  </dd>
                </div>
              </dl>
            ) : (
              <p>{dict.headless.aboutNotFound}</p>
            )}
          </div>

          <div className="headless-panel">
            <h2>{dict.headless.section2Title}</h2>
            <p className="panel-hint">{dict.headless.section2Hint}</p>
            <pre className="code-snippet">
              <code>{`// Headless REST API (locale: ${locale})
const res = await fetch('/api/pages?where[slug][equals]=about-us&locale=${locale}')
const { docs } = await res.json()
const page = docs[0]

// Featured reviews in ${locale}
const reviewsRes = await fetch('/api/reviews?where[featured][equals]=true&locale=${locale}')
const { docs: reviews } = await reviewsRes.json()`}</code>
            </pre>
          </div>
        </div>

        <section className="cms-block">
          <div className="block-header">
            <h2>{dict.headless.indexTitle}</h2>
            <p>{dict.headless.indexSubtitle}</p>
          </div>
          <div className="table-wrapper">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>{dict.headless.colTitle}</th>
                  <th>{dict.headless.colSlug}</th>
                  <th>{dict.headless.colTemplate}</th>
                  <th>{dict.headless.colWebView}</th>
                  <th>{dict.headless.colHeadlessEndpoint}</th>
                </tr>
              </thead>
              <tbody>
                {allPagesRes.docs.map((p) => {
                  const webUrl = p.slug === 'home' ? `/${locale}` : `/${locale}/${p.slug}`
                  return (
                    <tr key={p.id}>
                      <td>
                        <strong>{p.title}</strong>
                      </td>
                      <td>
                        <code>{p.slug}</code>
                      </td>
                      <td>
                        <span className="table-badge">{p.template}</span>
                      </td>
                      <td>
                        <a href={webUrl}>{webUrl}</a>
                      </td>
                      <td>
                        <a
                          href={`/api/pages/${p.id}?locale=${locale}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          /api/pages/{p.id}?locale={locale} ↗
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
