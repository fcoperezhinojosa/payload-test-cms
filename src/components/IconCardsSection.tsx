import React from 'react'
import type { Media } from '@/payload-types'

export type IconCardType = 'piggyBank' | 'calendar' | 'headset' | 'shield' | 'car' | 'custom'

export type IconCardItem = {
  id?: string | null
  iconType?: IconCardType | null
  customIcon?: string | null
  iconImage?: (number | null) | Media
  title: string
  description: string
}

export type IconCardsSectionProps = {
  title: string
  cards?: IconCardItem[] | null
}

function renderPresetIcon(iconType: IconCardType) {
  switch (iconType) {
    case 'piggyBank':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          {/* Piggy body */}
          <path
            d="M19.5 11.5C21.9853 11.5 24 13.5147 24 16C24 17.64 23.12 19.075 21.81 19.86L21.5 22.5H19L18.7 20.5H12.3L12 22.5H9.5L9.19 19.86C7.6 18.92 6.5 17.22 6.5 15.25C6.5 12.63 8.63 10.5 11.25 10.5H11.5L13 8.5L14.5 10.5H18.5"
            fill="#1a8cff"
          />
          {/* Snout */}
          <rect x="4.5" y="14" width="3" height="3.5" rx="1" fill="#1a8cff" />
          {/* Eye */}
          <circle cx="9.5" cy="14" r="1" fill="#ffffff" />
          {/* Gold coin */}
          <circle cx="19" cy="8.5" r="4.2" fill="#facc15" />
          <path
            d="M19 6.5V10.5M17.8 7.8H19.7C20.2 7.8 20.2 8.6 19.7 8.6H18.3C17.8 8.6 17.8 9.4 18.3 9.4H20.2"
            stroke="#92400e"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'calendar':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          {/* Calendar header */}
          <path
            d="M5 9.5C5 7.84315 6.34315 6.5 8 6.5H19C20.6569 6.5 22 7.84315 22 9.5V11.5H5V9.5Z"
            fill="#1a8cff"
          />
          {/* Calendar rings */}
          <rect x="9" y="4.5" width="2.2" height="4" rx="1.1" fill="#1a8cff" />
          <rect x="15.8" y="4.5" width="2.2" height="4" rx="1.1" fill="#1a8cff" />
          {/* Calendar body */}
          <path
            d="M5 11.5H22V18.5C22 20.1569 20.6569 21.5 19 21.5H8C6.34315 21.5 5 20.1569 5 18.5V11.5Z"
            fill="#93c5fd"
            fillOpacity="0.45"
          />
          {/* Gold location/clock badge */}
          <circle cx="19.5" cy="18.5" r="4.5" fill="#facc15" />
          <circle cx="19.5" cy="18.5" r="1.5" fill="#ffffff" />
        </svg>
      )

    case 'headset':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          {/* Headband */}
          <path
            d="M7 15V13.5C7 9.63401 10.134 6.5 14 6.5C17.866 6.5 21 9.63401 21 13.5V15"
            stroke="#1a8cff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Ear cups */}
          <rect x="5" y="13.5" width="3.8" height="6.5" rx="1.9" fill="#1a8cff" />
          <rect x="19.2" y="13.5" width="3.8" height="6.5" rx="1.9" fill="#1a8cff" />
          {/* Gold mic boom */}
          <path
            d="M21 19.5C21 21.2 19.2 22.5 16.5 22.5H14.5"
            stroke="#facc15"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="12" y="21.2" width="4" height="2.6" rx="1.3" fill="#facc15" />
        </svg>
      )

    case 'shield':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 4.5L22 8V14.2C22 18.9 18.6 22.8 14 24C9.4 22.8 6 18.9 6 14.2V8L14 4.5Z"
            fill="#1a8cff"
          />
          <path
            d="M11 14.2L13.2 16.4L17.5 12"
            stroke="#facc15"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'car':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M7.5 11L9.2 7.5H18.8L20.5 11H22.5C23.3 11 24 11.7 24 12.5V18.5H21.5V20.5H19V18.5H9V20.5H6.5V18.5H4V12.5C4 11.7 4.7 11 5.5 11H7.5Z"
            fill="#1a8cff"
          />
          <circle cx="8.5" cy="15" r="1.6" fill="#facc15" />
          <circle cx="19.5" cy="15" r="1.6" fill="#facc15" />
        </svg>
      )

    default:
      return null
  }
}

export function IconCardsSection({ title, cards }: IconCardsSectionProps) {
  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <section className="cms-block cms-block--icon-cards">
      {title && (
        <div className="icon-cards-header">
          <h2>{title}</h2>
        </div>
      )}

      <div className="icon-cards-grid">
        {cards.map((card, index) => {
          const mediaObj =
            typeof card.iconImage === 'object' && card.iconImage !== null
              ? (card.iconImage as Media)
              : null
          const iconType = card.iconType || 'piggyBank'

          return (
            <article key={card.id || index} className="icon-card">
              <div className="icon-card-badge">
                {mediaObj?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mediaObj.url} alt={mediaObj.alt || card.title} />
                ) : card.customIcon ? (
                  <span className="icon-card-emoji" aria-hidden="true">
                    {card.customIcon}
                  </span>
                ) : (
                  renderPresetIcon(iconType)
                )}
              </div>
              <h3 className="icon-card-title">{card.title}</h3>
              <p className="icon-card-description">{card.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
