'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export type FaqItem = {
  id?: string | null
  question: string
  answer: string
}

export type FaqSectionProps = {
  title: string
  description?: string | null
  items?: FaqItem[] | null
  footerText?: string | null
  footerLinkLabel?: string | null
  footerLinkUrl?: string | null
}

export function FaqSection({
  title,
  description,
  items,
  footerText,
  footerLinkLabel,
  footerLinkUrl,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items || items.length === 0) {
    return null
  }

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="cms-block cms-block--faq">
      <div className="faq-layout">
        <div className="faq-sidebar">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>

        <div className="faq-content">
          <div className="faq-accordion">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={item.id || idx}
                  className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <svg
                      className={`faq-chevron ${isOpen ? 'faq-chevron--open' : ''}`}
                      width="16"
                      height="16"
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
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {(footerText || footerLinkLabel) && (
            <p className="faq-footer">
              {footerText && <span>{footerText} </span>}
              {footerLinkLabel && (
                <Link href={footerLinkUrl || '#'} className="faq-footer-link">
                  {footerLinkLabel}
                </Link>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
