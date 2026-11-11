import { describe, it, beforeAll, expect } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { ensureSeedData } from '@/lib/ensureSeedData'

let payload: Payload

describe('Payload Version Control', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    await ensureSeedData(payload)
  })

  it('enables versions and drafts on editorial collections and revision history on content/globals', () => {
    const pagesConfig = payload.collections['pages'].config
    const postsConfig = payload.collections['posts'].config
    const eventsConfig = payload.collections['events'].config
    const exhibitionsConfig = payload.collections['exhibitions'].config
    const artistsConfig = payload.collections['artists'].config
    const reviewsConfig = payload.collections['reviews'].config

    expect(pagesConfig.versions).toBeTruthy()
    expect(pagesConfig.versions?.drafts).toBeTruthy()
    expect(pagesConfig.versions?.maxPerDoc).toBe(50)

    expect(postsConfig.versions).toBeTruthy()
    expect(postsConfig.versions?.drafts).toBeTruthy()
    expect(postsConfig.versions?.maxPerDoc).toBe(50)

    for (const cfg of [eventsConfig, exhibitionsConfig, artistsConfig, reviewsConfig]) {
      expect(cfg.versions).toBeTruthy()
      expect(cfg.versions?.drafts).toBeFalsy()
      expect(cfg.versions?.maxPerDoc).toBe(50)
    }

    const siteSettings = payload.globals.config.find((g) => g.slug === 'site-settings')
    const visitorInfo = payload.globals.config.find((g) => g.slug === 'visitor-info')

    expect(siteSettings?.versions).toBeTruthy()
    expect(siteSettings?.versions?.drafts).toBeFalsy()
    expect(siteSettings?.versions?.max).toBe(50)

    expect(visitorInfo?.versions).toBeTruthy()
    expect(visitorInfo?.versions?.drafts).toBeFalsy()
    expect(visitorInfo?.versions?.max).toBe(50)
  })

  it('backfills existing seeded pages as published with version history', async () => {
    const publicPages = await payload.find({
      collection: 'pages',
      locale: 'en',
      overrideAccess: false,
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    expect(publicPages.docs[0]?.slug).toBe('home')
    expect(publicPages.docs[0]?._status).toBe('published')

    const versions = await payload.findVersions({
      collection: 'pages',
      where: { parent: { equals: publicPages.docs[0].id } },
      limit: 5,
      overrideAccess: true,
    })
    expect(versions.totalDocs).toBeGreaterThanOrEqual(1)
  })

  it('isolates drafts from public reads, supports draft updates, and restores previous versions', async () => {
    const uniqueSlug = `version-test-${Date.now()}`

    const created = await payload.create({
      collection: 'pages',
      locale: 'en',
      draft: true,
      overrideAccess: true,
      data: {
        title: 'Version Test Draft v1',
        slug: uniqueSlug,
        template: 'default',
        _status: 'draft',
      },
    })

    try {
      // Public query (overrideAccess: false, no user) must NOT return draft pages
      const publicBeforePublish = await payload.find({
        collection: 'pages',
        locale: 'en',
        overrideAccess: false,
        where: { slug: { equals: uniqueSlug } },
      })
      expect(publicBeforePublish.totalDocs).toBe(0)

      // Draft query with overrideAccess: true returns the draft
      const draftRead = await payload.find({
        collection: 'pages',
        locale: 'en',
        draft: true,
        overrideAccess: true,
        where: { slug: { equals: uniqueSlug } },
      })
      expect(draftRead.totalDocs).toBe(1)
      expect(draftRead.docs[0]?.title).toBe('Version Test Draft v1')

      // Publish v1
      await payload.update({
        collection: 'pages',
        id: created.id,
        locale: 'en',
        overrideAccess: true,
        data: {
          title: 'Version Test Published v1',
          _status: 'published',
        },
      })

      const publicAfterPublish = await payload.find({
        collection: 'pages',
        locale: 'en',
        overrideAccess: false,
        where: { slug: { equals: uniqueSlug } },
      })
      expect(publicAfterPublish.totalDocs).toBe(1)
      expect(publicAfterPublish.docs[0]?.title).toBe('Version Test Published v1')

      // Save a newer draft v2 without publishing
      await payload.update({
        collection: 'pages',
        id: created.id,
        locale: 'en',
        draft: true,
        overrideAccess: true,
        data: {
          title: 'Version Test Unpublished Draft v2',
          _status: 'draft',
        },
      })

      // Public visitors still see Published v1
      const publicStillV1 = await payload.find({
        collection: 'pages',
        locale: 'en',
        overrideAccess: false,
        where: { slug: { equals: uniqueSlug } },
      })
      expect(publicStillV1.docs[0]?.title).toBe('Version Test Published v1')

      // Preview / draft query sees Draft v2
      const previewV2 = await payload.find({
        collection: 'pages',
        locale: 'en',
        draft: true,
        overrideAccess: true,
        where: { slug: { equals: uniqueSlug } },
      })
      expect(previewV2.docs[0]?.title).toBe('Version Test Unpublished Draft v2')

      // Unauthenticated readVersions must be rejected
      await expect(
        payload.findVersions({
          collection: 'pages',
          overrideAccess: false,
          where: { parent: { equals: created.id } },
        }),
      ).rejects.toThrow()

      // List versions and restore the Published v1 snapshot
      const history = await payload.findVersions({
        collection: 'pages',
        overrideAccess: true,
        where: { parent: { equals: created.id } },
        sort: '-createdAt',
      })
      expect(history.totalDocs).toBeGreaterThanOrEqual(3)

      const publishedV1Version = history.docs.find(
        (v) => v.version.title === 'Version Test Published v1',
      )
      expect(publishedV1Version).toBeDefined()

      const restored = await payload.restoreVersion({
        collection: 'pages',
        id: publishedV1Version!.id,
        overrideAccess: true,
      })
      expect(restored.title).toBe('Version Test Published v1')
    } finally {
      await payload.delete({
        collection: 'pages',
        id: created.id,
        overrideAccess: true,
      })
    }
  })

  it('tracks and restores versions for non-draft collections (reviews) and globals (site-settings)', async () => {
    const review = await payload.create({
      collection: 'reviews',
      locale: 'en',
      overrideAccess: true,
      data: {
        author: 'Version Reviewer',
        rating: 5,
        featured: false,
        comment: 'Initial review comment',
      },
    })

    try {
      await payload.update({
        collection: 'reviews',
        id: review.id,
        locale: 'en',
        overrideAccess: true,
        data: {
          comment: 'Updated review comment',
        },
      })

      const reviewVersions = await payload.findVersions({
        collection: 'reviews',
        overrideAccess: true,
        where: { parent: { equals: review.id } },
        sort: '-createdAt',
      })
      expect(reviewVersions.totalDocs).toBe(2)

      const firstVersion = reviewVersions.docs.find(
        (v) => v.version.comment === 'Initial review comment',
      )
      expect(firstVersion).toBeDefined()

      const restoredReview = await payload.restoreVersion({
        collection: 'reviews',
        id: firstVersion!.id,
        overrideAccess: true,
      })
      expect(restoredReview.comment).toBe('Initial review comment')
    } finally {
      await payload.delete({
        collection: 'reviews',
        id: review.id,
        overrideAccess: true,
      })
    }

    const originalSettings = await payload.findGlobal({
      slug: 'site-settings',
      locale: 'en',
      overrideAccess: true,
    })

    const updatedSiteName = `${originalSettings.siteName} (v-test)`
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'en',
      overrideAccess: true,
      data: {
        siteName: updatedSiteName,
      },
    })

    try {
      const globalVersions = await payload.findGlobalVersions({
        slug: 'site-settings',
        overrideAccess: true,
        sort: '-createdAt',
        limit: 5,
      })
      expect(globalVersions.totalDocs).toBeGreaterThanOrEqual(1)
      expect(globalVersions.docs[0]?.version.siteName).toBe(updatedSiteName)
    } finally {
      await payload.updateGlobal({
        slug: 'site-settings',
        locale: 'en',
        overrideAccess: true,
        data: {
          siteName: originalSettings.siteName,
        },
      })
    }
  })
})
