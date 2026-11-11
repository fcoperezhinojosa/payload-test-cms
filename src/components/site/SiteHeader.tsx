import React from 'react'
import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'
import { DEFAULT_HEADER } from '@/lib/siteChrome'
import { SunLogoHeader } from './SunLogos'
import { ChevronDownIcon, FlagEnIcon } from './SunIcons'
import { SiteLink } from './SiteLink'

type Props = { settings: SiteSetting | null }

export function SiteHeader({ settings }: Props) {
  const h = settings?.header
  const cmsLinks = (settings?.navigation || []).filter((n) => (n.location || 'header') === 'header')
  const links = cmsLinks.length ? cmsLinks : DEFAULT_HEADER.links
  const showLangCurrency = h?.showLanguageCurrency ?? DEFAULT_HEADER.showLanguageCurrency
  const languageLabel = h?.languageLabel || DEFAULT_HEADER.languageLabel
  const currencyLabel = h?.currencyLabel || DEFAULT_HEADER.currencyLabel
  const showCta = h?.showCta ?? DEFAULT_HEADER.showCta
  const ctaLabel = h?.ctaLabel || DEFAULT_HEADER.ctaLabel
  const ctaUrl = h?.ctaUrl || DEFAULT_HEADER.ctaUrl

  return (
    <header className="st-header">
      <div className="st-header__logo">
        <Link className="st-logo-link" href="/" title={settings?.siteName || 'Suntransfers.com'}>
          <SunLogoHeader />
        </Link>
      </div>

      <div className="st-header__menu">
        <nav className="st-header__links" aria-label="Navegación principal">
          {links.map((l, i) => (
            <SiteLink key={('id' in l && l.id) || i} href={l.url} newTab={l.newTab} className="st-header__link">
              {l.label}
            </SiteLink>
          ))}
        </nav>

        {showLangCurrency && (
          <div className="st-header__dropdowns">
            <span className="st-settings">
              <FlagEnIcon />
              <span>{languageLabel}</span>
              <ChevronDownIcon />
            </span>
            <span className="st-settings">
              <span>{currencyLabel}</span>
              <ChevronDownIcon />
            </span>
          </div>
        )}
      </div>

      {showCta && (
        <div className="st-header__button">
          <SiteLink href={ctaUrl} className="st-button-mybooking">
            {ctaLabel}
          </SiteLink>
        </div>
      )}
    </header>
  )
}
