import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ensureSeedData } from '@/lib/ensureSeedData'
import './styles.css'

export const metadata = {
  description: 'Sitio web híbrido con Payload 3.0 y Next.js (CMS de páginas + Headless).',
  title: 'Payload CMS · Páginas y Templates',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await ensureSeedData(payload)

  const [siteSettings, publishedPages] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload
      .find({
        collection: 'pages',
        sort: 'createdAt',
        limit: 20,
      })
      .catch(() => null),
  ])

  const siteName = siteSettings?.siteName || 'Payload Museum & CMS'
  const cmsPages = publishedPages?.docs || []

  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-brand">
              <span className="brand-dot" />
              <span>{siteName}</span>
            </Link>

            <nav className="site-nav" aria-label="Navegación principal">
              {cmsPages.length > 0 ? (
                cmsPages.map((p) => {
                  const href = p.slug === 'home' ? '/' : `/${p.slug}`
                  return (
                    <Link key={p.id} href={href} className="nav-link">
                      {p.title}
                    </Link>
                  )
                })
              ) : (
                <>
                  <Link href="/" className="nav-link">
                    Homepage
                  </Link>
                  <Link href="/about-us" className="nav-link">
                    About Us
                  </Link>
                  <Link href="/reviews" className="nav-link">
                    Reviews
                  </Link>
                  <Link href="/terms-and-conditions" className="nav-link">
                    Terms &amp; Conditions
                  </Link>
                </>
              )}
              <Link href="/headless-demo" className="nav-link nav-link--accent">
                Modo Headless (Template)
              </Link>
            </nav>

            <div className="site-header-cta">
              <a
                href={payloadConfig.routes.admin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-admin"
              >
                Panel /admin ↗
              </a>
            </div>
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <div>
              <strong>{siteName}</strong>
              <p className="footer-caption">
                Todas las páginas de navegación se generan dinámicamente desde la colección{' '}
                <code>pages</code> de Payload CMS.
              </p>
            </div>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              <Link href="/headless-demo">Demo Headless</Link>
              <a href="/api/pages" target="_blank" rel="noopener noreferrer">
                REST API (/api/pages) ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
