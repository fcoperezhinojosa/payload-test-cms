import type { Block } from 'payload'

export const NewsletterBlock: Block = {
  slug: 'newsletter',
  labels: {
    singular: 'Newsletter / Join Our Community',
    plural: 'Newsletter / Join Our Community',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      defaultValue: 'Join Our Community',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
      defaultValue: 'Receive special deals and save up to 20% on bookings.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'inputPlaceholder',
          type: 'text',
          localized: true,
          label: 'Email Input Placeholder',
          defaultValue: 'Your email address',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
          localized: true,
          label: 'Button Label',
          defaultValue: 'Subscribe',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'disclaimerText',
          type: 'text',
          localized: true,
          label: 'Texto legal previo al enlace',
          defaultValue: 'By signing up, you agree to our',
          admin: {
            width: '40%',
          },
        },
        {
          name: 'termsLabel',
          type: 'text',
          localized: true,
          label: 'Texto del enlace legal',
          defaultValue: 'Terms and Conditions.',
          admin: {
            width: '30%',
          },
        },
        {
          name: 'termsUrl',
          type: 'text',
          label: 'URL del enlace legal',
          defaultValue: '/terms-and-conditions',
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen lateral (desde Media Library)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL de imagen alternativa (opcional si no subes archivo)',
      admin: {
        placeholder: 'https://images.unsplash.com/...',
      },
    },
  ],
}
