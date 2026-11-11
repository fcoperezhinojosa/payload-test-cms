import type { Block } from 'payload'

export const DestinationCardsBlock: Block = {
  slug: 'destinationCards',
  labels: {
    singular: 'Destination / Airport Cards (Grid)',
    plural: 'Destination / Airport Cards (Grids)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: 'Airports we go to every day',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
      defaultValue: 'We get you to and from the airport, wherever you go.',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards (Imagen + Title + Description)',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen (desde Media Library)',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'URL de imagen alternativa (opcional si no subes archivo)',
          admin: {
            placeholder: 'https://images.unsplash.com/...',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: 'Card Title',
              admin: {
                width: '50%',
                placeholder: 'Palma de Mallorca Airport (PMI)',
              },
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              localized: true,
              label: 'Card Description',
              admin: {
                width: '50%',
                placeholder: '325 routes available',
              },
            },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'Enlace URL de la card (opcional)',
          admin: {
            placeholder: '/airports/pmi o #',
          },
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
          label: 'Botón inferior Label (opcional)',
          defaultValue: 'See all 399 routes',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'moreUrl',
          type: 'text',
          label: 'Botón inferior URL',
          defaultValue: '#',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
