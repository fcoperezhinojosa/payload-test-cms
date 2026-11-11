import React from 'react'
import Link from 'next/link'
import { localizeHref, type LocaleCode } from '@/lib/i18n'

type Props = {
  href: string
  locale?: LocaleCode
  newTab?: boolean | null
  className?: string
  title?: string
  children: React.ReactNode
}

/** Enlace interno (next/link) o externo (<a>) según la URL. */
export function SiteLink({ href, locale, newTab, className, title, children }: Props) {
  const resolvedHref = locale ? localizeHref(href, locale) : href
  const isInternal = resolvedHref.startsWith('/') && !resolvedHref.startsWith('//')
  if (isInternal && !newTab) {
    return (
      <Link href={resolvedHref} className={className} title={title}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={resolvedHref}
      className={className}
      title={title}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
