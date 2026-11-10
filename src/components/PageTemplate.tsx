import React from 'react'
import type { Payload } from 'payload'
import type { Media, Page } from '@/payload-types'
import { RenderBlocks } from './RenderBlocks'

type Props = {
  page: Page
  payload: Payload
}

export async function PageTemplate({ page, payload }: Props) {
  const heroImage =
    typeof page.heroImage === 'object' && page.heroImage !== null
      ? (page.heroImage as Media)
      : null

  const template = page.template || 'default'
  const updatedDate = new Date(page.updatedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className={`cms-page cms-page--${template}`}>
      {/* Barra informativa de Payload para editar o ver JSON Headless */}
      <div className="cms-inspector-bar">
        <div className="cms-inspector-info">
          <span className="cms-pill cms-pill--mode">CMS Page</span>
          <span>
            Slug: <code>{page.slug}</code>
          </span>
          <span>
            Template: <code>{template}</code>
          </span>
        </div>
        <div className="cms-inspector-actions">
          <a
            href={`/admin/collections/pages/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link"
          >
            Editar en /admin ↗
          </a>
          <a
            href={`/api/pages/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            Ver JSON (Headless API) ↗
          </a>
        </div>
      </div>

      {/* Cabecera según el tipo de plantilla (Legal vs Hero visual) */}
      {template === 'legal' ? (
        <header className="legal-header">
          <span className="legal-eyebrow">Documento Legal</span>
          <h1>{page.heroHeading || page.title}</h1>
          {page.heroSubheading && <p className="legal-subtitle">{page.heroSubheading}</p>}
          <p className="legal-updated">Última actualización desde el CMS: {updatedDate}</p>
        </header>
      ) : (
        page.heroType !== 'none' && (
          <header className={`hero hero--${page.heroType || 'highImpact'}`}>
            <div className="hero-inner">
              <span className="hero-eyebrow">
                {template === 'landing' ? 'Landing Page · CMS' : page.title}
              </span>
              <h1>{page.heroHeading || page.title}</h1>
              {page.heroSubheading && <p className="hero-subheading">{page.heroSubheading}</p>}
              {heroImage?.url && (
                <div className="hero-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroImage.url} alt={heroImage.alt || page.title} />
                </div>
              )}
            </div>
          </header>
        )
      )}

      {/* Cuerpo de bloques dinámicos */}
      <div className={`page-body ${template === 'legal' ? 'page-body--narrow' : ''}`}>
        <RenderBlocks blocks={page.layout} payload={payload} />
      </div>
    </article>
  )
}
