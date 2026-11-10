import React from 'react'
import type { Media } from '@/payload-types'

export type ImageCardItem = {
  id?: string | null
  title: string
  description: string
  image?: (number | null) | Media
  imageUrl?: string | null
}

export type ImageCardsSectionProps = {
  heading: string
  cards?: ImageCardItem[] | null
}

export function ImageCardsSection({ heading, cards }: ImageCardsSectionProps) {
  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <section className="cms-block cms-block--image-cards">
      {heading && (
        <div className="image-cards-header">
          <h2>{heading}</h2>
        </div>
      )}

      <div className="image-cards-grid">
        {cards.map((card, index) => {
          const mediaObj =
            typeof card.image === 'object' && card.image !== null
              ? (card.image as Media)
              : null
          const resolvedSrc = mediaObj?.url || card.imageUrl || null
          const resolvedAlt = mediaObj?.alt || card.title

          return (
            <article key={card.id || index} className="image-card">
              <div className="image-card-media">
                {resolvedSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resolvedSrc} alt={resolvedAlt} loading="lazy" />
                ) : (
                  <div className="image-card-placeholder">Sin imagen</div>
                )}
              </div>
              <h3 className="image-card-title">{card.title}</h3>
              <p className="image-card-description">{card.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
