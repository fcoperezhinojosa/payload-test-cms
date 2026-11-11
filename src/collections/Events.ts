import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Program',
    defaultColumns: ['title', 'eventType', 'startDate', 'location'],
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
      name: 'eventType',
      type: 'select',
      required: true,
      defaultValue: 'talk',
      options: [
        { label: 'Talk / Lecture', value: 'talk' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Performance', value: 'performance' },
        { label: 'Guided Tour', value: 'guided-tour' },
        { label: 'Opening Reception', value: 'opening' },
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
            date: {
              pickerAppearance: 'dayAndTime',
            },
            width: '50%',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
            placeholder: 'Ej. Auditorio Principal',
          },
        },
        {
          name: 'ticketPrice',
          type: 'number',
          min: 0,
          admin: {
            width: '50%',
            description: 'Precio en EUR (0 para entrada gratuita)',
          },
        },
      ],
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
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
      name: 'exhibition',
      type: 'relationship',
      relationTo: 'exhibitions',
    },
  ],
}
