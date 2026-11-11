import React from 'react'
import Link from 'next/link'
import { localizeHref, type LocaleCode } from '@/lib/i18n'

export type PillItem = {
  id?: string | null
  icon?: string | null
  label: string
  href?: string | null
}

export type PillsSectionProps = {
  title: string
  description?: string | null
  pills?: PillItem[] | null
  moreLabel?: string | null
  moreUrl?: string | null
  locale: LocaleCode
}

export function PillsSection({
  title,
  description,
  pills,
  moreLabel,
  moreUrl,
  locale,
}: PillsSectionProps) {
  if (!pills || pills.length === 0) {
    return null
  }

  return (
    <section className="cms-block cms-block--pills">
      <div className="pills-header">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>

      <div className="pills-list">
        {pills.map((pill, index) => {
          const content = (
            <>
              {pill.icon && (
                <span className="pill-icon" aria-hidden="true">
                  {pill.icon}
                </span>
              )}
              <span className="pill-label">{pill.label}</span>
            </>
          )

          if (pill.href) {
            return (
              <Link
                key={pill.id || index}
                href={localizeHref(pill.href, locale)}
                className="pill-item pill-item--link"
              >
                {content}
              </Link>
            )
          }

          return (
            <span key={pill.id || index} className="pill-item">
              {content}
            </span>
          )
        })}
      </div>

      {moreLabel && (
        <div className="pills-footer">
          <Link href={localizeHref(moreUrl || '#', locale)} className="pills-more-link">
            <span>{moreLabel}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}
