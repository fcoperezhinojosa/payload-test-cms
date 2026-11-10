import React from 'react'
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { PageHero } from './PageHero'
import { RenderBlocks } from './RenderBlocks'

type Props = {
  page: Page
  payload: Payload
}

export async function PageTemplate({ page, payload }: Props) {
  const template = page.template || 'default'
  const pageFont = page.pageFont && page.pageFont !== 'inherit' ? page.pageFont : undefined
  const pageTheme = page.pageTheme && page.pageTheme !== 'inherit' ? page.pageTheme : undefined
  const customBg = page.customBackgroundColor?.trim() || ''

  const updatedDate = new Date(page.updatedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const pageStyle = customBg
    ? ({ '--bg': customBg, backgroundColor: customBg } as React.CSSProperties)
    : undefined

  return (
    <article
      className={`cms-page cms-page--${template}`}
      data-font={pageFont}
      data-theme={pageTheme}
      style={pageStyle}
    >
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
          <span>
            Font: <code>{pageFont || 'global (poppins)'}</code>
          </span>
          <span>
            Fondo: <code>{customBg || pageTheme || 'global (light)'}</code>
          </span>
        </div>
        <div className="cms-inspector-actions">
          <a
            href="/admin/globals/site-settings"
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            Tema Global ↗
          </a>
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

      {/* Cabecera según el tipo de plantilla (Legal vs Hero visual configurable por página) */}
      {template === 'legal' ? (
        <header className="legal-header">
          <span className="legal-eyebrow">Documento Legal</span>
          <h1>{page.heroHeading || page.title}</h1>
          {page.heroSubheading && <p className="legal-subtitle">{page.heroSubheading}</p>}
          <p className="legal-updated">Última actualización desde el CMS: {updatedDate}</p>
        </header>
      ) : (
        <PageHero page={page} />
      )}

      {/* Cuerpo de bloques dinámicos */}
      <div className={`page-body ${template === 'legal' ? 'page-body--narrow' : ''}`}>
        <RenderBlocks blocks={page.layout} payload={payload} />
      </div>
    </article>
  )
}
