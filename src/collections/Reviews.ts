import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    group: 'Content',
    defaultColumns: ['author', 'role', 'rating', 'featured', 'updatedAt'],
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
      type: 'row',
      fields: [
        {
          name: 'author',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'Ej. María García',
          },
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
            placeholder: 'Ej. Visitante / Crítica de Arte / Cliente verificado',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: {
            width: '50%',
            description: 'Puntuación de 1 a 5 estrellas',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: true,
          label: 'Destacar esta review',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}
