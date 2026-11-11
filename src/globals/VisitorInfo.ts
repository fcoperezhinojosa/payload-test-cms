import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const VisitorInfo: GlobalConfig = {
  slug: 'visitor-info',
  label: 'Visitor',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    readVersions: authenticated,
  },
  versions: {
    max: 50,
  },
  fields: [
    {
      name: 'admissionNotice',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Aviso destacado para visitantes (ej. entrada gratuita el primer domingo de mes)',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
    },
    {
      name: 'openingHours',
      type: 'array',
      fields: [
        {
          name: 'days',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            placeholder: 'Ej. Martes a Viernes',
          },
        },
        {
          name: 'hours',
          type: 'text',
          localized: true,
          admin: {
            placeholder: 'Ej. 10:00 – 20:00',
          },
        },
        {
          name: 'closed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'ticketTiers',
      type: 'array',
      label: 'Ticket Prices',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            placeholder: 'Ej. Entrada General / Reducida',
          },
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'accessibilityInfo',
      type: 'richText',
      localized: true,
    },
  ],
}
