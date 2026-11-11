import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Artists: CollectionConfig = {
  slug: 'artists',
  admin: {
    useAsTitle: 'name',
    group: 'Program',
    defaultColumns: ['name', 'nationality', 'birthYear', 'updatedAt'],
  },
  access: {
    read: () => true,
    readVersions: authenticated,
  },
  versions: {
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador URL único (ej. frida-kahlo)',
      },
    },
    {
      name: 'nationality',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'birthYear',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'biography',
      type: 'richText',
      localized: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'artworks',
      type: 'array',
      label: 'Featured Artworks',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'year',
          type: 'text',
        },
        {
          name: 'medium',
          type: 'text',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
