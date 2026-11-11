import React from 'react'
import { notFound } from 'next/navigation'
import {
  Inter,
  Montserrat,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
} from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ensureSeedData } from '@/lib/ensureSeedData'
import { isValidLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import '../styles.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  description: 'Hybrid website with Payload 3.0 and Next.js (CMS Pages + Headless).',
  title: 'Payload CMS · Pages & Templates',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleRootLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)

  const siteSettings = await payload
    .findGlobal({ slug: 'site-settings', locale })
    .catch(() => null)
  const dict = getDictionary(locale)

  const globalFont = siteSettings?.fontFamily || 'poppins'
  const globalTheme = siteSettings?.backgroundTheme || 'light'
  const customBg = siteSettings?.customBackgroundColor?.trim() || ''

  const fontClasses = [
    poppins.variable,
    inter.variable,
    jakarta.variable,
    montserrat.variable,
    playfair.variable,
  ].join(' ')

  const bodyStyle = customBg
    ? ({ '--bg': customBg, backgroundColor: customBg } as React.CSSProperties)
    : undefined

  return (
    <html lang={locale} className={fontClasses}>
      <body data-theme={globalTheme} data-font={globalFont} style={bodyStyle}>
        <SiteHeader settings={siteSettings} locale={locale} dict={dict} />

        <main className="site-main">{children}</main>

        <SiteFooter settings={siteSettings} locale={locale} />
      </body>
    </html>
  )
}
