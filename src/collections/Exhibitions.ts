import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  admin: {
    useAsTitle: 'title',
    group: 'Program',
    defaultColumns: ['title', 'status', 'startDate', 'endDate', 'location'],
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
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Current / On View', value: 'current' },
        { label: 'Past / Archive', value: 'past' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'Ej. Sala Principal - Planta 2',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'artists',
      type: 'relationship',
      relationTo: 'artists',
      hasMany: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
