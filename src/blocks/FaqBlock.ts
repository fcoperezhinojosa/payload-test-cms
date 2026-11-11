import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section (Acordeón)',
    plural: 'FAQ Sections (Acordeón)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: 'FAQs',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description / Subtítulo lateral',
      defaultValue: 'What travellers ask before booking a transfer.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Preguntas y Respuestas (FAQs)',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
          label: 'Question',
          admin: {
            placeholder: 'Is it worth booking an airport transfer in advance?',
          },
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Answer',
          admin: {
            placeholder:
              'Yes. Booking an airport transfer in advance means your trip is confirmed...',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'footerText',
          type: 'text',
          localized: true,
          label: 'Texto pie (opcional)',
          defaultValue: 'Do you have more questions?',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'footerLinkLabel',
          type: 'text',
          localized: true,
          label: 'Texto del enlace (opcional)',
          defaultValue: 'Visit our Help Centre',
          admin: {
            width: '30%',
          },
        },
        {
          name: 'footerLinkUrl',
          type: 'text',
          label: 'URL del enlace',
          defaultValue: '#help-centre',
          admin: {
            width: '30%',
          },
        },
      ],
    },
  ],
}
