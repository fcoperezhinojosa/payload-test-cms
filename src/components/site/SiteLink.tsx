import React from 'react'
import Link from 'next/link'

type Props = {
  href: string
  newTab?: boolean | null
  className?: string
  title?: string
  children: React.ReactNode
}

/** Enlace interno (next/link) o externo (<a>) según la URL. */
export function SiteLink({ href, newTab, className, title, children }: Props) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  if (isInternal && !newTab) {
    return (
      <Link href={href} className={className} title={title}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={className}
      title={title}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
