'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  getLocaleMeta,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  switchLocalePath,
  type LocaleCode,
} from '@/lib/i18n'
import { ChevronDownIcon, LocaleFlagIcon } from './SunIcons'

type Props = {
  locale: LocaleCode
  ariaLabel: string
}

export function LanguageSwitcher({ locale, ariaLabel }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeMeta = getLocaleMeta(locale)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleSelect = (targetLocale: LocaleCode) => {
    setOpen(false)
    document.cookie = `${LOCALE_COOKIE_NAME}=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`

    if (targetLocale === locale) return

    const nextPath = switchLocalePath(pathname, targetLocale)
    const query = searchParams?.toString()
    router.push(query ? `${nextPath}?${query}` : nextPath)
  }

  return (
    <div className="st-lang-switcher" ref={containerRef}>
      <button
        type="button"
        className="st-settings st-lang-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <LocaleFlagIcon locale={locale} />
        <span>{activeMeta.label}</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <ul className="st-lang-dropdown" role="listbox" aria-label={ariaLabel}>
          {SUPPORTED_LOCALES.map((item) => {
            const isActive = item.code === locale
            return (
              <li key={item.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`st-lang-option${isActive ? ' st-lang-option--active' : ''}`}
                  onClick={() => handleSelect(item.code)}
                >
                  <LocaleFlagIcon locale={item.code} />
                  <span className="st-lang-option__label">{item.label}</span>
                  <span className="st-lang-option__code">{item.code.toUpperCase()}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
