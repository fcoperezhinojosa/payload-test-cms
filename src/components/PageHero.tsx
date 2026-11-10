import React from 'react'
import type { Media, Page } from '@/payload-types'

type Props = {
  page: Page
}

function renderOverlayUspIcon(icon?: string | null) {
  switch (icon) {
    case 'plane':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      )
    case 'card':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      )
    case 'support':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      )
    case 'check':
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
  }
}

function renderBottomUspIcon(icon?: string | null) {
  switch (icon) {
    case 'users':
      return (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="11" cy="10" r="3.5" fill="#1a8cff" />
          <path d="M5 20.5C5 17.5 7.7 15.5 11 15.5C14.3 15.5 17 17.5 17 20.5" fill="#1a8cff" />
          <circle cx="19" cy="11" r="3" fill="#facc15" />
          <path d="M15.5 20.5C15.8 18.2 17.5 16.7 19.8 16.7C22 16.7 23.5 18.2 23.5 20.5" fill="#facc15" />
        </svg>
      )
    case 'globe':
      return (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="13.5" cy="14" r="8" fill="#1a8cff" />
          <path d="M8 11.5C10.2 10 13 12 15.5 10.5C17 9.5 18.5 11 19 13C17.5 15 15 16 12.5 15.5C10 15 8.5 16.5 8 18" stroke="#93c5fd" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="19.5" cy="18.5" r="3.5" fill="#facc15" />
        </svg>
      )
    case 'badge':
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="8.5" fill="#1a8cff" />
          <path d="M14 9.5L15.3 12.2L18.2 12.6L16.1 14.6L16.6 17.5L14 16.1L11.4 17.5L11.9 14.6L9.8 12.6L12.7 12.2L14 9.5Z" fill="#facc15" />
        </svg>
      )
  }
}

export function PageHero({ page }: Props) {
  const heroType = page.heroType || 'imageOverlayUsp'

  if (heroType === 'none') {
    return null
  }

  const heroImage =
    typeof page.heroImage === 'object' && page.heroImage !== null
      ? (page.heroImage as Media)
      : null
  const resolvedImageUrl =
    heroImage?.url || page.heroImageUrl || '/suntransfers-hero.jpg'

  const overlayUsps = page.heroOverlayUsps || []
  const bottomUsps = page.heroBottomUsps || []

  if (heroType === 'imageOverlayUsp') {
    return (
      <section className="hero-banner-wrapper">
        <div
          className="hero-banner"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 25, 48, 0.35) 0%, rgba(7, 25, 48, 0.52) 100%), url("${resolvedImageUrl}")`,
          }}
        >
          <div className="hero-banner-inner">
            <h1 className="hero-banner-title">
              {page.heroHeading || page.title}
            </h1>
            {page.heroSubheading && (
              <p className="hero-banner-subtitle">{page.heroSubheading}</p>
            )}

            {overlayUsps.length > 0 && (
              <ul className="hero-overlay-usps">
                {overlayUsps.map((usp, idx) => (
                  <li key={usp.id || idx} className="hero-overlay-usp-item">
                    {renderOverlayUspIcon(usp.icon)}
                    <span>{usp.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {bottomUsps.length > 0 && (
          <div className="hero-bottom-usps-bar">
            <div className="hero-bottom-usps-inner">
              {bottomUsps.map((usp, idx) => (
                <div key={usp.id || idx} className="hero-bottom-usp-item">
                  <span className="hero-bottom-usp-icon">
                    {renderBottomUspIcon(usp.icon)}
                  </span>
                  <span className="hero-bottom-usp-text">
                    <strong>{usp.highlight}</strong> {usp.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <header className={`hero hero--${heroType}`}>
      <div className="hero-inner">
        <span className="hero-eyebrow">
          {page.template === 'landing' ? 'Landing Page · CMS' : page.title}
        </span>
        <h1>{page.heroHeading || page.title}</h1>
        {page.heroSubheading && <p className="hero-subheading">{page.heroSubheading}</p>}
        {(heroImage?.url || page.heroImageUrl) && (
          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage?.url || page.heroImageUrl || ''}
              alt={heroImage?.alt || page.title}
            />
          </div>
        )}
      </div>

      {bottomUsps.length > 0 && (
        <div className="hero-bottom-usps-bar hero-bottom-usps-bar--embedded">
          <div className="hero-bottom-usps-inner">
            {bottomUsps.map((usp, idx) => (
              <div key={usp.id || idx} className="hero-bottom-usp-item">
                <span className="hero-bottom-usp-icon">
                  {renderBottomUspIcon(usp.icon)}
                </span>
                <span className="hero-bottom-usp-text">
                  <strong>{usp.highlight}</strong> {usp.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
