import React from 'react'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Payload } from 'payload'
import type { Exhibition, Media, Page, Review } from '@/payload-types'
import { ImageCardsSection } from './ImageCardsSection'
import { PillsSection } from './PillsSection'

type Props = {
  blocks: Page['layout']
  payload: Payload
}

export async function RenderBlocks({ blocks, payload }: Props) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="cms-blocks">
      {await Promise.all(
        blocks.map(async (block, index) => {
          const key = block.id || `block-${index}`

          switch (block.blockType) {
            case 'imageCards': {
              return (
                <ImageCardsSection
                  key={key}
                  heading={block.heading}
                  cards={block.cards}
                />
              )
            }

            case 'pillsSection': {
              return (
                <PillsSection
                  key={key}
                  title={block.title}
                  description={block.description}
                  pills={block.pills}
                  moreLabel={block.moreLabel}
                  moreUrl={block.moreUrl}
                />
              )
            }

            case 'content': {
              return (
                <section key={key} className="cms-block cms-block--content">
                  <div className="rich-text">
                    <RichText data={block.richText} />
                  </div>
                </section>
              )
            }

            case 'features': {
              return (
                <section key={key} className="cms-block cms-block--features">
                  {(block.heading || block.subheading) && (
                    <div className="block-header">
                      {block.heading && <h2>{block.heading}</h2>}
                      {block.subheading && <p>{block.subheading}</p>}
                    </div>
                  )}
                  <div className="features-grid">
                    {block.items?.map((item, idx) => (
                      <div key={item.id || idx} className="feature-card">
                        {item.badge && <span className="feature-badge">{item.badge}</span>}
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            case 'reviewsBlock': {
              let reviewsList: Review[] = []

              if (block.showAllFeatured || !block.selectedReviews?.length) {
                const res = await payload.find({
                  collection: 'reviews',
                  where: {
                    featured: {
                      equals: true,
                    },
                  },
                  limit: 12,
                  sort: '-createdAt',
                })
                reviewsList = res.docs
              } else {
                reviewsList = (block.selectedReviews || []).filter(
                  (r): r is Review => typeof r === 'object' && r !== null,
                )
              }

              return (
                <section key={key} className="cms-block cms-block--reviews">
                  <div className="block-header">
                    {block.heading && <h2>{block.heading}</h2>}
                    {block.subheading && <p>{block.subheading}</p>}
                  </div>
                  {reviewsList.length === 0 ? (
                    <p className="empty-state">
                      Aún no hay reviews publicadas. Añádelas desde <code>/admin/collections/reviews</code>.
                    </p>
                  ) : (
                    <div className="reviews-grid">
                      {reviewsList.map((review) => (
                        <article key={review.id} className="review-card">
                          <div className="review-stars" aria-label={`${review.rating} de 5 estrellas`}>
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(Math.max(0, 5 - review.rating))}
                          </div>
                          <p className="review-comment">&ldquo;{review.comment}&rdquo;</p>
                          <div className="review-author">
                            <strong>{review.author}</strong>
                            {review.role && <span>{review.role}</span>}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              )
            }

            case 'mediaBlock': {
              const media =
                typeof block.media === 'object' && block.media !== null
                  ? (block.media as Media)
                  : null

              return (
                <section key={key} className="cms-block cms-block--media">
                  {media?.url && (
                    <figure className="media-figure">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={media.url} alt={media.alt || block.caption || ''} />
                      {block.caption && <figcaption>{block.caption}</figcaption>}
                    </figure>
                  )}
                </section>
              )
            }

            case 'cta': {
              return (
                <section key={key} className="cms-block cms-block--cta">
                  <div className="cta-box">
                    <div className="cta-text">
                      <h2>{block.heading}</h2>
                      {block.text && <p>{block.text}</p>}
                    </div>
                    <Link href={block.buttonUrl} className="btn-primary">
                      {block.buttonLabel}
                    </Link>
                  </div>
                </section>
              )
            }

            case 'featuredExhibitions': {
              const exhibitions = (block.exhibitions || []).filter(
                (ex): ex is Exhibition => typeof ex === 'object' && ex !== null,
              )

              return (
                <section key={key} className="cms-block cms-block--exhibitions">
                  {block.heading && (
                    <div className="block-header">
                      <h2>{block.heading}</h2>
                    </div>
                  )}
                  <div className="features-grid">
                    {exhibitions.map((ex) => (
                      <div key={ex.id} className="feature-card">
                        <span className="feature-badge">{ex.status.toUpperCase()}</span>
                        <h3>{ex.title}</h3>
                        {ex.summary && <p>{ex.summary}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )
            }

            default:
              return null
          }
        }),
      )}
    </div>
  )
}
