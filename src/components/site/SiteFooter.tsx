import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { DEFAULT_FOOTER, type ChromeLink, type FooterColumn } from '@/lib/siteChrome'
import type { LocaleCode } from '@/lib/i18n'
import { SunLogoFooter } from './SunLogos'
import { FacebookIcon, PaymentLogos, SupportClockIcon, XIcon } from './SunIcons'
import { SiteLink } from './SiteLink'

type Props = {
  settings: SiteSetting | null
  locale: LocaleCode
}

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'Twitter',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

export function SiteFooter({ settings, locale }: Props) {
  const f = settings?.footer
  const nav = settings?.navigation || []

  // Columnas: enlaces de navegación con ubicación "footer", agrupados por "footerColumn"
  const grouped = new Map<string, ChromeLink[]>()
  for (const n of nav) {
    if (n.location !== 'footer') continue
    const title = n.footerColumn?.trim() || 'Links'
    grouped.set(title, [...(grouped.get(title) || []), { label: n.label, url: n.url, newTab: n.newTab }])
  }
  const navColumns: FooterColumn[] = Array.from(grouped, ([title, links]) => ({ title, links }))

  // Columna Socials: viene de socialLinks
  const socials: ChromeLink[] = (settings?.socialLinks || []).map((s) => ({
    label: SOCIAL_LABELS[s.platform] || s.platform,
    url: s.url,
    newTab: true,
    icon: s.platform === 'facebook' || s.platform === 'x' ? s.platform : 'none',
  }))

  const defaultNavColumns = DEFAULT_FOOTER.columns.filter((c) => c.title !== 'Socials')
  const defaultSocials = DEFAULT_FOOTER.columns.find((c) => c.title === 'Socials')?.links || []
  const columns: FooterColumn[] = [
    ...(navColumns.length ? navColumns : defaultNavColumns),
    { title: 'Socials', links: socials.length ? socials : defaultSocials },
  ]

  const cmsLegal = nav.filter((n) => n.location === 'footerLegal')
  const legalLinks: ChromeLink[] = cmsLegal.length ? cmsLegal : DEFAULT_FOOTER.legalLinks
  const supportText = f?.supportText ?? DEFAULT_FOOTER.supportText
  const showPayments = f?.showPaymentLogos ?? DEFAULT_FOOTER.showPaymentLogos
  const copyright = (f?.copyright || DEFAULT_FOOTER.copyright).replace(
    '{year}',
    String(new Date().getFullYear()),
  )

  return (
    <footer className="st-footer">
      <section className="st-footer__wrapper st-footer__wrapper--top">
        <div className="st-footer__container-max">
          <div className="st-footer__container">
            <div className="st-footer__top">
              <SunLogoFooter />
              <div className="st-footer__links">
                {columns.map((col, i) => (
                  <div className="st-footer__links-section" key={col.title + i}>
                    <h3 className="st-footer__links-title">{col.title}</h3>
                    {(col.links || []).map((l, j) => (
                      <SiteLink
                        key={l.url + j}
                        href={l.url}
                        locale={locale}
                        newTab={l.newTab}
                        className={`st-footer__link${l.icon && l.icon !== 'none' ? ' st-footer__link--social' : ''}`}
                      >
                        {l.icon === 'facebook' && <FacebookIcon />}
                        {l.icon === 'x' && <XIcon />}
                        {l.label}
                      </SiteLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="st-footer__divider" />

            <div className="st-footer__payment-methods">
              {supportText && (
                <div className="st-footer__support">
                  <SupportClockIcon />
                  <span>{supportText}</span>
                </div>
              )}
              {showPayments && (
                <div className="st-footer__payment-logos">
                  <PaymentLogos />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="st-footer__wrapper st-footer__wrapper--bottom">
        <div className="st-footer__container-max">
          <div className="st-footer__copyright">
            <p className="st-footer__copyright-text">{copyright}</p>
            <div className="st-footer__copyright-links">
              {legalLinks.map((l, i) => (
                <SiteLink key={l.url + i} href={l.url} locale={locale} newTab={l.newTab} className="st-footer__link">
                  {l.label}
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
