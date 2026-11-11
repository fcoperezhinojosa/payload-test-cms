import type { Block } from 'payload'

export const PillsSectionBlock: Block = {
  slug: 'pillsSection',
  labels: {
    singular: 'Pills Section (Destinos / Tags)',
    plural: 'Pills Sections (Destinos / Tags)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: '700+ destinations worldwide',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
      defaultValue: 'Select a country to see available options for your trip.',
    },
    {
      name: 'pills',
      type: 'array',
      label: 'Pills',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              label: 'Icono / Bandera (opcional)',
              admin: {
                width: '25%',
                placeholder: '🇪🇸',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Texto de la Pill',
              admin: {
                width: '40%',
                placeholder: 'Spain',
              },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Enlace URL (opcional)',
              admin: {
                width: '35%',
                placeholder: '/spain o #',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'moreLabel',
          type: 'text',
          localized: true,
          label: 'Link More Label (ej. See more countries)',
          defaultValue: 'See more countries',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'moreUrl',
          type: 'text',
          label: 'Link More URL',
          defaultValue: '#',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
