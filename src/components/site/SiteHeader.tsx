import React, { Suspense } from 'react'
import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'
import { DEFAULT_HEADER } from '@/lib/siteChrome'
import { getLocaleMeta, type LocaleCode } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'
import { SunLogoHeader } from './SunLogos'
import { ChevronDownIcon, LocaleFlagIcon } from './SunIcons'
import { SiteLink } from './SiteLink'
import { LanguageSwitcher } from './LanguageSwitcher'

type Props = {
  settings: SiteSetting | null
  locale: LocaleCode
  dict: Dictionary
}

export function SiteHeader({ settings, locale, dict }: Props) {
  const h = settings?.header
  const cmsLinks = (settings?.navigation || []).filter((n) => (n.location || 'header') === 'header')
  const links = cmsLinks.length ? cmsLinks : DEFAULT_HEADER.links
  const showLangCurrency = h?.showLanguageCurrency ?? DEFAULT_HEADER.showLanguageCurrency
  const currencyLabel = h?.currencyLabel || DEFAULT_HEADER.currencyLabel
  const showCta = h?.showCta ?? DEFAULT_HEADER.showCta
  const ctaLabel = h?.ctaLabel || DEFAULT_HEADER.ctaLabel
  const ctaUrl = h?.ctaUrl || DEFAULT_HEADER.ctaUrl
  const activeLocaleMeta = getLocaleMeta(locale)

  return (
    <header className="st-header">
      <div className="st-header__logo">
        <Link className="st-logo-link" href={`/${locale}`} title={settings?.siteName || 'Suntransfers.com'}>
          <SunLogoHeader />
        </Link>
      </div>

      <div className="st-header__menu">
        <nav className="st-header__links" aria-label={dict.common.mainNavigation}>
          {links.map((l, i) => (
            <SiteLink
              key={('id' in l && l.id) || i}
              href={l.url}
              locale={locale}
              newTab={l.newTab}
              className="st-header__link"
            >
              {l.label}
            </SiteLink>
          ))}
        </nav>

        {showLangCurrency && (
          <div className="st-header__dropdowns">
            <Suspense
              fallback={
                <span className="st-settings">
                  <LocaleFlagIcon locale={locale} />
                  <span>{activeLocaleMeta.label}</span>
                  <ChevronDownIcon />
                </span>
              }
            >
              <LanguageSwitcher locale={locale} ariaLabel={dict.common.selectLanguage} />
            </Suspense>
            <span className="st-settings">
              <span>{currencyLabel}</span>
              <ChevronDownIcon />
            </span>
          </div>
        )}
      </div>

      {showCta && (
        <div className="st-header__button">
          <SiteLink href={ctaUrl} locale={locale} className="st-button-mybooking">
            {ctaLabel}
          </SiteLink>
        </div>
      )}
    </header>
  )
}
