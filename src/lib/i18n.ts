export const DEFAULT_LOCALE = 'en' as const

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', dateLocale: 'en-GB' },
  { code: 'de', label: 'Deutsch', dateLocale: 'de-DE' },
  { code: 'it', label: 'Italiano', dateLocale: 'it-IT' },
  { code: 'es', label: 'Español', dateLocale: 'es-ES' },
  { code: 'fr', label: 'Français', dateLocale: 'fr-FR' },
  { code: 'nl', label: 'Nederlands', dateLocale: 'nl-NL' },
  { code: 'pl', label: 'Polski', dateLocale: 'pl-PL' },
  { code: 'sv', label: 'Svenska', dateLocale: 'sv-SE' },
  { code: 'fi', label: 'Suomi', dateLocale: 'fi-FI' },
  { code: 'no', label: 'Norsk', dateLocale: 'nb-NO' },
  { code: 'hu', label: 'Magyar', dateLocale: 'hu-HU' },
] as const

export type LocaleMeta = (typeof SUPPORTED_LOCALES)[number]
export type LocaleCode = LocaleMeta['code']

export const LOCALE_CODES: readonly LocaleCode[] = SUPPORTED_LOCALES.map((l) => l.code)

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

const LOCALE_SET = new Set<string>(LOCALE_CODES)

export function isValidLocale(value: string | null | undefined): value is LocaleCode {
  return typeof value === 'string' && LOCALE_SET.has(value)
}

export function getLocaleMeta(locale: string | null | undefined): LocaleMeta {
  if (isValidLocale(locale)) {
    return SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0]
  }
  return SUPPORTED_LOCALES[0]
}

/**
 * Normaliza sub-etiquetas de idioma (ej. `nb`, `nn`, `nb-NO` -> `no`, `de-AT` -> `de`)
 * y selecciona el mejor idioma soportado según los pesos `q` de `Accept-Language`.
 */
export function matchAcceptLanguage(acceptLanguage: string | null | undefined): LocaleCode {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const parsed = acceptLanguage
    .split(',')
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1
      return { tag: rawTag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { tag } of parsed) {
    if (isValidLocale(tag)) return tag
    const base = tag.split('-')[0]
    if (base === 'nb' || base === 'nn') return 'no'
    if (isValidLocale(base)) return base
  }

  return DEFAULT_LOCALE
}

const NON_LOCALIZED_PREFIXES = ['/admin', '/api', '/_next', '/my-route']

/**
 * Añade el prefijo `/${locale}` a rutas internas del frontend sin duplicarlo
 * y deja intactos los enlaces externos, anclas, `/admin` y `/api`.
 */
export function localizeHref(href: string, locale: LocaleCode): string {
  if (!href || !href.startsWith('/') || href.startsWith('//')) {
    return href
  }

  const [pathAndQuery, hash] = href.split('#', 2)
  const [pathname, search] = pathAndQuery.split('?', 2)

  if (NON_LOCALIZED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return href
  }

  const segments = pathname.split('/').filter(Boolean)
  let localizedPath: string

  if (segments.length > 0 && isValidLocale(segments[0])) {
    localizedPath = pathname
  } else if (pathname === '/') {
    localizedPath = `/${locale}`
  } else {
    localizedPath = `/${locale}${pathname}`
  }

  const querySuffix = search !== undefined ? `?${search}` : ''
  const hashSuffix = hash !== undefined ? `#${hash}` : ''
  return `${localizedPath}${querySuffix}${hashSuffix}`
}

/**
 * Reemplaza el segmento de idioma actual en `pathname` por `targetLocale`.
 */
export function switchLocalePath(pathname: string, targetLocale: LocaleCode): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = targetLocale
    return `/${segments.join('/')}`
  }
  return pathname === '/' ? `/${targetLocale}` : `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
