import React from 'react'
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { getLocaleMeta, type LocaleCode } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'
import { PageHero } from './PageHero'
import { RenderBlocks } from './RenderBlocks'

type Props = {
  page: Page
  payload: Payload
  locale: LocaleCode
  dict: Dictionary
}

export async function PageTemplate({ page, payload, locale, dict }: Props) {
  const template = page.template || 'default'
  const pageFont = page.pageFont && page.pageFont !== 'inherit' ? page.pageFont : undefined
  const pageTheme = page.pageTheme && page.pageTheme !== 'inherit' ? page.pageTheme : undefined
  const customBg = page.customBackgroundColor?.trim() || ''
  const localeMeta = getLocaleMeta(locale)

  const updatedDate = new Date(page.updatedAt).toLocaleDateString(localeMeta.dateLocale, {
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
          <span className="cms-pill cms-pill--mode">{dict.inspector.cmsPage}</span>
          <span>
            {dict.inspector.slug}: <code>{page.slug}</code>
          </span>
          <span>
            {dict.inspector.template}: <code>{template}</code>
          </span>
          <span>
            {dict.inspector.font}: <code>{pageFont || 'global (poppins)'}</code>
          </span>
          <span>
            {dict.inspector.background}: <code>{customBg || pageTheme || 'global (light)'}</code>
          </span>
        </div>
        <div className="cms-inspector-actions">
          <a
            href="/admin/globals/site-settings"
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            {dict.inspector.globalTheme} ↗
          </a>
          <a
            href={`/admin/collections/pages/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link"
          >
            {dict.inspector.editInAdmin} ↗
          </a>
          <a
            href={`/api/pages/${page.id}?locale=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cms-action-link cms-action-link--secondary"
          >
            {dict.inspector.viewJson} ↗
          </a>
        </div>
      </div>

      {/* Cabecera según el tipo de plantilla (Legal vs Hero visual configurable por página) */}
      {template === 'legal' ? (
        <header className="legal-header">
          <span className="legal-eyebrow">{dict.inspector.legalDocument}</span>
          <h1>{page.heroHeading || page.title}</h1>
          {page.heroSubheading && <p className="legal-subtitle">{page.heroSubheading}</p>}
          <p className="legal-updated">
            {dict.inspector.lastUpdated} {updatedDate}
          </p>
        </header>
      ) : (
        <PageHero page={page} dict={dict} />
      )}

      {/* Cuerpo de bloques dinámicos */}
      <div className={`page-body ${template === 'legal' ? 'page-body--narrow' : ''}`}>
        <RenderBlocks blocks={page.layout} payload={payload} locale={locale} dict={dict} />
      </div>
    </article>
  )
}
