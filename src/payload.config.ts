import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { fr } from '@payloadcms/translations/languages/fr'
import { hu } from '@payloadcms/translations/languages/hu'
import { it } from '@payloadcms/translations/languages/it'
import { nb } from '@payloadcms/translations/languages/nb'
import { nl } from '@payloadcms/translations/languages/nl'
import { pl } from '@payloadcms/translations/languages/pl'
import { sv } from '@payloadcms/translations/languages/sv'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n'

import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Reviews } from './collections/Reviews'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Artists } from './collections/Artists'
import { Exhibitions } from './collections/Exhibitions'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { VisitorInfo } from './globals/VisitorInfo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Posts, Reviews, Media, Events, Artists, Exhibitions, Users],
  globals: [SiteSettings, VisitorInfo],
  localization: {
    locales: SUPPORTED_LOCALES.map(({ code, label }) => ({ code, label })),
    defaultLocale: DEFAULT_LOCALE,
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en, de, it, es, fr, nl, pl, sv, nb, hu },
    fallbackLanguage: 'en',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
