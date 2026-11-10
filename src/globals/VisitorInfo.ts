import type { GlobalConfig } from 'payload'

export const VisitorInfo: GlobalConfig = {
  slug: 'visitor-info',
  label: 'Visitor',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'admissionNotice',
      type: 'textarea',
      admin: {
        description: 'Aviso destacado para visitantes (ej. entrada gratuita el primer domingo de mes)',
      },
    },
    {
      name: 'address',
      type: 'textarea',
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
          admin: {
            placeholder: 'Ej. Martes a Viernes',
          },
        },
        {
          name: 'hours',
          type: 'text',
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
        },
      ],
    },
    {
      name: 'accessibilityInfo',
      type: 'richText',
    },
  ],
}
