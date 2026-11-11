'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { localizeHref, type LocaleCode } from '@/lib/i18n'

export type NewsletterSectionProps = {
  title: string
  description?: string | null
  inputPlaceholder?: string | null
  buttonLabel: string
  disclaimerText?: string | null
  termsLabel?: string | null
  termsUrl?: string | null
  image?: (number | null) | Media
  imageUrl?: string | null
  locale: LocaleCode
  labels: {
    noImage: string
    emailPlaceholder: string
    subscribeLabel: string
    successPrefix: string
  }
}

export function NewsletterSection({
  title,
  description,
  inputPlaceholder,
  buttonLabel,
  disclaimerText,
  termsLabel,
  termsUrl,
  image,
  imageUrl,
  locale,
  labels,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const mediaObj =
    typeof image === 'object' && image !== null ? (image as Media) : null
  const resolvedSrc = mediaObj?.url || imageUrl || null
  const resolvedAlt = mediaObj?.alt || title

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="cms-block cms-block--newsletter">
      <div className="newsletter-box">
        <div className="newsletter-content">
          {title && <h2>{title}</h2>}
          {description && <p className="newsletter-description">{description}</p>}

          {submitted ? (
            <div className="newsletter-success">
              ✓ {labels.successPrefix} <strong>{email}</strong>!
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder || labels.emailPlaceholder}
                aria-label={inputPlaceholder || labels.emailPlaceholder}
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                {buttonLabel || labels.subscribeLabel}
              </button>
            </form>
          )}

          {(disclaimerText || termsLabel) && (
            <p className="newsletter-disclaimer">
              {disclaimerText && <span>{disclaimerText} </span>}
              {termsLabel && (
                <Link
                  href={localizeHref(termsUrl || '/terms-and-conditions', locale)}
                  className="newsletter-terms-link"
                >
                  {termsLabel}
                </Link>
              )}
            </p>
          )}
        </div>

        <div className="newsletter-media">
          {resolvedSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolvedSrc} alt={resolvedAlt} loading="lazy" />
          ) : (
            <div className="newsletter-media-placeholder">{labels.noImage}</div>
          )}
        </div>
      </div>
    </section>
  )
}
