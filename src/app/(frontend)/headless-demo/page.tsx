import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { ensureSeedData } from '@/lib/ensureSeedData'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Modo Headless (Template Propio) | Payload CMS',
  description:
    'Ejemplo de un template React fijo que consulta datos a Payload en modo Headless (Local API / REST API).',
}

export default async function HeadlessTemplateDemoPage() {
  const payload = await getPayload({ config: await config })
  await ensureSeedData(payload)

  // Consulta directa desde el template (Local API) o equivalente vía fetch('/api/...')
  const [aboutPageRes, reviewsRes, allPagesRes] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    }),
    payload.find({
      collection: 'reviews',
      where: { featured: { equals: true } },
      sort: '-rating',
      limit: 6,
    }),
    payload.find({
      collection: 'pages',
      limit: 10,
      select: {
        title: true,
        slug: true,
        template: true,
        status: true,
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
          <span className="cms-pill cms-pill--headless">Modo Headless / Custom Template</span>
          <span>
            Ruta fija: <code>src/app/(frontend)/headless-demo/page.tsx</code>
          </span>
        </div>
        <div className="cms-inspector-actions">
          <a
            href="/api/pages?where[slug][equals]=about-us"
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link"
          >
            GET /api/pages?where[slug][equals]=about-us ↗
          </a>
          <a
            href="/api/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            GET /api/reviews ↗
          </a>
        </div>
      </div>

      <section className="headless-hero">
        <div className="headless-hero-grid">
          <div>
            <span className="hero-eyebrow">Diseño Fijo en Código + Datos de Payload</span>
            <h1>Template a Medida (Modo Headless)</h1>
            <p className="hero-subheading">
              A diferencia de <code>/about-us</code> o <code>/terms-and-conditions</code> (que se
              montan y ordenan por bloques desde el CMS), esta vista tiene un{' '}
              <strong>template HTML/React 100% fijo</strong> que consulta a Payload únicamente los
              datos que necesita para rellenar su interfaz.
            </p>
          </div>

          <div className="headless-kpi-box">
            <div className="kpi-item">
              <span className="kpi-value">{averageRating} ★</span>
              <span className="kpi-label">Valoración media ({reviews.length} reviews)</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">{allPagesRes.totalDocs}</span>
              <span className="kpi-label">Páginas activas en el CMS</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="headless-comparison-grid">
          <div className="headless-panel">
            <h2>1. Datos extraídos de la página &ldquo;About Us&rdquo;</h2>
            <p className="panel-hint">
              Consultado con <code>payload.find(&#123; collection: &apos;pages&apos;, where: &#123; slug: &#123; equals: &apos;about-us&apos; &#125; &#125; &#125;)</code>:
            </p>
            {aboutPage ? (
              <dl className="data-list">
                <div>
                  <dt>Título en CMS:</dt>
                  <dd>{aboutPage.title}</dd>
                </div>
                <div>
                  <dt>Hero Heading:</dt>
                  <dd>{aboutPage.heroHeading}</dd>
                </div>
                <div>
                  <dt>Hero Subheading:</dt>
                  <dd>{aboutPage.heroSubheading}</dd>
                </div>
                <div>
                  <dt>Bloques configurados:</dt>
                  <dd>{aboutPage.layout?.length || 0} bloques</dd>
                </div>
              </dl>
            ) : (
              <p>No se encontró la página about-us.</p>
            )}
          </div>

          <div className="headless-panel">
            <h2>2. Endpoints REST / GraphQL listos para usar</h2>
            <p className="panel-hint">
              Si tienes otro frontend externo o un componente cliente, puedes pedir los mismos datos
              por HTTP:
            </p>
            <pre className="code-snippet">
              <code>{`// Ejemplo desde cualquier frontend (Headless REST API)
const res = await fetch('/api/pages?where[slug][equals]=about-us')
const { docs } = await res.json()
const page = docs[0]

// Ejemplo consultando Reviews destacadas
const reviewsRes = await fetch('/api/reviews?where[featured][equals]=true')
const { docs: reviews } = await reviewsRes.json()`}</code>
            </pre>
          </div>
        </div>

        <section className="cms-block">
          <div className="block-header">
            <h2>Índice de Páginas en Payload (Consultado en vivo)</h2>
            <p>
              Todas estas páginas existen en la colección <code>pages</code> y tienen tanto su vista
              directa como su endpoint JSON:
            </p>
          </div>
          <div className="table-wrapper">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Slug</th>
                  <th>Plantilla</th>
                  <th>Vista Web (CMS)</th>
                  <th>Endpoint Headless (JSON)</th>
                </tr>
              </thead>
              <tbody>
                {allPagesRes.docs.map((p) => {
                  const webUrl = p.slug === 'home' ? '/' : `/${p.slug}`
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
                          href={`/api/pages/${p.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          /api/pages/{p.id} ↗
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
