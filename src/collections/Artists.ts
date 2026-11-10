import type { CollectionConfig } from 'payload'

export const Artists: CollectionConfig = {
  slug: 'artists',
  admin: {
    useAsTitle: 'name',
    group: 'Program',
    defaultColumns: ['name', 'nationality', 'birthYear', 'updatedAt'],
  },
  access: {
    read: () => true,
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
        },
        {
          name: 'year',
          type: 'text',
        },
        {
          name: 'medium',
          type: 'text',
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
