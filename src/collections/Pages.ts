import type { CollectionConfig } from 'payload'
import { ImageCardsBlock } from '../blocks/ImageCardsBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'template', 'status', 'updatedAt'],
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      return slug === 'home' ? '/' : `/${slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return slug === 'home' ? '/' : `/${slug}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Ruta de la página (ej. home, about-us, terms-and-conditions, reviews)',
      },
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Estándar / Bloques (About Us, Reviews...)', value: 'default' },
        { label: 'Landing / Homepage', value: 'landing' },
        { label: 'Documento Legal (Terms & Conditions, Privacy...)', value: 'legal' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Define el estilo de plantilla con el que se renderiza la página',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroType',
              type: 'select',
              defaultValue: 'highImpact',
              options: [
                { label: 'None', value: 'none' },
                { label: 'High Impact', value: 'highImpact' },
                { label: 'Medium Impact', value: 'mediumImpact' },
              ],
            },
            {
              name: 'heroHeading',
              type: 'text',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Page Layout (Blocks)',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                ImageCardsBlock,
                {
                  slug: 'content',
                  labels: {
                    singular: 'Content Block',
                    plural: 'Content Blocks',
                  },
                  fields: [
                    {
                      name: 'richText',
                      type: 'richText',
                      required: true,
                    },
                  ],
                },
                {
                  slug: 'features',
                  labels: {
                    singular: 'Features / Pillars Grid',
                    plural: 'Features / Pillars Grids',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                    },
                    {
                      name: 'items',
                      type: 'array',
                      required: true,
                      minRows: 1,
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          required: true,
                        },
                        {
                          name: 'badge',
                          type: 'text',
                          admin: {
                            placeholder: 'Ej. 01, Misión, +10 años...',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'reviewsBlock',
                  labels: {
                    singular: 'Reviews Section',
                    plural: 'Reviews Sections',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      defaultValue: 'Lo que dicen nuestros visitantes',
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                    },
                    {
                      name: 'showAllFeatured',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Mostrar automáticamente todas las reviews destacadas',
                    },
                    {
                      name: 'selectedReviews',
                      type: 'relationship',
                      relationTo: 'reviews',
                      hasMany: true,
                      admin: {
                        description:
                          'Opcional: si desmarcas la opción anterior, puedes elegir manualmente qué reviews mostrar aquí.',
                      },
                    },
                  ],
                },
                {
                  slug: 'mediaBlock',
                  labels: {
                    singular: 'Media Block',
                    plural: 'Media Blocks',
                  },
                  fields: [
                    {
                      name: 'media',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'caption',
                      type: 'text',
                    },
                  ],
                },
                {
                  slug: 'cta',
                  labels: {
                    singular: 'Call to Action',
                    plural: 'Calls to Action',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'text',
                      type: 'textarea',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'buttonLabel',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'buttonUrl',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'featuredExhibitions',
                  labels: {
                    singular: 'Featured Exhibitions',
                    plural: 'Featured Exhibitions',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'exhibitions',
                      type: 'relationship',
                      relationTo: 'exhibitions',
                      hasMany: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
