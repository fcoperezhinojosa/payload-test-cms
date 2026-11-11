import type { Block } from 'payload'

export const IconCardsBlock: Block = {
  slug: 'iconCards',
  labels: {
    singular: 'Icon Cards (Why Book / Beneficios)',
    plural: 'Icon Cards (Why Book / Beneficios)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: 'Why book your transfers with Suntransfers?',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards (Icono + Title + Description)',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'iconType',
              type: 'select',
              required: true,
              defaultValue: 'piggyBank',
              label: 'Icono integrado',
              options: [
                { label: 'Piggy Bank (Great Value / Ahorro)', value: 'piggyBank' },
                { label: 'Calendar (Easy & Flexible Booking)', value: 'calendar' },
                { label: 'Headset (24/7 Customer Service)', value: 'headset' },
                { label: 'Shield (Seguridad / Garantía)', value: 'shield' },
                { label: 'Car (Vehículo / Transfer)', value: 'car' },
                { label: 'Custom (Emoji o Imagen subida)', value: 'custom' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'customIcon',
              type: 'text',
              label: 'Emoji / Texto alternativo (opcional)',
              admin: {
                width: '50%',
                placeholder: 'Ej. 🐷, 📅, 🎧',
              },
            },
          ],
        },
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen de icono personalizada (opcional)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Card Title',
          admin: {
            placeholder: 'Great value',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Card Description',
          admin: {
            placeholder:
              'Low, low prices without sacrificing great service. No charges apply to debit or credit card payments.',
          },
        },
      ],
    },
  ],
}
