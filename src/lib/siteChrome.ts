/**
 * Valores por defecto del Header y Footer (réplica de suntransfers.com).
 * Se usan como `defaultValue` en el global Site Settings y como fallback en el frontend.
 */
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
