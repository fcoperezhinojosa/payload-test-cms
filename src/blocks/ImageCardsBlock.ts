import type { Block } from 'payload'

export const ImageCardsBlock: Block = {
  slug: 'imageCards',
  labels: {
    singular: 'Image Cards (3 Columnas)',
    plural: 'Image Cards (3 Columnas)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      label: 'Título de la sección',
      defaultValue: 'All set before you land',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Tarjetas (3 bloques recomendados)',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen ( desde Media Library )',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'URL de imagen alternativa (opcional si no subes archivo a Media)',
          admin: {
            placeholder: 'https://images.unsplash.com/...',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Título de la tarjeta',
          admin: {
            placeholder: 'Ej. Peace of mind',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Texto descriptivo',
          admin: {
            placeholder:
              'Ej. No surprises. Your price is confirmed at the time of booking...',
          },
        },
      ],
    },
  ],
}
