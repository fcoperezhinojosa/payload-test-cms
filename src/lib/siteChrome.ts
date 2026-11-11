/**
 * Valores por defecto del Header y Footer (réplica de suntransfers.com).
 * Se usan como `defaultValue` en el global Site Settings y como fallback en el frontend.
 */
import type { LocaleCode } from './i18n'

export type ChromeLink = { label: string; url: string; newTab?: boolean | null; icon?: 'none' | 'facebook' | 'x' }
export type FooterColumn = { title: string; links: ChromeLink[] }

const SUN = 'https://www.suntransfers.com'

export const DEFAULT_HEADER = {
  links: [
    { label: 'Agencies', url: `${SUN}/agencies`, newTab: false },
    { label: 'Help Centre', url: `${SUN}/help`, newTab: false },
  ] as ChromeLink[],
  showLanguageCurrency: true,
  languageLabel: 'English',
  currencyLabel: '€ EUR',
  showCta: true,
  ctaLabel: 'My booking',
  ctaUrl: `${SUN}/customer/login`,
}

export const DEFAULT_FOOTER = {
  columns: [
    {
      title: 'Support',
      links: [
        { label: 'Manage your Booking', url: `${SUN}/customer/login` },
        { label: 'Help Centre', url: `${SUN}/help` },
        { label: 'EU Entry/Exit System (EES) Delays', url: `${SUN}/eu-entry-exit-system-ees-airport-delays` },
      ],
    },
    {
      title: 'Partners',
      links: [
        { label: 'Agency System', url: `${SUN}/agencies` },
        { label: 'Affiliate program', url: `${SUN}/affiliate-program` },
      ],
    },
    {
      title: 'Suntransfers',
      links: [
        { label: 'About Us', url: '/about-us' },
        { label: 'Reviews', url: '/reviews' },
        { label: 'Ski transfers', url: `${SUN}/ski-transfers` },
      ],
    },
    {
      title: 'Socials',
      links: [
        { label: 'Facebook', url: 'https://www.facebook.com/suntransfers', newTab: true, icon: 'facebook' },
        { label: 'Twitter', url: 'https://x.com/suntransfers', newTab: true, icon: 'x' },
      ],
    },
  ] as FooterColumn[],
  supportText: 'Support available 24/7',
  showPaymentLogos: true,
  copyright: '© Suntransfers.com {year}',
  legalLinks: [
    { label: 'Terms and Conditions', url: '/terms-and-conditions' },
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Cookies Policy', url: '/cookies-policy' },
    { label: 'Accessibility Statement', url: '/accessibility-statement' },
  ] as ChromeLink[],
}

type LocalizedFooterLabels = {
  linksColumn: string
  socialsColumn: string
  terms: string
  privacy: string
  cookies: string
  accessibility: string
}

const FOOTER_LABELS_BY_LOCALE: Record<LocaleCode, LocalizedFooterLabels> = {
  en: {
    linksColumn: 'Links',
    socialsColumn: 'Socials',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    cookies: 'Cookies Policy',
    accessibility: 'Accessibility Statement',
  },
  de: {
    linksColumn: 'Links',
    socialsColumn: 'Soziale Netzwerke',
    terms: 'Allgemeine Geschäftsbedingungen',
    privacy: 'Datenschutzerklärung',
    cookies: 'Cookie-Richtlinie',
    accessibility: 'Erklärung zur Barrierefreiheit',
  },
  it: {
    linksColumn: 'Link',
    socialsColumn: 'Social',
    terms: 'Termini e Condizioni',
    privacy: 'Informativa sulla Privacy',
    cookies: 'Informativa sui Cookie',
    accessibility: 'Dichiarazione di Accessibilità',
  },
  es: {
    linksColumn: 'Enlaces',
    socialsColumn: 'Redes sociales',
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad',
    cookies: 'Política de Cookies',
    accessibility: 'Declaración de Accesibilidad',
  },
  fr: {
    linksColumn: 'Liens',
    socialsColumn: 'Réseaux sociaux',
    terms: 'Conditions Générales',
    privacy: 'Politique de Confidentialité',
    cookies: 'Politique de Cookies',
    accessibility: "Déclaration d'Accessibilité",
  },
  nl: {
    linksColumn: 'Links',
    socialsColumn: 'Socials',
    terms: 'Algemene Voorwaarden',
    privacy: 'Privacybeleid',
    cookies: 'Cookiebeleid',
    accessibility: 'Toegankelijkheidsverklaring',
  },
  pl: {
    linksColumn: 'Linki',
    socialsColumn: 'Media społecznościowe',
    terms: 'Regulamin',
    privacy: 'Polityka Prywatności',
    cookies: 'Polityka Plików Cookie',
    accessibility: 'Deklaracja Dostępności',
  },
  sv: {
    linksColumn: 'Länkar',
    socialsColumn: 'Sociala medier',
    terms: 'Allmänna Villkor',
    privacy: 'Integritetspolicy',
    cookies: 'Cookiepolicy',
    accessibility: 'Tillgänglighetsredogörelse',
  },
  fi: {
    linksColumn: 'Linkit',
    socialsColumn: 'Sosiaalinen media',
    terms: 'Käyttöehdot',
    privacy: 'Tietosuojaseloste',
    cookies: 'Evästekäytäntö',
    accessibility: 'Saavutettavuusseloste',
  },
  no: {
    linksColumn: 'Lenker',
    socialsColumn: 'Sosiale medier',
    terms: 'Vilkår og Betingelser',
    privacy: 'Personvernerklæring',
    cookies: 'Retningslinjer for Informasjonskapsler',
    accessibility: 'Tilgjengelighetserklæring',
  },
  hu: {
    linksColumn: 'Linkek',
    socialsColumn: 'Közösségi média',
    terms: 'Általános Szerződési Feltételek',
    privacy: 'Adatvédelmi Irányelvek',
    cookies: 'Cookie-szabályzat',
    accessibility: 'Akadálymentesítési Nyilatkozat',
  },
}

export function getLocalizedFooterChrome(locale: LocaleCode): {
  linksColumn: string
  socialsColumn: string
  legalLinks: ChromeLink[]
} {
  const l = FOOTER_LABELS_BY_LOCALE[locale] || FOOTER_LABELS_BY_LOCALE.en
  return {
    linksColumn: l.linksColumn,
    socialsColumn: l.socialsColumn,
    legalLinks: [
      { label: l.terms, url: '/terms-and-conditions' },
      { label: l.privacy, url: '/privacy-policy' },
      { label: l.cookies, url: '/cookies-policy' },
      { label: l.accessibility, url: '/accessibility-statement' },
    ],
  }
}
