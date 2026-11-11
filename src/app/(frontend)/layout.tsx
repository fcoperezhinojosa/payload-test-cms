import React from 'react'
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
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import './styles.css'

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
  description: 'Sitio web híbrido con Payload 3.0 y Next.js (CMS de páginas + Headless).',
  title: 'Payload CMS · Páginas y Templates',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

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
    <html lang="es" className={fontClasses}>
      <body data-theme={globalTheme} data-font={globalFont} style={bodyStyle}>
        <SiteHeader settings={siteSettings} />

        <main className="site-main">{children}</main>

        <SiteFooter settings={siteSettings} />
      </body>
    </html>
  )
}
