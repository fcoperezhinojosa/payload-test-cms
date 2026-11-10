import React from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export type DestinationCardItem = {
  id?: string | null
  title: string
  description: string
  image?: (number | null) | Media
  imageUrl?: string | null
  href?: string | null
}

export type DestinationCardsSectionProps = {
  title: string
  description?: string | null
  cards?: DestinationCardItem[] | null
  moreLabel?: string | null
  moreUrl?: string | null
}

export function DestinationCardsSection({
  title,
  description,
  cards,
  moreLabel,
  moreUrl,
}: DestinationCardsSectionProps) {
  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <section className="cms-block cms-block--destination-cards">
      <div className="destination-cards-header">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>

      <div className="destination-cards-grid">
        {cards.map((card, index) => {
          const mediaObj =
            typeof card.image === 'object' && card.image !== null
              ? (card.image as Media)
              : null
          const resolvedSrc = mediaObj?.url || card.imageUrl || null
          const resolvedAlt = mediaObj?.alt || card.title

          const cardInner = (
            <>
              <div className="destination-card-media">
                {resolvedSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolvedSrc} alt={resolvedAlt} loading="lazy" />
                ) : (
                  <div className="destination-card-placeholder">Sin imagen</div>
                )}
              </div>
              <div className="destination-card-body">
                <h3 className="destination-card-title">{card.title}</h3>
                <p className="destination-card-description">{card.description}</p>
              </div>
            </>
          )

          if (card.href) {
            return (
              <Link
                key={card.id || index}
                href={card.href}
                className="destination-card destination-card--link"
              >
                {cardInner}
              </Link>
            )
          }

          return (
            <article key={card.id || index} className="destination-card">
              {cardInner}
            </article>
          )
        })}
      </div>

      {moreLabel && (
        <div className="destination-cards-footer">
          <Link href={moreUrl || '#'} className="destination-more-btn">
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}
