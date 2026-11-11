/**
 * Rellena las traducciones de Pages, Reviews y Site Settings para todos los idiomas soportados.
 * Uso: npx payload run scripts/seed-translations.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { LOCALE_CODES, type LocaleCode } from '../src/lib/i18n'
import { TRANSLATIONS_PART_1 } from './translations/part1'
import { TRANSLATIONS_PART_2 } from './translations/part2'

const ALL_TRANSLATIONS: Record<LocaleCode, Record<string, string>> = {
  ...TRANSLATIONS_PART_1,
  ...TRANSLATIONS_PART_2,
} as Record<LocaleCode, Record<string, string>>

const missingKeys: string[] = []

function tr(value: string | null | undefined, locale: LocaleCode): string | null | undefined {
  if (typeof value !== 'string' || !value.trim()) return value
  const mapped = ALL_TRANSLATIONS[locale]?.[value]
  if (!mapped) {
    missingKeys.push(`[${locale}] ${value}`)
    return value
  }
  return mapped
}

function translateRichText(richText: any, locale: LocaleCode): any {
  if (!richText?.root) return richText
  return {
    ...richText,
    root: {
      ...richText.root,
      children: (richText.root.children || []).map((node: any) => ({
        ...node,
        children: (node.children || []).map((child: any) =>
          typeof child?.text === 'string'
            ? { ...child, text: tr(child.text, locale) }
            : child,
        ),
      })),
    },
  }
}

function translateBlock(block: any, locale: LocaleCode): any {
  switch (block.blockType) {
    case 'imageCards':
      return {
        ...block,
        heading: tr(block.heading, locale),
        cards: (block.cards || []).map((c: any) => ({
          ...c,
          title: tr(c.title, locale),
          description: tr(c.description, locale),
        })),
      }
    case 'iconCards':
      return {
        ...block,
        title: tr(block.title, locale),
        cards: (block.cards || []).map((c: any) => ({
          ...c,
          title: tr(c.title, locale),
          description: tr(c.description, locale),
        })),
      }
    case 'pillsSection':
      return {
        ...block,
        title: tr(block.title, locale),
        description: tr(block.description, locale),
        moreLabel: tr(block.moreLabel, locale),
        pills: (block.pills || []).map((p: any) => ({
          ...p,
          label: tr(p.label, locale),
        })),
      }
    case 'destinationCards':
      return {
        ...block,
        title: tr(block.title, locale),
        description: tr(block.description, locale),
        moreLabel: tr(block.moreLabel, locale),
        cards: (block.cards || []).map((c: any) => ({
          ...c,
          title: tr(c.title, locale),
          description: tr(c.description, locale),
        })),
      }
    case 'faq':
      return {
        ...block,
        title: tr(block.title, locale),
        description: tr(block.description, locale),
        footerText: tr(block.footerText, locale),
        footerLinkLabel: tr(block.footerLinkLabel, locale),
        items: (block.items || []).map((it: any) => ({
          ...it,
          question: tr(it.question, locale),
          answer: tr(it.answer, locale),
        })),
      }
    case 'newsletter':
      return {
        ...block,
        title: tr(block.title, locale),
        description: tr(block.description, locale),
        inputPlaceholder: tr(block.inputPlaceholder, locale),
        buttonLabel: tr(block.buttonLabel, locale),
        disclaimerText: tr(block.disclaimerText, locale),
        termsLabel: tr(block.termsLabel, locale),
      }
    case 'content':
      return {
        ...block,
        richText: translateRichText(block.richText, locale),
      }
    case 'features':
      return {
        ...block,
        heading: tr(block.heading, locale),
        subheading: tr(block.subheading, locale),
        items: (block.items || []).map((it: any) => ({
          ...it,
          title: tr(it.title, locale),
          description: tr(it.description, locale),
          badge: tr(it.badge, locale),
        })),
      }
    case 'reviewsBlock':
      return {
        ...block,
        heading: tr(block.heading, locale),
        subheading: tr(block.subheading, locale),
      }
    case 'cta':
      return {
        ...block,
        heading: tr(block.heading, locale),
        text: tr(block.text, locale),
        buttonLabel: tr(block.buttonLabel, locale),
      }
    default:
      return block
  }
}

const payload = await getPayload({ config })

// Capture base English documents BEFORE updating any locale (including 'en' normalization)
const basePages = (
  await payload.find({
    collection: 'pages',
    locale: 'en',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
).docs

const baseReviews = (
  await payload.find({
    collection: 'reviews',
    locale: 'en',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
).docs

const baseSiteSettings = await payload.findGlobal({
  slug: 'site-settings',
  locale: 'en',
  depth: 0,
  overrideAccess: true,
})

// Apply non-default locales first, then 'en' last
const orderedLocales: LocaleCode[] = [
  ...LOCALE_CODES.filter((c) => c !== 'en'),
  'en',
]

for (const locale of orderedLocales) {
  for (const page of basePages) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      overrideAccess: true,
      data: {
        title: tr(page.title, locale) as string,
        heroHeading: tr(page.heroHeading, locale),
        heroSubheading: tr(page.heroSubheading, locale),
        metaTitle: tr(page.metaTitle, locale),
        metaDescription: tr(page.metaDescription, locale),
        heroOverlayUsps: (page.heroOverlayUsps || []).map((u) => ({
          ...u,
          text: tr(u.text, locale) as string,
        })),
        heroBottomUsps: (page.heroBottomUsps || []).map((u) => ({
          ...u,
          text: tr(u.text, locale) as string,
        })),
        layout: (page.layout || []).map((b) => translateBlock(b, locale)),
      },
    })
  }

  for (const review of baseReviews) {
    await payload.update({
      collection: 'reviews',
      id: review.id,
      locale,
      overrideAccess: true,
      data: {
        role: tr(review.role, locale),
        comment: tr(review.comment, locale) as string,
      },
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    locale,
    overrideAccess: true,
    data: {
      siteName: baseSiteSettings.siteName,
      tagline: tr(baseSiteSettings.tagline, locale),
      navigation: (baseSiteSettings.navigation || []).map((n) => ({
        ...n,
        label: tr(n.label, locale) as string,
        footerColumn: tr(n.footerColumn, locale),
      })),
      header: {
        ...baseSiteSettings.header,
        ctaLabel: tr(baseSiteSettings.header?.ctaLabel, locale),
      },
      footer: {
        ...baseSiteSettings.footer,
        supportText: tr(baseSiteSettings.footer?.supportText, locale),
      },
    },
  })

  console.log(`✔ Seeded locale: ${locale} (${basePages.length} pages, ${baseReviews.length} reviews, site-settings)`)
}

if (missingKeys.length > 0) {
  console.warn(`⚠ Missing ${missingKeys.length} translation entries:`)
  for (const k of Array.from(new Set(missingKeys))) console.warn('  -', k)
} else {
  console.log('✔ 0 missing translation keys across all 11 locales!')
}

process.exit(0)
